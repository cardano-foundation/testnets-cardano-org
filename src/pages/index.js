import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import Markdown from '@input-output-hk/front-end-core-components/components/Markdown'
import Link from '@input-output-hk/front-end-core-components/components/Link'
import Layout from '../components/Layout'
import Container from '../components/Container'
import IndexPageQuery from '../queries/IndexPageQuery'
import TestnetBackground from '../../resources/images/cardano-testnet-header-hyperspace.png'
import { TinyColor } from '@ctrl/tinycolor'

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

const HeroCTA = styled.div`
  max-width: 60rem;
  padding-top: 4rem;
`

const TechnicalSupportContainer = styled.div`
  background-color: ${({ theme }) => new TinyColor(theme.palette.background.default).lighten(4).toString()};
`

const TechnicalSupport = styled.div`
  padding: 8rem 0;
  text-align: center;
  max-width: 100rem;
  margin: 0 auto;
  display: block;
`

const TechnicalSupportCTA = styled.div`
  padding-top: 4rem;
`

export default () => (
  <IndexPageQuery
    render={(content) => (
      <Layout>
        <Hero>
          <HeroContainer>
            <HeroBackground />
            <HeroContent>
              <Markdown source={content.hero_content} />
              <HeroCTA>
                <Button
                  color='default'
                  variant='contained'
                  component={Link}
                  href={content.hero_cta_href}
                  tracking={{ category: 'home_page_hero_cta', label: content.hero_cta_href }}
                >
                  {content.hero_cta_label}
                </Button>
              </HeroCTA>
            </HeroContent>
          </HeroContainer>
        </Hero>
        <TechnicalSupportContainer>
          <Container>
            <TechnicalSupport>
              <Markdown source={content.tecnhical_support_content} />
              <TechnicalSupportCTA>
                <Button
                  component={Link}
                  href={content.technical_support_cta_href}
                  variant='contained'
                  color='primary'
                  tracking={{ category: 'home_page', label: 'technical_support_cta' }}
                >
                  {content.technical_support_cta_label}
                </Button>
              </TechnicalSupportCTA>
            </TechnicalSupport>
          </Container>
        </TechnicalSupportContainer>
      </Layout>
    )}
  />
)
