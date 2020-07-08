import React from 'react'
import Faucet from '../Faucet'

export default () => (
  <Faucet
    getEndpoint={({ address, reCaptchaResponse }) => `https://faucet.beta.jormungandr-testnet.iohkdev.io/send-money/${address}?g-recaptcha-response=${reCaptchaResponse}`}
    hasApiKey={false}
    getTransactionURL={({ txid }) => `https://shelleyexplorer.cardano.org/transaction/${txid}/`}
    reCaptcha={{
      version: 2,
      sitekey: '6LeUZ64ZAAAAAMHWlSUqsT2bt8HS5fZXngoyeMRB'
    }}
  />
)
