import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from '@input-output-hk/front-end-core-components/components/Link'
import Theme from '@input-output-hk/front-end-core-components/components/Theme'
import { FaExternalLinkAlt } from 'react-icons/fa'

const Container = styled.div`
  margin: 4rem 0;
  width: 100%;
`

const ExternalLink = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`

const Frame = styled.iframe`
  width: 100%;
  height: 25rem;
  border: none;
`

const Grafana = ({ embedLink, theme }) => {
  let src = embedLink
  if (src.indexOf('theme') > -1) {
    src = src.replace(/theme=[^&]+/, `theme=${theme}`)
  } else {
    if (src.indexOf('?') > -1) {
      src += `&theme=${theme}`
    } else {
      src += `?theme=${theme}`
    }
  }

  return (
    <Frame
      src={src}
      frameborder='0'
    />
  )
}

Grafana.propTypes = {
  embedLink: PropTypes.string.isRequired,
  theme: PropTypes.oneOf([ 'dark', 'light' ])
}

const GrafanaOuter = ({ embedLink }) => (
  <Container>
    <ExternalLink>
      <Link href={embedLink} title='Grafana dashboard'><FaExternalLinkAlt /></Link>
    </ExternalLink>
    <Theme.Consumer>
      {({ theme }) => (
        <Grafana embedLink={embedLink} theme={theme.type} />
      )}
    </Theme.Consumer>
  </Container>
)

GrafanaOuter.propTypes = {
  embedLink: PropTypes.string.isRequired
}

export default GrafanaOuter
