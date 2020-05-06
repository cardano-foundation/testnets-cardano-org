import React from 'react'
import Faucet from '../Faucet'

export default () => (
  <Faucet
    getEndpoint={({ address }) => `https://kevm-testnet.iohkdev.io:8099/faucet?address=${address}`}
    hasApiKey={false}
    getTransactionURL={({ txid }) => `https://kevm-testnet.iohkdev.io/tx/${txid}`}
  />
)
