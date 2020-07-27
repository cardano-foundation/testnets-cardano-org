import React, { Fragment } from 'react'
import WalletDownloaders from '../WalletDownloaders'
// import Downloaders from '../Downloaders'
export default () => (
  <Fragment>
    {/* <Downloaders />
    <hr/> */}
    <WalletDownloaders
      gaCategory='shelley_daedalus_downloaders'
      settingsEndpoint='https://updates-shelley-testnet.s3.amazonaws.com/daedalus-latest-version.json'
    />
  </Fragment>
)
