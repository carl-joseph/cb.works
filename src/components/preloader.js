import React, { useEffect } from "react"
import gsap from "gsap"

export default function Preloader() {
  useEffect(() => {
    if (document.body.classList.contains("site-loaded")) {
      gsap.set(".preloader", { display: "none" })
    } else {
      gsap.to(".preloader .logo--main", {y:'-100%', duration:0.35, delay: 1.35, ease: "power3.inOut"})
      gsap.to(".preloader", { opacity: 0, duration: 1, delay: 1.5, onComplete: () => {gsap.set(".preloader", { display: "none" }); document.body.classList.add("site-loaded") }})
    }
  }, [])

  return (
    <div className='preloader flex'>
      <div className='ma flex gap-20 m-gap-15 align-center'>
        <div className='overflow'>
          <div className='logo--main large'/>
        </div>
        <div className='overflow tr-1'><p className='caption op-50'>A Web Development Practice</p></div>
      </div>
    </div>
  )
}