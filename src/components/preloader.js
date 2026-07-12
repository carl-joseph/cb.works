import React, { useEffect } from "react"
import gsap from "gsap"

export default function Preloader() {
  useEffect(() => {
    gsap.to(".preloader", { opacity: 0, duration: 1, delay: 1.5, onComplete: () => gsap.set(".preloader", { display: "none" }) })
  }, [])

  return (
    <div className='preloader flex'>
      <div className='ma flex gap-20 m-gap-15 align-center'>
        <div className='logo--main large'/>
        <div className='overflow'><p className='sm-copy caption op-50'>A Web development practice</p></div>
      </div>
    </div>
  )
}