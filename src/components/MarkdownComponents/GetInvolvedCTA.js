import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import Link from '@input-output-hk/front-end-core-components/components/Link'

const GetInvolvedCTA = styled.div`
  background-color: #2133ad;
  color: #ffffff;
  padding: 2.5rem;
  border-radius: 2rem;
  h3 {
    margin-top: 0;
  }
`

export default () => (
  <GetInvolvedCTA>
    <h3>Get involved</h3>
    <p>If you are a developer and want to get involved, register your interest today. Invites will be sent out in stages as we roll out the program.</p>
    <Button component={Link} href='https://input-output.typeform.com/to/OJsf0XcD' variant='contained' color='secondary'>
      Register interest
    </Button>
  </GetInvolvedCTA>
)
