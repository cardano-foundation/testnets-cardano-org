import React from 'react'
import Faucet from '../Faucet'

export default () => (
  <Faucet
    getEndpoint={({ address, apiKey }) => `https://faucet2.cardano-testnet.iohkdev.io/send-money/${address}?apiKey=${apiKey}`}
    hasApiKey
    getTransactionURL={({ txid }) => `https://cardano-explorer.cardano-testnet.iohkdev.io/tx/${txid}`}
  />
)
