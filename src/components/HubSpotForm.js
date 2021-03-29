/* eslint-disable react/jsx-closing-tag-location */
import React, { useState } from 'react'
import TinyColor from '@ctrl/tinycolor'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
// portalId: "8848114",
// formId: "21dc6180-37b5-4dcf-8f57-596656b726a2"

const Input = styled.input`
  width: 100%;
  border: 0.1rem solid ${({ theme }) => new TinyColor(theme.palette.text.primary).lighten(70).toString()};
  background: transparent;
  height: 3.8rem;
  padding: 0 2rem;
  border-radius: 1.9rem 1.9rem;
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

// eslint-disable-next-line no-unused-vars
const initialFormState = {
  firstname: '',
  email: ''
}

const HubSpotForm = () => {
  const SendToHubspotAPI = () => {
    // eslint-disable-next-line no-undef
    const xhr = new XMLHttpRequest()
    const url = 'https://api.hsforms.com/submissions/v3/integration/submit/8848114/ad1b4485-b52e-498a-aab7-c902711d7d53'
    // Example request JSON:
    const data = {
      submittedAt: Date.now(),
      fields: [
        {
          name: 'email',
          value: email
        },
        {
          name: 'firstname',
          value: firstname
        }
      ],
      context: {
        pageUri: 'plutus-pioneer-program',
        pageName: 'Signed up'
      }
    }
    // eslint-disable-next-line camelcase
    const final_data = JSON.stringify(data)
    xhr.open('POST', url)
    // Sets the value of the 'Content-Type' HTTP request headers to 'application/json'
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText) // Returns a 200 response if the submission is successful.
        setSubmitted(true)
      } else if (xhr.readyState === 4 && xhr.status === 400) {
        console.log(xhr.responseText) // Returns a 400 error the submission is rejected.
      } else if (xhr.readyState === 4 && xhr.status === 403) {
        console.log(xhr.responseText) // Returns a 403 error if the portal isn't allowed to post submissions.
      } else if (xhr.readyState === 4 && xhr.status === 404) {
        console.log(xhr.responseText) // Returns a 404 error if the formGuid isn't found
      }
    }
    // Sends the request
    xhr.send(final_data)
  }
  const [ firstname, setFormName ] = useState('')
  const [ email, setFormEmail ] = useState('')
  const [ submitted, setSubmitted ] = useState(false)
  const handleSubmit = e => {
    e.preventDefault()
    SendToHubspotAPI()
  }

  return (
    <div>
      {!submitted
        ? <form method='POST' action='/sign-up/' onSubmit={handleSubmit}>
          <label>
            <p>Name<span style={{ color: 'red' }}>*</span> </p>
            <Input
              type='text'
              id='firstname'
              name='firstname'
              placeholder='Your name'
              value={firstname}
              onChange={e => setFormName(e.target.value)}
              required
            />
          </label>
          <label>
            <p>Email<span style={{ color: 'red' }}>*</span> </p>
            <Input
              type='email'
              id='email'
              name='email'
              placeholder='Your email'
              value={email}
              onChange={e => setFormEmail(e.target.value)}
              required
            />
          </label>
          <br /><br />
          <Button type='submit' variant='contained' color='primary'>Submit</Button>
        </form>
        : <p style={{ color: 'green' }}>
          Thanks for expressing your interest in the Plutus Pioneer Program
        </p>
      }
    </div>
  )
}

export default HubSpotForm
