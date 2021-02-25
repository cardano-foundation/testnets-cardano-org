import React from 'react'
import styled from 'styled-components'
import Markdown from '@input-output-hk/front-end-core-components/components/Markdown'
import Container from '../components/Container'
import Layout from '../components/Layout'
import NotFoundPageQuery from '../queries/NotFoundPageQuery'
import AlgoliaSearch from '../components/AlgoliaSearchField'

const Wrapper = styled.div`
  text-align: center;
  padding: 4rem 0;
`

const SearchContainer = styled.div`
  padding-top: 2rem;
  max-width: 30rem;
  display: block;
  margin: 0 auto;
`

export default () => (
  <NotFoundPageQuery
    render={(content) => (
      <Layout>
        <Container>
          <Wrapper>
            <h1>{content.title}</h1>
            <Markdown source={content.body_content} />
            <SearchContainer>
              <AlgoliaSearch />
            </SearchContainer>
          </Wrapper>
        </Container>
      </Layout>
    )}
  />
)
