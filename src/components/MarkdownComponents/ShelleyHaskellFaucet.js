import React from 'react'
import Faucet from '../Faucet'

export default () => (
  <Faucet
    getEndpoint={({ address }) => `https://shelley-haskell-testnet.iohkdev.io/send-money/${address}`}
    hasApiKey
    getTransactionURL={({ txid }) => `https://shelleyexplorer.cardano.org/transaction/${txid}/`}
  />
)
