import React, { Fragment } from 'react'
import styled from 'styled-components'
import { FiSearch } from 'react-icons/fi'
import TinyColor from '@ctrl/tinycolor'
import Language from '@input-output-hk/front-end-core-components/components/Language'
import GlobalContentQuery from '../queries/GlobalContentQuery'

const Form = styled.form`
  width: 100%;
  display: block;
  position:relative;
`

const Input = styled.input`
  width: 80%;
  border: 0.1rem solid ${({ theme }) => new TinyColor(theme.palette.text.primary).lighten(70).toString()};
  background: transparent;
  height: 3.8rem;
  padding: 0 2rem;
  border-radius: 1.9rem 0 0 1.9rem;
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
  opacity: ${({ disabled }) => disabled ? 0.4 : 1};
  transition: opacity 0.2s ease-in-out, background-color 0.2s ease-in-out;
  color: ${({ theme }) => theme.palette.text.primary};
  font-weight: 600;
  border-radius: 0 1.9rem 1.9rem 0;
  position: absolute;
  top:0;
  right:0;

`

const SearchField = () => {
  return (
    <GlobalContentQuery
      render={globalContent => (
        <Language.Consumer>
          {({ key: lang }) => (// eslint-disable-line no-unused-vars
            <Fragment>
              <Form
                aria-label={globalContent.search_form_aria_label}
              >
                <Input
                  id='doc-search-input'
                  type='text'
                  name='search-field'
                  placeholder={globalContent.search}
                  aria-label={globalContent.search_form_aria_label}
                />
                <Submit
                  type='submit'
                  aria-label={globalContent.search_form_submit_aria_label}
                >
                  <FiSearch />
                </Submit>
              </Form>
            </Fragment>
          )}
        </Language.Consumer>
      )}
    />
  )
}

export default SearchField
