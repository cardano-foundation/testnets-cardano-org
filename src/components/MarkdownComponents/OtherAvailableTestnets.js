import React from 'react'
import styled from 'styled-components'
import Link from '@input-output-hk/front-end-core-components/components/Link'
import Markdown from '@input-output-hk/front-end-core-components/components/Markdown'
import GlobalContentQuery from '../../queries/GlobalContentQuery'

const Container = styled.div`
  display: flex;
  margin: 6rem 0;
  flex-direction: column;

  > div {
    flex: 1;
    text-align: center;
    padding: 2rem;

    > div {
      display: flex;
      justify-content: center;

      > a {
        display: flex;
        justify-content: flex-end;
        flex-direction: column;

        > img {
          max-width: 10rem;
          display: block;
          margin: 0 auto;
        }

        > span {
          margin-top: 1rem;
        }
      }
    }
  }
`

export default () => (
  <GlobalContentQuery
    render={content => (
      <Container>
        <div>
          <div>
            <Link href='/more/kevm/overview/'>
              <img src='/images/kevm.svg' alt='KEVM icon' />
              <span>KEVM</span>
            </Link>
          </div>
          <Markdown source={content.kevm_description} />
        </div>
        <div>
          <div>
            <Link href='/more/iele/overview/'>
              <img src='/images/iele.svg' alt='IELE icon' />
              <span>IELE</span>
            </Link>
          </div>
          <Markdown source={content.iele_description} />
        </div>
      </Container>
    )}
  />
)
