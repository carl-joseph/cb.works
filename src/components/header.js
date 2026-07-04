import React, { useEffect, useRef, useState } from "react"
import { Link } from "gatsby"

export default function Header({homepage}) {
  const infoRef = useRef(null)
  const innerRef = useRef(null)
  const [open, setOpen] = useState(true)
  useEffect(() => {
    const handleScroll = () => {
      const isTop = window.scrollY < 10
      setOpen(isTop)
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  useEffect(() => {
    if (!infoRef.current || !innerRef.current) return
    infoRef.current.style.height = open
      ? `${innerRef.current.offsetHeight}px`
      : "0px"
  }, [open])
  return (
    <header className='masthead' onMouseOver={() => setOpen(true)} onMouseLeave={() => window.scrollY !== 0 && setOpen(false)}>
      <div className='grid p20 sm-copy align-top'>
        <div>
          <Link className='link' to='/'>
            <div className='logo--main'/>
          </Link>
        </div>
        {( homepage ? <Information open={open} infoRef={infoRef} innerRef={innerRef} />:<Link className='button' to='/'>Go Back</Link>)}
        <div className='flex'>
          <Link className='mla button' to='/enquiry'>Project Enquiry</Link>
        </div>
      </div>
    </header>
  )
}

const Information = ({ open, infoRef, innerRef }) => {
  return (
    <div className='information-wrapper'>
      <div className='information' ref={infoRef}>
        <div className={`grey internal ${open ? "is-open" : ""}`} ref={innerRef}>
          CB Works is a web practice, led by Carl Beaverson. We partner with leading designers and agencies to produce outstanding websites.
        </div>
      </div>
      <Link to='/information' className='button'>{open ? "Learn More" : "Information"}</Link>
    </div>
  )
}