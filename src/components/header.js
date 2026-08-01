import React, { useEffect, useRef, useState } from "react"
import { Link } from "gatsby"

export default function Header({homepage, enquiry, information}) {
  const infoRef = useRef(null)
  const innerRef = useRef(null)
  const isHoveringRef = useRef(false)

  const [open, setOpen] = useState(true)
  useEffect(() => {
    const handleScroll = () => {
      const isTop = window.scrollY < 10

      if (!isHoveringRef.current) {
        setOpen(isTop)
      }
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  useEffect(() => {
    if (!infoRef.current || !innerRef.current) return
    infoRef.current.style.height = open
      ? `${innerRef.current.scrollHeight}px`
      : "0px"
  }, [open])
  return (
    <header className='masthead'>
      <div className='grid m-col-2 p20 sm-copy align-top'>
        <div>
          <Link className='link' to='/'>
            <div className='logo--main'/>
          </Link>
        </div>
        <div className='m-hide'>
          {!information ? <Information open={open} infoRef={infoRef} innerRef={innerRef} onMouseEnter={() => { isHoveringRef.current = true; setOpen(true) }} onMouseLeave={() => { isHoveringRef.current = false; if (window.scrollY >= 10) setOpen(false) }} /> : <Link className='mla button' to='/'>Return Home</Link>}
        </div>
        <div className='flex m-hide'>
          {!enquiry ? (<Link className='mla button' to='/enquiry'>Project Enquiry</Link>):(<Link className='mla button' to='/'>Return Home</Link>)}
        </div>
        <MobileMenu />
      </div>
    </header>
  )
}

const MobileMenu = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className='m-show mla'>
      <div className='flex gap-5'>
        <p className={'button '+(open ? 'open':'')} type='button' onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</p>
        <div className={`mobile--menu flex gap-5 overflow ${open ? "is-open" : ""}`}>
          <Link className='link' to='/information'>Information,</Link>
          <Link className='link' to='/enquiry'>Enquiry</Link>
        </div>
      </div>
    </div>
  )
}

const Information = ({ open, infoRef, innerRef, onMouseEnter, onMouseLeave }) => {
  return (
    <div className='information-wrapper' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className='information' ref={infoRef}>
        <div className={`grey internal ${open ? "is-open" : ""}`} ref={innerRef}>
          CB Works is a web practice, led by Carl Beaverson. We partner with leading designers and agencies to produce outstanding websites.
        </div>
      </div>
      <Link to='/information' className='button'>{open ? "Learn More" : "Information"}</Link>
    </div>
  )
}