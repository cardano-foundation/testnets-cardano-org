import React, {
  Fragment,
  useRef,
  useEffect,
  useState,
  useCallback
} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Location } from '@reach/router'
import Markdown from '@input-output-hk/front-end-core-components/components/Markdown'
import Footer from '@input-output-hk/front-end-site-components/components/Footer'
import Theme from '@input-output-hk/front-end-core-components/components/Theme'
import Box from '@material-ui/core/Box'
import TinyColor from '@ctrl/tinycolor'
import YouTube from 'react-youtube'
import {
  FaChevronRight,
  FaChevronDown,
  FaGithub,
  FaExternalLinkAlt
} from 'react-icons/fa'
import Link from '@input-output-hk/front-end-core-components/components/Link'
import Layout from '../components/Layout'
import Blank from './Blank'
import { FIXED_HEADER_OFFSET } from '../constants'
import GlobalContentQuery from '../queries/GlobalContentQuery'
import MarkdownComponents from '../components/MarkdownComponents'
import Grafana from '../components/Grafana'
import Container from '../components/Container'
import config from '../config'
import CardanoDownloader from '../components/MarkdownComponents/CardanoDownloader'
import useMediaQuery from '../helpers/useMediaQuery'

const PageContent = styled.div`
  display: flex;
  margin-bottom: 12rem;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-bottom: 6rem;
  }
`

const SideNavigationContainer = styled(Box)`
  * {
    font-size: 1.6rem;
  }
  position: relative;
  z-index: 0;
  padding: 2rem 0;
  flex-basis: 20%;
  border-right: 0.1rem solid
    ${({ theme }) =>
      new TinyColor(theme.palette.text.primary).setAlpha(0.2).toString()};
  min-height: ${({ navigationheights }) =>
    (navigationheights.min || 0) / 10 + 4}rem;

  > div {
    max-height: ${({ navigationheights }) =>
      navigationheights.max ? `${navigationheights.max / 10}rem` : 'none'};
    overflow-y: auto;
    scrollbar-width: thin;
    padding-right: 2rem;
    max-width: ${({ maxWidth }) =>
      maxWidth === null ? 'none' : `${maxWidth / 10}rem`};

    &::-webkit-scrollbar {
      width: 0.7rem;
    }

    &::-webkit-scrollbar-track {
      background: ${({ theme }) =>
        new TinyColor(theme.palette.text.primary).setAlpha(0.2).toString()};
    }

    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) =>
        new TinyColor(theme.palette.text.primary).setAlpha(0.5).toString()};
      border-radius: 0.35rem;
    }
  }

  &.position-fixed > div {
    position: fixed;
    top: ${(FIXED_HEADER_OFFSET + 20) / 10}rem;
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    flex-basis: 30%;
  }

  &.position-bottom {
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    display: none;

    &.position-bottom {
      display: none;
    }
  }
  &:before {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    left: -25vw;
    width: calc(100% + 25vw);
    height: 100%;
    background: ${({ theme }) => theme.palette.primary.main};
    opacity: 0.05;
  }
`

const MainContent = styled.div`
  padding-left: 4rem;
  flex-basis: 80%;
  max-width: 80%;
  flex-shrink: 2;

  &.no-nav {
    padding-left: 0;
    flex-basis: 100%;
    max-width: 100%;
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    flex-basis: 70%;
    max-width: 70%;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding-left: 0;
    flex-basis: 100%;
    max-width: 100%;
  }
`

const Accordion = styled.div`
  max-height: 0;
  overflow: hidden;

  &.expanded {
    max-height: none;
  }

  > ul {
    padding-top: 0.5rem;
  }
`

const Nav = styled.ul`
  list-style: none;
  margin: 0;

  &.position-top {
    position: static;
  }

  li {
    margin: 1rem 0;

    p {
      text-decoration: underline;
    }

    a {
      &.active {
        text-decoration: underline;
      }
    }

    &:first-of-type {
      margin-top: 0;
    }

    &:last-of-type {
      margin-bottom: 0;
    }

    ul {
      margin-left: 1rem;
      padding-left: 1rem;
      border-left: 0.1rem solid
        ${({ theme }) =>
          new TinyColor(theme.palette.text.primary).setAlpha(0.2).toString()};
    }
  }
`

const AccordionToggle = styled(Link)`
  position: relative;
  padding-right: 2rem;
  display: block;

  &.has-no-content {
    color: ${({ theme }) => theme.palette.text.primary};

    &:hover {
      color: ${({ theme }) => theme.palette.text.primary};
    }
  }

  &.active {
    font-weight: 600;
  }
`

const MarkdownContent = styled.article`
  word-break: break-word;
  max-width: 80rem;
  display: block;
  // overflow: hidden;

  blockquote {
    margin: 1rem 1rem 1rem 2rem;
    padding: 0 0 0 2rem;
    border-left: 0.1rem solid
      ${({ theme }) =>
        new TinyColor(theme.palette.text.primary).setAlpha(0.4).toString()};

    ${({ theme }) => theme.breakpoints.down('xs')} {
      margin-left: 1rem;
      padding-left: 1rem;
    }
  }

  li {
    margin-bottom: 1rem; 
    p {
      display: inline;
    }
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    max-width: none;
  }
`

const MobileInlineNavigation = styled.div`
  ${({ theme }) => theme.breakpoints.up('md')} {
    display: none;
  }
`

const ReportAnIssueLink = styled.a`
  display: flex;
`

/*
const LastUpdated = styled.div`
  p {
    margin: 0;
  }
`
*/

const ExternalLink = styled.a`
  display: inline-block;
`

const NavigationTree = ({
  items,
  lang,
  path,
  ariaLabel,
  currentPathname,
  id = '',
  isRoot = true,
  position,
  setPosition,
  navigationHeights,
  setNavigationHeights,
  autoScroll = true,
  maxWidth,
  setMaxWidth
}) => {
  const isTabletPortraitDown = useMediaQuery('(max-width: 899px)')
  const rootRef = useRef(null)
  const [expanded, setExpanded] = useState(getDefaultExpanded())

  function isActive (path) {
    if (isTabletPortraitDown) {
      return false
    } else {
      const resolvedPath = lang ? `/${lang}${path}` : path
      if (currentPathname.substring(0, resolvedPath.length) === resolvedPath) { return true }
      return false
    }
  }

  function getDefaultExpanded () {
    const expanded = {}
    const itemsWithChildren = items.filter(
      ({ children }) => children.length > 0
    )
    itemsWithChildren.forEach((item) => {
      expanded[item.path] = isActive(item.path)
    })

    return expanded
  }

  const updateNavigationHeights = useCallback(() => {
    const { bottom, top } = rootRef.current.getBoundingClientRect()
    const { min, max } = navigationHeights
    const newMax = window.innerHeight - FIXED_HEADER_OFFSET - 40
    const newMin = Math.min(Math.abs(top - bottom), newMax)
    if (min !== newMin || max !== newMax) { setNavigationHeights({ min: newMax, max: newMax }) }
  }, [navigationHeights, rootRef])

  const updateMaxWidth = useCallback(() => {
    const { left, right } =
      rootRef.current.parentElement.parentElement.getBoundingClientRect()
    const newMaxWidth = Math.abs(right - left)
    if (maxWidth !== newMaxWidth) setMaxWidth(newMaxWidth)
  }, [maxWidth, rootRef])

  const toggleAccordion = (item) => (e) => {
    if (item.hasContent) return
    e.preventDefault()
    if (isActive(item.path)) return
    setExpanded({
      ...expanded,
      [item.path]: !expanded[item.path]
    })
  }

  const onScroll = useCallback(() => {
    const { top, bottom } =
      rootRef.current.parentElement.parentElement.getBoundingClientRect()
    const { bottom: navBottom, top: navTop } =
      rootRef.current.getBoundingClientRect()
    if (position === 'top' && top <= 0 + FIXED_HEADER_OFFSET) {
      setPosition('fixed')
    } else if (position !== 'top' && top > 0 + FIXED_HEADER_OFFSET) {
      setPosition('top')
    } else if (position !== 'bottom' && navBottom >= bottom - 20) {
      setPosition('bottom')
    } else if (position === 'bottom' && navTop >= 0 + FIXED_HEADER_OFFSET) {
      setPosition('fixed')
    }
  }, [position, rootRef, navigationHeights])

  useEffect(() => {
    if (isRoot && rootRef.current && autoScroll) {
      updateNavigationHeights()
      updateMaxWidth()
      window.addEventListener('resize', updateNavigationHeights)
      window.addEventListener('resize', updateMaxWidth)
      window.addEventListener('scroll', onScroll)
      window.addEventListener('touchmove', onScroll)
    }

    return () => {
      if (isRoot && rootRef.current && autoScroll) {
        window.removeEventListener('resize', updateNavigationHeights)
        window.removeEventListener('resize', updateMaxWidth)
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('touchmove', onScroll)
      }
    }
  }, [isRoot, rootRef, position, expanded, autoScroll])

  return (
    <Nav
      id={id}
      role="navigation"
      aria-label={ariaLabel}
      key={path}
      ref={rootRef}
      className={isRoot ? `position-${position}` : ''}
    >
      {items.map((item) => (
        <li key={item.path}>
          {item.children.length === 0 && !item.externalHref && (
            <Link
              href={`${item.path}`}
              activeClassName="active"
              title={item.title}
              partiallyActive
              tracking={{ category: 'article_navigation', label: item.path }}
            >
              {item.title}
            </Link>
          )}
          {item.externalHref && (
            <ExternalLink
              href={`${item.externalHref}`}
              title={item.title}
              tracking={{
                category: 'article_navigation_external',
                label: item.externalHref
              }}
            >
              <Box display="flex">
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                >
                  {item.title}
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  marginLeft={1}
                >
                  <FaExternalLinkAlt />
                </Box>
              </Box>
            </ExternalLink>
          )}
          {item.children.length > 0 && !item.externalHref && (
            <>
              <AccordionToggle
                href={item.path}
                className={item.hasContent ? '' : 'has-no-content'}
                onClick={toggleAccordion(item)}
                activeClassName="active"
                partiallyActive
                tracking={{
                  category: 'article_navigation',
                  label: `toggle_accordion_${item.path}`
                }}
                aria-disabled={isActive(item.path) ? 'true' : 'false'}
                aria-controls={item.path}
                aria-expanded={expanded[item.path]}
              >
                <Box display="flex">
                  <Box
                    flex={1}
                    justifyContent="center"
                    flexDirection="column"
                    display="flex"
                  >
                    {item.title}
                  </Box>
                  <Box
                    marginLeft={0.8}
                    justifyContent="center"
                    flexDirection="column"
                    display="flex"
                  >
                    {expanded[item.path] ? (
                      <FaChevronDown />
                    ) : (
                      <FaChevronRight />
                    )}
                  </Box>
                </Box>
              </AccordionToggle>
              <Accordion
                role="region"
                className={expanded[item.path] ? 'expanded' : ''}
              >
                <NavigationTree
                  aria-labelledby={item.path}
                  ariaLabel={`${item.title} subnavigation`}
                  items={item.children}
                  path={item.path}
                  lang={lang}
                  currentPathname={currentPathname}
                  isRoot={false}
                  position={position}
                  navigationHeights={navigationHeights}
                  setNavigationHeights={setNavigationHeights}
                  setPosition={setPosition}
                />
              </Accordion>
            </>
          )}
        </li>
      ))}
    </Nav>
  )
}

NavigationTree.propTypes = {
  items: PropTypes.array.isRequired,
  lang: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  id: PropTypes.string,
  currentPathname: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  isRoot: PropTypes.bool,
  position: PropTypes.oneOf(['top', 'fixed', 'bottom']),
  setPosition: PropTypes.func,
  navigationHeights: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number
  }),
  setNavigationHeights: PropTypes.func,
  maxWidth: PropTypes.number,
  setMaxWidth: PropTypes.func,
  autoScroll: PropTypes.bool
}

const Article = ({ pageContext }) => {
  const [position, setPosition] = useState('top')
  const [navigationHeights, setNavigationHeights] = useState({
    min: null,
    max: null
  })
  const [maxWidth, setMaxWidth] = useState(null)

  function getReportIssueHref ({ pathname, query, hash }) {
    const baseHref = `https://github.com/${config.gitHubRepository}/issues/new?assignees=&labels=content&template=content-issue.md&title=`
    return `${baseHref}${encodeURIComponent(
      `Invalid content ${pathname}${query || ''}${hash || ''}`
    )}`
  }

  const renderDownloaders = (loc) => {
    if (!loc) return
    if (!loc.href) return
    if (loc.href.includes('/cardano/get-started/wallet/')) {
      return <CardanoDownloader />
    }
  }

  /**
   * Replaces references to custom components with rendered component
   * e.g. <!-- include components/OtherComponent --> -> renders components/MarkdownComponents/OtherComponent if it exists
   * e.g. <!-- embed youtube/123 --> -> Renders embedded youtube video with id 123
   */
  function renderArticleContent () {
    let remainingContent = pageContext.content
    const contentParts = []
    // Matches <!-- include components/<MyComponent> --> - where <MyComponent> is Alpha string reference to component
    // Or <!-- embed youtube/id --> - where id is the YouTube video id to embed
    // Or <!-- embed grafana/url --> - where url is the Grafana URL
    // in src/components/MarkdownComponent/index.js
    const pattern =
      /<!--\s(include|embed)\s(components|youtube|grafana)\/([^\s]+)\s-->/
    let match = remainingContent.match(pattern)
    let matchIndex = match ? match.index : -1

    while (remainingContent.length > 0 && matchIndex >= 0) {
      if (matchIndex > 0) {
        contentParts.push(
          <Markdown source={remainingContent.substring(0, matchIndex)} />
        )
      }

      const [_, type, category, value] = match
      if (type === 'include' && category === 'components') {
        const Component = MarkdownComponents[value]
        if (Component) contentParts.push(<Component />)
      } else if (type === 'embed' && category === 'youtube' && value) {
        contentParts.push(
          <YouTube
            videoId={value}
            opts={{
              width: '100%',
              height: '350px'
            }}
          />
        )
      } else if (type === 'embed' && category === 'grafana' && value) {
        contentParts.push(<Grafana embedLink={value} />)
      }

      remainingContent = remainingContent.substring(
        matchIndex + match[0].length
      )
      match = remainingContent.match(pattern)
      matchIndex = match ? match.index : -1
    }

    if (remainingContent) { contentParts.push(<Markdown source={remainingContent} />) }

    return (
      <>
        {contentParts.map((content, index) => (
          <Fragment key={index}>{content}</Fragment>
        ))}
      </>
    )
  }

  return (
    <GlobalContentQuery
      render={(content) => (
        <Layout
          template={Blank}
          headData={{
            title: pageContext.pageTitle,
            meta: [{ name: 'description', content: '' }]
          }}
        >
          <Container>
            <Location>
              {({ location }) => (
                <PageContent>
                  {pageContext.navigationContext.children.length > 0 && (
                    <SideNavigationContainer
                      navigationheights={navigationHeights}
                      maxWidth={maxWidth}
                      className={`position-${position}`}
                    >
                      <div>
                        <NavigationTree
                          ariaLabel={`${pageContext.navigationContext.title} subnavigation`}
                          lang={pageContext.lang}
                          items={pageContext.navigationContext.children}
                          path={`/${pageContext.navigationContext.key}`}
                          currentPathname={location.pathname}
                          position={position}
                          setPosition={setPosition}
                          navigationHeights={navigationHeights}
                          setNavigationHeights={setNavigationHeights}
                          maxWidth={maxWidth}
                          setMaxWidth={setMaxWidth}
                        />
                      </div>
                    </SideNavigationContainer>
                  )}
                  <MainContent
                    className={
                      pageContext.navigationContext.children.length === 0
                        ? 'no-nav'
                        : ''
                    }
                  >
                    {pageContext.navigationContext.children.length > 0 && (
                      <MobileInlineNavigation>
                        <NavigationTree
                          lang={pageContext.lang}
                          ariaLabel={`${pageContext.navigationContext.title} subnavigation`}
                          items={pageContext.navigationContext.children}
                          path={`/${pageContext.navigationContext.key}`}
                          currentPathname={location.pathname}
                          autoScroll={false}
                        />
                      </MobileInlineNavigation>
                    )}
                    <MarkdownContent>{renderArticleContent()}</MarkdownContent>
                    <MarkdownContent>
                      {renderDownloaders(location)}
                    </MarkdownContent>
                    <MarkdownContent>
                      {!pageContext.hasNoChildContent &&
                        (pageContext.previous || pageContext.next) && (
                          <Box
                          display="flex"
                          flexDirection="row"
                          justifyContent="space-between"
                          width="100%"
                        >
                          {pageContext.previous &&
                              pageContext.previous.path !==
                                '/testnets/cardano/' && (
                            <Link
                                    href={pageContext.previous.path}
                                    title={pageContext.previous.title}
                                  >
                                    &larr; {content.previous}
                                  </Link>
                          )}
                          {pageContext.next && (
                              <Link
                              href={pageContext.next.path}
                              title={pageContext.next.title}
                            >
                              {content.next} &rarr;
                            </Link>
                          )}
                        </Box>
                      )}
                    </MarkdownContent>
                    <Box marginTop={2}>
                      {config.gitHubRepository && (
                        <Box display="flex">
                          <ReportAnIssueLink
                            href={getReportIssueHref(location)}
                            tracking={{
                              category: 'article',
                              label: 'report_an_issue'
                            }}
                          >
                            <Box
                              display="flex"
                              marginRight={1}
                              flexDirection="column"
                              justifyContent="center"
                            >
                              <FaGithub />
                            </Box>
                            <Box
                              display="flex"
                              flexDirection="column"
                              justifyContent="center"
                            >
                              <p>{content.report_an_issue}</p>
                            </Box>
                          </ReportAnIssueLink>
                        </Box>
                      )}
                    </Box>
                  </MainContent>
                </PageContent>
              )}
            </Location>
            <Theme.Consumer>
              {({ theme, key }) => (
                <Footer theme={theme.palette.type} variant={key} />
              )}
            </Theme.Consumer>
          </Container>
        </Layout>
      )}
    />
  )
}

Article.propTypes = {
  pageContext: PropTypes.shape({
    pageTitle: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    navigationContext: PropTypes.object.isRequired,
    lastUpdatedFormatted: PropTypes.string,
    previous: PropTypes.object,
    next: PropTypes.object,
    lang: PropTypes.string.isRequired,
    hasNoChildContent: PropTypes.bool
  }).isRequired
}

export default Article
