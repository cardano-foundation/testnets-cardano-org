import React from 'react'
import Faucet from '../Faucet'

export default () => (
  <Faucet
    getEndpoint={({ address }) => `https://faucet.kevm.dev.cardano.org:8099/faucet?address=${address}`}
    hasApiKey={false}
    getTransactionURL={({ txid }) => `https://explorer.kevm.dev.cardano.org/tx/${txid}`}
  />
)
