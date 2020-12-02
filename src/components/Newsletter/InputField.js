import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import subscribe from '@input-output-hk/mailchimp-subscribe'
import TextForm from '../Inputs/TextForm'
import config from '../../mailchimp-config'
import Loader from '../Loader'

const LoaderContainer = styled.div`
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  > div {
    vertical-align: middle;
  }
`

const SubmitLoader = () => {
  return (
    <LoaderContainer>
      <Loader size={2} />
    </LoaderContainer>
  )
}

const InputField = ({ lang }) => {
  const containerRef = useRef(null)
  const [ email, setEmail ] = useState('')
  const [ error, setError ] = useState('')
  const [ success, setSuccess ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const onChange = v => {
    setError('')
    setSuccess('')
    setEmail(v)
  }

  const onSubmit = async () => {
    setError('')
    setSuccess('')
    setLoading(true)
    const languages = {
      en: 'English',
      ja: 'Japanese',
      ko: 'Korean',
      zh: 'Chinese'
    }

    try {
      const result = await subscribe({
        email,
        uID: config.mailchimp.uID,
        audienceID: config.mailchimp.audienceID,
        listName: config.mailchimp.listName,
        customFields: {
          LANG: languages[lang] || languages.en,
          LISTSEG: 'MVP-site'
        }
      })

      if (!containerRef.current) return
      setLoading(false)
      setSuccess(result.message)
      setEmail('')
    } catch (error) {
      if (!containerRef.current) return
      setLoading(false)
      setError(error.message)
    }
  }

  return (
    <div ref={containerRef}>
      <TextForm
        value={email}
        error={error}
        success={success}
        disabled={loading}
        onChange={onChange}
        onSubmit={onSubmit}
        inputType='email'
        submitLabel={loading ? <SubmitLoader /> : 'Submit'}
        label='You email address...'
      />
    </div>
  )
}

InputField.propTypes = {
  lang: PropTypes.string.isRequired
}

export default InputField
