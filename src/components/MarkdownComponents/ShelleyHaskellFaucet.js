import React from 'react'
import Faucet from '../Faucet'

export default () => (
  <Faucet
    getEndpoint={({ address, apiKey, reCaptchaResponse }) => `https://faucet.shelley-testnet.dev.cardano.org/send-money/${address}?apiKey=${apiKey}&g-recaptcha-response=${reCaptchaResponse}`}
    hasApiKey
    reCaptcha={{
      version: 2,
      sitekey: '6LeUZ64ZAAAAAMHWlSUqsT2bt8HS5fZXngoyeMRB'
    }}
  />
)
