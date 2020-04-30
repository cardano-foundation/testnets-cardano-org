import React from 'react'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Link from '@input-output-hk/front-end-core-components/components/Link'
import Layout from '../components/Layout'
import Container from '../components/Container'
import IndexPageQuery from '../queries/IndexPageQuery'

const CTAGroup = styled.div`
  display: flex;
  margin-top: 5rem;
  margin-bottom: 10rem;

  > div {
    padding: 2rem;
    flex: 1;
    display: flex;
    justify-content: flex-end;

    &:last-of-type {
      justify-content: flex-start;
    }

    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  ${({ theme }) => theme.breakpoints.down('xs')} {
    flex-direction: column;
  }
`

export default () => (
  <IndexPageQuery
    render={(content) => (
      <Layout>
        <Container>
          <Box textAlign='center'>
            <h1>{content.title}</h1>
          </Box>
          <CTAGroup>
            <div>
              <div>
                <Button
                  href='/introduction/welcome/'
                  component={Link}
                  color='primary'
                  variant='contained'
                >
                  CTA (A)
                </Button>
              </div>
            </div>
            <div>
              <div>
                <Button
                  href='/resources/commodo-ipsum/lobortis/'
                  component={Link}
                  color='primary'
                  variant='outlined'
                >
                  CTA (B)
                </Button>
              </div>
            </div>
          </CTAGroup>
        </Container>
      </Layout>
    )}
  />
)
