import React, { useState, useEffect, Fragment } from 'react'
import styled from 'styled-components'
import { graphql, navigate } from 'gatsby'
import PropTypes from 'prop-types'
import { Location } from '@reach/router'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import TinyColor from '@ctrl/tinycolor'
import showdown from 'showdown'
import FlexSearch from 'flexsearch'
import Markdown from '@input-output-hk/front-end-core-components/components/Markdown'
import Pagination from '@material-ui/lab/Pagination'
import Layout from '../components/Layout'
import SearchPageQuery from '../queries/SearchPageQuery'
import SearchField from '../components/SearchField'
import SearchResult from '../components/SearchResult'
import Container from '../components/Container'

const HeadingWrap = styled.div`
  display: flex;
  align-items: center;

  h1 {
    flex: 3;
  }

  form {
    flex: 1;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    justify-content: space-around;
    flex-flow: wrap;

    h1 {
      text-align: center;
    }
    h1, form {
      flex: 100%;
    }
  }
`

const SearchContainer = styled.div`
  display: none;
  margin: 2rem 0;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    display: block;
  }
`

const Content = styled.div`
  margin-top: 2rem;
  padding-left: 2rem;
  border-left: 0.1rem solid ${({ theme }) => new TinyColor(theme.palette.text.primary).setAlpha(0.2).toString()};
`

function getSearchParam (search, key) {
  const params = (search || '').replace(/^\?/, '').split('&')
  while (params.length > 0) {
    const [ k, v ] = params.shift().split('=')
    if (k === key) return decodeURIComponent(v)
  }

  return null
}

const SearchUpper = styled.div`
  display: flex;

  > div {
    flex: 1;
    display: flex;

    &:last-of-type {
      justify-content: flex-end;
    }
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    flex-direction: column;

    > div {
      padding: 0.5rem 0;

      &:last-of-type {
        justify-content: flex-start;
      }
    }
  }
`

const SearchLower = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    justify-content: flex-start;
  }
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Items = styled.ul`
  list-style: none;
`

const LoadingWrapper = styled.div`
  display: inline-block;
  position: relative;
  height: 20rem;
`

const LoadingContainer = styled.div`
  display: block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`

export const query = graphql`
  query($lang:String) {
    allDocumentationArticle(filter: {lang: {eq: $lang}, content: {ne: ""}}) {
      edges {
        node {
          title
          fullTitle
          path
          lang
          content
          lastUpdatedFormatted
        }
      }
    }
  }
`

const RESULTS_PER_PAGE = 10

const SearchPageInner = ({ data, pageContext, location }) => {
  const [ query, setQuery ] = useState(getQuery(location))
  const [ page, setPage ] = useState(getPage(location))
  const [ results, setResults ] = useState({ query: null, results: null })

  function getQuery ({ search }) {
    return getSearchParam(search, 'query') || ''
  }

  function getPage ({ search }) {
    const page = parseInt(getSearchParam(search, 'page') || '1')
    if (!page || isNaN(page) || page <= 0) return 1
    return page
  }

  const sanitizeContent = (content) => {
    const converter = new showdown.Converter()
    const htmlContent = converter.makeHtml(content)
    const div = document.createElement('div')
    div.innerHTML = htmlContent.replace(/\n/g, ' ')
    return div.innerText
  }

  const loadResults = () => {
    try {
      if (!query) setResults({ results: [], query })
      const posts = data.allDocumentationArticle.edges.map(({ node: { title, fullTitle, path, content, lastUpdatedFormatted } }) => ({
        title,
        fullTitle,
        path: `/${pageContext.lang}${path}`,
        content,
        lastUpdatedFormatted
      }))

      const index = new FlexSearch({
        encode: 'icase',
        tokenize: 'full',
        threshold: 7,
        depth: 3,
        doc: {
          id: 'path',
          field: [
            'content',
            'title',
            'fullTitle'
          ]
        }
      })

      index.add(posts.map(post => ({
        ...post,
        content: sanitizeContent(post.content)
      })))

      const results = index.search(query, {
        sort: 'publishTimestampDiff'
      })

      setResults({ results, query })
    } catch (err) {
      console.error('Error loading search results', err)
    }
  }

  function validatePage (page) {
    if (page === 1) return
    if (page > Math.ceil(results.results.length / RESULTS_PER_PAGE)) {
      pageOnChange(null, Math.ceil(results.results.length / RESULTS_PER_PAGE))
    } else if (page < 1) {
      pageOnChange(null, 1)
    }
  }

  useEffect(() => {
    const newQuery = getQuery(location)
    const newPage = getPage(location)
    if (newQuery !== query) setQuery(newQuery)
    if (results.query === null || results.query !== query) loadResults()
    if (newPage !== page) setPage(newPage)
    if (newPage === page && results.results) validatePage(page)
  }, [ location, query, page, results ])

  function renderTemplate (template, data) {
    return template.replace(/{{\s?([a-zA-Z0-9_]+)\s?}}/g, (out, name) => data[name] || out)
  }

  function showingResults (template) {
    const templateData = {
      from: (page - 1) * RESULTS_PER_PAGE + 1,
      to: Math.min((page - 1) * RESULTS_PER_PAGE + RESULTS_PER_PAGE, results.results.length),
      total: results.results.length,
      query: `_"${query}"_`
    }

    return renderTemplate(template, templateData)
  }

  function noMatchingResults (template) {
    const templateData = {
      query: `_"${query}"_`
    }

    return renderTemplate(template, templateData)
  }

  function pageOnChange (_, value) {
    navigate(`/${pageContext.lang}/search/?query=${encodeURIComponent(query)}&page=${encodeURIComponent(value)}`)
  }

  return (
    <SearchPageQuery
      render={pageContent => (
        <Layout headData={{ title: `${pageContent.meta_title_prefix}: ${query}` }}>
          <Container>
            <HeadingWrap>
              <h1>{pageContent.title}</h1>
              <SearchContainer>
                <SearchField />
              </SearchContainer>
            </HeadingWrap>
            <Content>
              {results.results && results.results.length > 0 &&
                <div>
                  <SearchUpper>
                    <div>
                      <Column>
                        <Markdown source={showingResults(pageContent.showing_results)} />
                      </Column>
                    </div>
                    <div>
                      <Column>
                        <Pagination
                          count={Math.ceil(results.results.length / RESULTS_PER_PAGE)}
                          page={page}
                          onChange={pageOnChange}
                          boundaryCount={1}
                          siblingCount={1}
                        />
                      </Column>
                    </div>
                  </SearchUpper>
                  <Items>
                    {results.results.slice((page - 1) * RESULTS_PER_PAGE, (page - 1) * RESULTS_PER_PAGE + RESULTS_PER_PAGE).map((post) => (
                      <Fragment key={post.path}>
                        <SearchResult result={post} query={query} />
                      </Fragment>
                    ))}
                  </Items>
                  <SearchLower>
                    <Pagination
                      count={Math.ceil(results.results.length / RESULTS_PER_PAGE)}
                      page={page}
                      onChange={pageOnChange}
                      boundaryCount={1}
                      siblingCount={1}
                    />
                  </SearchLower>
                </div>
              }
              {results.results && results.results.length === 0 &&
                <Box marginBottom={10}>
                  <Markdown source={noMatchingResults(`## ${pageContent.no_results}`)} />
                </Box>
              }
              {!results.results &&
                <Box marginBottom={10}>
                  <LoadingWrapper>
                    <LoadingContainer>
                      <CircularProgress />
                    </LoadingContainer>
                  </LoadingWrapper>
                </Box>
              }
            </Content>
          </Container>
        </Layout>
      )}
    />
  )
}

const SearchPage = ({ data, pageContext }) => (
  <Location>
    {({ location }) => (
      <SearchPageInner data={data} pageContext={pageContext} location={location} />
    )}
  </Location>
)

SearchPage.propTypes = {
  pageContext: PropTypes.shape({
    lang: PropTypes.string.isRequired
  }).isRequired,
  data: PropTypes.object
}

SearchPageInner.propTypes = {
  pageContext: PropTypes.shape({
    lang: PropTypes.string.isRequired
  }).isRequired,
  data: PropTypes.object,
  location: PropTypes.object
}

export default SearchPage
