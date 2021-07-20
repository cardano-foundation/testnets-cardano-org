import React, { useState } from 'react'
import { useInput } from './hooks/useInput'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

export default function SimpleFaucet () {
  const {
    value: address,
    bind: bindAddress,
    reset: resetAddress
  } = useInput('')
  const [ submitted, setSubmitted ] = useState(false)
  const [ error, setError ] = useState(false)
  const [ loading, setLoading ] = useState(false)

  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({ address: `${address}` })
  }
  const handleSubmit = (evt) => {
    evt.preventDefault()
    setLoading(true)
    fetch(
      'https://testnets.cardano.org/api/submit-address',
      requestOptions
    ).then((response) => {
      if (response.ok) {
        resetAddress()
        setSubmitted(true)
        setLoading(false)
      } else if (!response.ok) {
        resetAddress()
        setError(true)
        setLoading(false)
      }
    })
  }
  return (
    <Box maxWidth='40rem' marginTop={4} marginBottom={4} position='relative'>
      <form onSubmit={handleSubmit}>
        <Box marginBottom={2}>
          <TextField required label='Address' fullWidth {...bindAddress} />
        </Box>
        {submitted && (
          <div style={{ color: 'green' }}>
            Success! You have submitted your address
          </div>
        )}
        {error && (
          <span style={{ color: 'red' }}>
            There was a problem with the address input
          </span>
        )}
        <Box display='flex' justifyContent='flex-end'>
          <Button
            value='submit'
            type='submit'
            color='primary'
            variant='contained'
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Request funds'}
          </Button>
        </Box>
      </form>
    </Box>
  )
}
