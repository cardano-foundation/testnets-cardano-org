import React from 'react'
import styled from 'styled-components'
import Markdown from '@input-output-hk/front-end-core-components/components/Markdown'
import Layout from '../components/Layout'
import Container from '../components/Container'
import PlutusPioneerPageQuery from '../queries/PlutusPioneerPageQuery'
import TestnetBackground from '../../resources/images/header_press.png'
import { TinyColor } from '@ctrl/tinycolor'
import HubSpotForm from '../components/HubSpotForm'
const HeroContainer = styled(Container)`
  position: relative;
`

const Hero = styled.div`
  overflow:hidden;
  background:linear-gradient(90deg, rgba(0,51,173,1) 0%, rgba(51,92,190,1) 100%);
  position: relative;
`

const HeroBackground = styled.div`
  background: url(${TestnetBackground});
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  overflow: hidden;
  top: 0;
  bottom: 0;
  left: 0;
  right: -10rem;
  @media(max-width:767px){
    background-size: contain;
    right:0;
  }
`

const HeroContent = styled.div`
  max-width: 60rem;
  position: relative;
  padding: 8rem 0 12rem;
  h1, p {
    color: ${({ theme }) => theme.palette.primary.contrastText};
  }
  a span {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`

const TechnicalSupportContainer = styled.div`
  background-color: ${({ theme }) => new TinyColor(theme.palette.background.default).lighten(4).toString()};
  h2 {
    text-transform: none;
  }
`

export default () => (
  <PlutusPioneerPageQuery
    render={(content) => (
      <Layout>
        <Hero>
          <HeroContainer>
            <HeroBackground />
            <HeroContent>
              <Markdown source={content.hero_content} />
            </HeroContent>
          </HeroContainer>
        </Hero>
        <TechnicalSupportContainer>
          <Container>
            <Markdown source={content.page_content} />
          </Container>
          <Container id='plutus'>
            <h2>Yes, I'm interested!</h2>
            <p>Please share your details and we will be in touch soon</p>
            <HubSpotForm />
          </Container>
        </TechnicalSupportContainer>
      </Layout>
    )}
  />
)
