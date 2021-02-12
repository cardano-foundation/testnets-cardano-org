import React from 'react'
import Faucet from '../Faucet'

export default () => (
  <Faucet
    getEndpoint={({ address, apiKey, reCaptchaResponse }) => `https://faucet.cardano-testnet.iohkdev.io/send-money/${address}?apiKey=${apiKey}&g-recaptcha-response=${reCaptchaResponse}`}
    hasApiKey
    getTransactionURL={({ txid }) => `https://cardano-explorer.cardano-testnet.iohkdev.io/tx/${txid}`}
    reCaptcha={{
      version: 2,
      sitekey: '6LeUZ64ZAAAAAMHWlSUqsT2bt8HS5fZXngoyeMRB'
    }}
    getNativeAssetEndpoint={({ address, reCaptchaResponse }) => `https://faucet.cardano-testnet.iohkdev.io/send-money/${address}?asset=${`6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aa7`}&g-recaptcha-response=${reCaptchaResponse}`}
  />
)
