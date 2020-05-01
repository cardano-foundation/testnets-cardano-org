import React from 'react'
import styled from 'styled-components'
import MuiContainer from '@material-ui/core/Container'

const StyledContainer = styled(MuiContainer)`
  @media screen and (min-width: 1280px) {
    max-width: 1500px;
  }

  @media screen and (min-width: 2048px) {
    max-width: 1920px;
  }
`

const Container = (props) => (
  <StyledContainer {...props} maxWidth='lg' />
)

export default Container
