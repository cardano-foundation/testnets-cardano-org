import React from 'react'
import Faucet from '../Faucet'

export default () => (
  <Faucet
    singular
    getEndpoint={({ address, reCaptchaResponse }) => `https://faucet.cardano-testnet.iohkdev.io/send-money/${address}&g-recaptcha-response=${reCaptchaResponse}`}
    getTransactionURL={({ txid }) => `https://explorer.cardano-testnet.iohkdev.io/tx/${txid}`}
    reCaptcha={{
      version: 2,
      sitekey: '6LeUZ64ZAAAAAMHWlSUqsT2bt8HS5fZXngoyeMRB'
    }}
    getNativeAssetEndpoint={({ address, reCaptchaResponse }) => `https://faucet.cardano-testnet.iohkdev.io/send-money/${address}?&g-recaptcha-response=${reCaptchaResponse}`}
  />
)
