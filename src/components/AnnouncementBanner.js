import React from 'react'
import styled from 'styled-components'
import { Link } from '@input-output-hk/front-end-core-components/components/'

const Announcement = styled.div`
width:100%;
text-align: center;
padding: 1rem 0;
background: green;
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
    <h5>New Plutus Pioneer Program - <Link href='/plutus-pioneer-program/'>Register Now</Link></h5>
  </Announcement>
)

export default AnnouncementBanner
