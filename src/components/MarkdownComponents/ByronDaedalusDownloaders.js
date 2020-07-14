import React from 'react'
import WalletDownloaders from '../WalletDownloaders'

export default () => (
  <WalletDownloaders
    gaCategory='byron_daedalus_downloaders'
    settingsEndpoint='https://updates-cardano-testnet.s3.amazonaws.com/daedalus-latest-version.json'
  />
)
