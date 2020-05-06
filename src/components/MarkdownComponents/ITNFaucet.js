import React from 'react'
import Faucet from '../Faucet'

export default () => (
  <Faucet
    getEndpoint={({ address }) => `https://faucet.beta.jormungandr-testnet.iohkdev.io/send-money/${address}`}
    hasApiKey={false}
    getTransactionURL={({ txid }) => `https://shelleyexplorer.cardano.org/transaction/${txid}/`}
  />
)
