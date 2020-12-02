import React from 'react'
import InputField from './InputField'
import styled from 'styled-components'

const Container = styled.div`
  h3 {
    margin:0 0 4rem;
    text-align:center
  }
  /* @media screen and (max-width:${({ theme }) => theme.dimensions.mobileBreakpoint - 1}px){
    padding:6rem 0 0;
  } */
`

const FormContainer = styled.div`
  width: 100%;
  max-width: 50rem;
  margin: 4rem auto 6rem;
  display: block;
  /* @media screen and (max-width:${({ theme }) => theme.dimensions.mobileBreakpoint - 1}px){
    margin: 4rem 2rem 0;
    width: auto;
  } */
`

export default () => (
  <Container>
    <FormContainer>
      <InputField lang='en' />
    </FormContainer>
  </Container>
)
