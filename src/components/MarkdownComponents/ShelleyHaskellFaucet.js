import React from 'react'
import Faucet from '../Faucet'

export default () => (
  <Faucet
    getEndpoint={({ address, apiKey }) => `https://shelley-haskell-testnet.iohkdev.io/send-money/${address}?apiKey=${apiKey}`}
    hasApiKey
    getTransactionURL={({ txid }) => `https://shelleyexplorer.cardano.org/transaction/${txid}/`}
  />
)
