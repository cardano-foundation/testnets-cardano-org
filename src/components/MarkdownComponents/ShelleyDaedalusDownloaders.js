import React, { Fragment } from 'react'
import WalletDownloaders from '../WalletDownloaders'
export default () => (
  <Fragment>
    <WalletDownloaders
      gaCategory='shelley_daedalus_downloaders'
      settingsEndpoint='https://updates-shelley-testnet.s3.amazonaws.com/daedalus-latest-version.json'
    />
  </Fragment>
)
