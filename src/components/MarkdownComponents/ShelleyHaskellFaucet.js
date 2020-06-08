import React from 'react'
import Faucet from '../Faucet'

export default () => (
  <Faucet
    getEndpoint={({ address, apiKey }) => `https://faucet.ff.dev.cardano.org/send-money/${address}?apiKey=${apiKey}`}
    hasApiKey
  />
)
