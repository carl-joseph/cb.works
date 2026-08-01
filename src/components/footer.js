import React, { useEffect, useState } from "react"

export default function Footer() {
  return (
    <footer className='colophon'>
      <div className='p20 flex space-between sm-copy'>
        <Socials />
        <Information />
      </div>
    </footer>
  )
}

const Information = () => {
  const [brisbaneTime, setBrisbaneTime] = useState("")
  useEffect(() => {
    const updateBrisbaneTime = () => {
      const parts = new Intl.DateTimeFormat("en-AU", {
        timeZone: "Australia/Brisbane",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).formatToParts(new Date())
      const hour = parts.find(part => part.type === "hour")?.value
      const minute = parts.find(part => part.type === "minute")?.value
      const dayPeriod = parts.find(part => part.type === "dayPeriod")?.value.toLowerCase()
      setBrisbaneTime(`${hour}:${minute}${dayPeriod}`)
    }
    updateBrisbaneTime()
    const interval = setInterval(updateBrisbaneTime, 60000)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className='op-50'>
      ⚲ Brisbane, Aus {brisbaneTime && ` ${brisbaneTime}`}
    </div>
  )
}

const Socials = () => {
  return (
    <div className='op-50'>
      <a target='_blank' rel='norefferer' href='https://x.com/CarlBeaverson'>X</a>, <a target='_blank' rel='norefferer' href='https://instagram.com/cb.works'>Instagram</a>, <a target='_blank' rel='norefferer' href='https://linkedin.com/cb.works'>LinkedIn</a> 
    </div>
  )
}