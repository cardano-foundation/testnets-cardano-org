/* eslint-disable react/jsx-closing-tag-location */
import React, { useState } from 'react'
// portalId: "8848114",
// formId: "21dc6180-37b5-4dcf-8f57-596656b726a2"

// eslint-disable-next-line no-unused-vars
const initialFormState = {
  firstname: '',
  email: ''
}

const HubSpotForm = () => {
  const [ firstname, setFormName ] = useState('')
  const [ email, setFormEmail ] = useState('')
  const [ submitted, setSubmitted ] = useState(false)
  const handleSubmit = e => {
    e.preventDefault()
    // eslint-disable-next-line no-undef
    const xhr = new XMLHttpRequest()
    const url = 'https://api.hsforms.com/submissions/v3/integration/submit/8848114/21dc6180-37b5-4dcf-8f57-596656b726a2'
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
        pageUri: 'sign-up',
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

  return (
    <div>
      {!submitted
        ? <form method='POST' action='/sign-up/' onSubmit={handleSubmit}>
          <label>
            <p>Name:</p>
            <input
              type='text'
              id='firstname'
              name='firstname'
              placeholder='Your name here...'
              value={firstname}
              onChange={e => setFormName(e.target.value)}
              required='required'
            />
          </label>
          <label>
            <p>Email:</p>
            <input
              type='text'
              id='email'
              name='email'
              placeholder='Your email address*'
              value={email}
              onChange={e => setFormEmail(e.target.value)}
              required='required'
            />
          </label>
          <button type='submit'>Submit</button>

          <h4>
            {firstname}
          </h4>
          <h4>
            {email}
          </h4>
        </form>
        : <h2>
          Thankyou for signing up!
        </h2>
      }
    </div>
  )
}

export default HubSpotForm
