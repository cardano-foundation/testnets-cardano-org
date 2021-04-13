import React from 'react'
import styled from 'styled-components'
import { Link } from '@input-output-hk/front-end-core-components/components/'

const Announcement = styled.div`
width:100%;
text-align: center;
padding: 1rem 0;
background: #fb7575;
color: white;
h5 {
  margin: 0;
  a {
    color: white;
    text-decoration: underline;
  }
}
`

const AnnouncementBanner = () => (
  <Announcement>
    <h5>Want to learn to write Plutus smart contracts? Check out our <Link href='/plutus-pioneer-program/'>Plutus Pioneer Program!</Link></h5>
  </Announcement>
)

export default AnnouncementBanner
