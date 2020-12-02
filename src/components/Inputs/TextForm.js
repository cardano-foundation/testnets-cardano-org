import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import { IoMdPlay } from 'react-icons/io'
import Markdown from '@input-output-hk/front-end-core-components/components/Markdown'

const Form = styled.form`
  width: 100%;
  display: block;
`

const Input = styled.input`
  width: 90%;
  border: none;
  height: 3.8rem;
  padding: 0 2rem;
  vertical-align: middle;
  color: ${({ error, theme }) => error ? theme.palette.error : theme.palette.text.primary};
  background-color: ${({ theme }) => theme.palette.background.default};
  border-bottom: 1px solid ${({ theme }) => theme.palette.primary.main};
  font-size: 1.6rem;

  @media screen and (max-width: 767px) {
    width: 60%;
  }
`

const Submit = styled.button`
  width: 10%;
  @media screen and (max-width: 767px) {
    width:20%;
  }
  vertical-align: middle;
  height: 3.8rem;
  border: none;
  background-color: ${({ theme, disabled }) => disabled ? theme.palette.primary.light : theme.palette.primary.main};
  opacity: ${({ disabled }) => disabled ? 0.4 : 1};
  transition: opacity 0.2s ease-in-out, background-color 0.2s ease-in-out;
  color: ${({ theme }) => theme.palette.text};
  font-weight: 600;
  border-radius: 0;
  position: relative;
  cursor:pointer;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.down('sm')}) {
    border-radius: 0;
    display: block;
    margin: 0 auto;
    width: auto;
    min-width: 20rem;
    padding: 0 4rem;
  }
`

const FormError = styled.div`
  font-weight: 600;
  margin-top: 0.8rem;
  a {
    display:block;
  }
`

const FormSuccess = styled.div`
  color: ${({ theme }) => theme.palette.success};
  font-weight: 600;
  margin-top: 0.8rem;
`
const SubmitIcon = styled(Typography)`
  margin-top: 0.75rem;
`

const TextForm = ({ value, onChange, onSubmit, label, inputType, error, success, disabled }) => (
  <Form
    onSubmit={e => {
      e.preventDefault()
      onSubmit()
    }}
  >
    <Input
      value={value}
      type={inputType}
      onChange={e => {
        e.preventDefault()
        onChange(e.target.value)
      }}
      placeholder={label}
      error={!!error}
    />
    <Submit disabled={disabled || value.length === 0 || error} type='submit'>
      <SubmitIcon variant='h4'>
        <IoMdPlay />
      </SubmitIcon>
    </Submit>
    {error &&
      <FormError>
        <Typography variant='body1' color='error'>
          <Markdown
            source={error}
            escapeHtml={false}
          />
        </Typography>
      </FormError>
    }
    {success &&
      <FormSuccess>
        <Typography variant='body1' color='primary'>
          {success}
        </Typography>
      </FormSuccess>
    }
  </Form>
)

TextForm.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  inputType: PropTypes.string,
  error: PropTypes.string,
  success: PropTypes.string
}

TextForm.defaultProps = {
  inputType: 'text'
}

export default TextForm
