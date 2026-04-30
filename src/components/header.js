import React from "react"
import { Link } from "gatsby"

export default function Header({ siteTitle }) {
  return (
    <header className='masthead'>
      <div className='grid p20 sm-copy align-top'>
        <Link className='link' to='/'>
          <div className='logo--main'/>
        </Link>
        <div>
          <p className='grey'>CB Works is a web practice, led by Carl Beaverson. We Partner with leading designers and agencies to produce outstanding websites.</p>
          <p className='button'>Learn More</p>
        </div>
        <div className='flex'>
          <Link className='mla button' to='/enquiry'>Project Enquiry</Link>
        </div>
      </div>
    </header>
  )
}
