import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Location, Router } from '@reach/router'
import Language from '@input-output-hk/front-end-core-components/components/Language'
import Theme from '@input-output-hk/front-end-core-components/components/Theme'
import IOHKLink, { Provider as LinkProvider } from '@input-output-hk/front-end-core-components/components/Link'
import { Provider as MarkdownProvider } from '@input-output-hk/front-end-core-components/components/Markdown'
import Styles from '@input-output-hk/front-end-site-components/components/Styles'
import { ThemeProvider as MaterialUIThemeProvider } from '@material-ui/core/styles'
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components'
import TinyColor from '@ctrl/tinycolor'
import { analytics, theme } from '@input-output-hk/front-end-core-libraries'
import Zendesk from 'react-zendesk'
import { navigate, Link as GatsbyLink } from 'gatsby'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import config from './config'
import { getThemes } from './themes'
import Search from './state/Search'
import Header from './components/Header'
import Style from './components/Style'

// Default route uses SSR from "pages"
const DefaultRoute = ({ element }) => element
DefaultRoute.propTypes = { element: PropTypes.node.isRequired }

// Used to render all links via @input-output-hk/front-end-core-components/components/Link
const Link = forwardRef((props, ref) => {
  const componentProps = { ...props }
  let Component = GatsbyLink
  if (props.isStatic || !props.isRelative) {
    Component = 'a'
    if (!props.isRelative) {
      componentProps.target = '_blank'
      componentProps.rel = 'noopener noreferrer'
    }
  } else {
    componentProps.to = componentProps.href
    delete componentProps.href
  }

  let tracking = props.tracking
  if (!tracking && props.href) tracking = { label: props.href }
  if (tracking) {
    componentProps.onClick = (e) => {
      analytics.click({ category: tracking.category || 'link', label: tracking.label, event: e })
      props.onClick && props.onClick(e)
    }
  }

  delete componentProps.isStatic
  delete componentProps.isRelative
  delete componentProps.tracking

  return (
    <Component ref={ref} {...componentProps} />
  )
})

Link.propTypes = {
  isStatic: PropTypes.bool.isRequired,
  isRelative: PropTypes.bool.isRequired,
  component: PropTypes.any,
  href: PropTypes.string,
  tracking: PropTypes.shape({
    label: PropTypes.string.isRequired,
    category: PropTypes.string
  }),
  onClick: PropTypes.func
}

const PreWrap = styled.div`
  display: grid;

  pre {
    scrollbar-width: thin;

    &::-webkit-scrollbar {
      width: 0.7rem;
      height: 0.7rem;
    }

    &::-webkit-scrollbar-track {
      background: ${({ theme }) => new TinyColor(theme.palette.text.primary).setAlpha(0.2).toString()};
    }

    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => new TinyColor(theme.palette.text.primary).setAlpha(0.5).toString()};
      border-radius: 0.35rem;
    }
  }
`

const LightCodeRenderer = ({ value = '', language }) => (
  <PreWrap>
    <SyntaxHighlighter language={language} style={atomOneLight}>
      {value}
    </SyntaxHighlighter>
  </PreWrap>
)

LightCodeRenderer.propTypes = {
  value: PropTypes.string,
  language: PropTypes.string
}

const DarkCodeRenderer = ({ value = '', language }) => (
  <PreWrap>
    <SyntaxHighlighter language={language} style={atomOneDark}>
      {value}
    </SyntaxHighlighter>
  </PreWrap>
)

DarkCodeRenderer.propTypes = {
  value: PropTypes.string,
  language: PropTypes.string
}

const App = ({ element }) => {
  function languageOnUpdate ({ lang, prevLang }) {
    if (prevLang && lang !== prevLang) {
      navigate(`/${lang}/`)
      analytics.autoCapture({ category: analytics.constants.LANGUAGE, action: 'language_updated', label: lang })
    }
  }

  function themeOnUpdate ({ theme, prevTheme }) {
    if (prevTheme && theme !== prevTheme) analytics.autoCapture({ category: analytics.constants.THEME, action: 'theme_updated', label: theme })
  }

  function getRoutes (lang) {
    const routes = config.routes.map(({ path, component, props }) => {
      const Component = require(`./routes/${component}.js`).default
      const routes = [ <Component {...props} path={path} key={path} /> ]
      if (config.localization.createLocalizedPages && config.localization.createDefaultPages) {
        routes.push(<Component {...props} key={`/${lang}${path}`} path={`/${lang}${path}`} />)
      }

      return routes
    })

    return routes.reduce((accumulator, currentValue) => [ ...accumulator, ...currentValue ], [])
  }

  return (
    <Location>
      {({ location: { pathname, search, hash } }) => (
        <Language.Provider
          location={{ pathname, search, hash }}
          availableLanguages={config.availableLanguages}
          alternativeLanguages={config.alternativeLanguages}
          onUpdate={languageOnUpdate}
          useURL={config.localization.useURL}
          useNavigator={config.localization.useNavigator}
          persistLang={config.localization.persistLang}
        >
          <Theme.Provider
            themes={getThemes()}
            onUpdate={themeOnUpdate}
            transformTheme={({ config }) => theme.convertThemeToMaterial(config)}
          >
            <Search.Provider>
              <Theme.Consumer>
                {({ theme, originalTheme }) => (
                  <MaterialUIThemeProvider theme={theme}>
                    <StyledThemeProvider theme={theme}>
                      <Language.Consumer>
                        {({ key: lang }) => (
                          <LinkProvider
                            lang={lang}
                            component={Link}
                            isStatic={href => {
                              if (href.match(/^blob:/)) return true
                              return false
                            }}
                          >
                            <MarkdownProvider
                              markdownProps={{
                                renderers: {
                                  code: theme.type === 'dark' ? DarkCodeRenderer : LightCodeRenderer,
                                  link: IOHKLink
                                }
                              }}
                            >
                              <Styles theme={originalTheme.config} />
                              <Style />
                              <Header />
                              <Router>
                                {getRoutes(lang)}
                                <DefaultRoute default element={element} />
                              </Router>
                              <Zendesk zendeskKey={config.zendeskKey} color={{ theme: theme.colors.primary.main }} />
                            </MarkdownProvider>
                          </LinkProvider>
                        )}
                      </Language.Consumer>
                    </StyledThemeProvider>
                  </MaterialUIThemeProvider>
                )}
              </Theme.Consumer>
            </Search.Provider>
          </Theme.Provider>
        </Language.Provider>
      )}
    </Location>
  )
}

App.propTypes = {
  element: PropTypes.node.isRequired
}

export default App
