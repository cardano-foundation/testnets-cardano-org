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

const AvailableTestnetsWrap = styled(Container)`
  background: ${({ theme }) => theme.palette.grey[50]};
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
        <AvailableTestnetsWrap>
          <AvailableTestnets>
            <h4>{content.available_testnets}</h4>
            <ul>
              <li>
                <Link href='/cardano/overview/' tracking={{ category: 'home_page', label: 'shelley_haskell_cta' }}>
                  <img src='https://ucarecdn.com/d0a80719-c769-477d-94d9-c5fe9ca53597/' alt='Shelley' />
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
                  <img src='/images/marlowe.svg' alt='Marlowe' />
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
        </AvailableTestnetsWrap>
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
