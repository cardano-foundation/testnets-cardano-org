import React from 'react'
import Faucet from '../Faucet'

export default () => (
  <Faucet
    getEndpoint={({ address, apiKey, reCaptchaResponse }) => `https://faucet2.cardano-testnet.iohkdev.io/send-money/${address}?apiKey=${apiKey}&g-recaptcha-response=${reCaptchaResponse}`}
    hasApiKey
    getTransactionURL={({ txid }) => `https://cardano-explorer.cardano-testnet.iohkdev.io/tx/${txid}`}
    reCaptcha={{
      version: 2,
      sitekey: '6LeUZ64ZAAAAAMHWlSUqsT2bt8HS5fZXngoyeMRB'
    }}
  />
)
