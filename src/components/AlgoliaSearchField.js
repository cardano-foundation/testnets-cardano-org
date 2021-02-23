import React, { useEffect } from 'react'
import styled from 'styled-components'
import { FiSearch } from 'react-icons/fi'
import TinyColor from '@ctrl/tinycolor'
import useScript from '../hooks/use-script'

const SearchWrap = styled.form`
  min-width:315px;
  > span {
    display:inline  !important;
  }
`

const Input = styled.input`
  width: 80%;
  border: 0.1rem solid ${({ theme }) => new TinyColor(theme.palette.text.primary).lighten(70).toString()};
  background: transparent;
  height: 3.8rem;
  padding: 0 2rem;
  border-radius: 1.9rem 0 0 1.9rem;
  border-right:0;
  vertical-align: middle;
  color: ${({ theme }) => theme.palette.text.primary};

  &::placeholder {
    color: ${({ theme }) => theme.palette.text.primary};
  }

  &:focus{
    background: ${({ theme }) => theme.palette.common.white};
    color: ${({ theme }) => theme.palette.common.black};
    outline: none;

    &::placeholder {
      color: ${({ theme }) => theme.palette.common.black};
    }
  }
`

const Submit = styled.button`
  width: 20%;
  vertical-align: middle;
  height: 3.8rem;
  border: 0.1rem solid ${({ theme }) => new TinyColor(theme.palette.text.primary).lighten(70).toString()};
  border-left: 0;
  background-color: transparent;
  
  transition: opacity 0.2s ease-in-out, background-color 0.2s ease-in-out;
  color: ${({ theme }) => theme.palette.text.primary};
  font-weight: 600;
  border-radius: 0 1.9rem 1.9rem 0;
  position: relative;
`

const AlgoliaSearch = () => {
  const [ loaded ] = useScript('https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js')

  const setUpSearch = (ready) => {
    /* eslint-disable */
    ready && docsearch({
      apiKey: '97d8fa6bcde8d0dbb2e6d560390d3503',
      indexName: 'developers-cardano',
      inputSelector: '#algolia_search_input',
      debug: false // Set debug to true if you want to inspect the dropdown
    })
  }

  useEffect(() => {
    setUpSearch(loaded)
  }, [ loaded ])
  return (
    <SearchWrap role='search'>
      <Input type='search' placeholder='Search...' id='algolia_search_input' />
      <Submit
        type='submit'
        aria-label='search'
        disabled
      >
        <FiSearch />
      </Submit>
    </SearchWrap>
  )
}

export default AlgoliaSearch
