import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import Markdown from '@input-output-hk/front-end-core-components/components/Markdown'
import Link from '@input-output-hk/front-end-core-components/components/Link'
import Layout from '../components/Layout'
import Container from '../components/Container'
import IndexPageQuery from '../queries/IndexPageQuery'
import ShelleyBackground from '../../resources/images/shelley-background.jpg'
import { TinyColor } from '@ctrl/tinycolor'

const HeroContainer = styled(Container)`
  position: relative;
`

const Hero = styled.div`
  background-image: url(${ShelleyBackground});
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
`

const HeroBackground = styled.div`
  position: absolute;
  overflow: hidden;
  opacity: 0.7;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  svg {
    width: 100%;
    max-width: 120rem;
    min-width: 105rem;
    fill: ${({ theme }) => theme.palette.background.default};
  }
`

const HeroContent = styled.div`
  max-width: 60rem;
  position: relative;
  padding: 8rem 0 12rem;
`

const HeroCTA = styled.div`
  max-width: 60rem;
  padding-top: 4rem;
`

const AvailableTestnets = styled.div`
  display: block;
  max-width: 100rem;
  margin: 0 auto;
  text-transform: uppercase;
  padding: 4rem 0;

  a {
    font-weight: 600;
  }

  ul {
    list-style: none;
    padding-top: 2rem;
    padding-bottom: 1rem;
    text-align: center;

    li {
      flex: 1;
      padding: 2rem;
      display: inline-block;
      width: 20%;
      min-width: 20rem;
      flex-direction: column;
      justify-content: flex-end;

      img {
        display: block;
        max-width: 5rem;
        margin: 0 auto;
      }

      a {
        display: flex;
        flex-direction: column;
        text-align: center;

        span {
          padding-top: 1rem;
        }
      }
    }
  }

  > h4,
  > div {
    text-align: center;
  }
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
            <HeroBackground>
              <svg viewBox='0,0,100,100'>
                <polygon points='0,0 0,100 100,0' />
              </svg>
            </HeroBackground>
            <HeroContent>
              <Markdown source={content.hero_content} />
              <HeroCTA>
                <Button
                  color='primary'
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
        <Container>
          <AvailableTestnets>
            <h4>{content.available_testnets}</h4>
            <ul>
              <li>
                <Link href='/cardano/overview/' tracking={{ category: 'home_page', label: 'shelley_haskell_cta' }}>
                  <img src='/images/cardano-icon-white.png' alt='Shelley' />
                  <span>Cardano</span>
                </Link>
              </li>
              <li>
                <Link href='/itn/overview/' tracking={{ category: 'home_page', label: 'itn_cta' }}>
                  <img src='/images/cardano-icon-red.svg' alt='Shelley' />
                  <span>ITN</span>
                </Link>
              </li>
              <li>
                <Link href='/plutus/overview/' tracking={{ category: 'home_page', label: 'plutus_cta' }}>
                  <img src='/images/plutus.svg' alt='Plutus' />
                  <span>Plutus</span>
                </Link>
              </li>
              <li>
                <Link href='/marlowe/overview/' tracking={{ category: 'home_page', label: 'marlowe_cta' }}>
                  <img src='/images/marlowe.png' alt='Marlowe' />
                  <span>Marlowe</span>
                </Link>
              </li>
            </ul>
            <div>
              <Link href='/more/'>
                {content.more_label}
              </Link>
            </div>
          </AvailableTestnets>
        </Container>
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
