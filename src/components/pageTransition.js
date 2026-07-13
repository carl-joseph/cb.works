import React, { useEffect, useRef } from "react"
import { navigate } from "gatsby"
import { useLocation } from "@reach/router"

const PageTransition = ({ children }) => {
  const transitionRef = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const transitionWrapper = transitionRef.current
    if (!transitionWrapper) return

    function fadeOutPage(event, path) {
      event.preventDefault()
      if (pathname === path) return
      transitionWrapper.classList.remove("fade--in")
      transitionWrapper.classList.add("fade--out")
      setTimeout(() => navigate(path), 350)
    }

    function fadeInPage() {
      
      window.scrollTo(0, 0)
      transitionWrapper.classList.contains("fade--out") && transitionWrapper.classList.remove("fade--out")
      transitionWrapper.classList.add("fade--in")
    }

    fadeInPage()

    const links = document.querySelectorAll("a")

    links.forEach(link => {
      if (link.hasAttribute("target")) return
      const path = link.getAttribute("href")
      link.addEventListener("click", e => fadeOutPage(e, path))
    })

    return () => {
      links.forEach(link => {
        const path = link.getAttribute("href")
        link.removeEventListener("click", e => fadeOutPage(e, path))
      })
    }
  }, [pathname])

  return (
    <div className='page--transition fade--in' ref={transitionRef}>
      {children}
    </div>
  )
}

export default PageTransition
