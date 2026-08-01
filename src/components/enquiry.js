import React, { useEffect, useState } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import Spacer from "../components/spacer"
import Form from "../components/form"
import { Link } from "gatsby"

export default function Enquiry({ information }) {
  return (
    <div className='p20 grid grid-1-2 m-col-1 m-gap-0'>
      <Preview gallery={information.previews}  />
      <Enquiries information={information} />
      <div style={{height:'100px'}} className='m-show'/>
    </div>
  )
}

const Preview = ({ gallery }) => {
  const [active, setActive] = useState(0)
  useEffect(() => {
    if (gallery.length <= 1) return
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % gallery.length)
    }, 1000)
    return () => clearInterval(interval)
  }, [gallery.length])

  return (
    <div>
      <div className="max-225 m-max-150 m-ma flex flex-col gap-15 m-gap-0">
        <div className='m-hide' style={{height:'14.5px'}} />
        <Link to='/'>
          <div className="bg-grey flex ratio-4-5">
            <div className="project-media bg-grey-100 ratio-8-5 pos-rel">
              {gallery.map((image, index) => (
                <GatsbyImage key={image.id || index} image={image.gatsbyImageData} className={`bg-image preview-image ${index === active ? "active z-2" : ""}`}alt={image.title || ""} />
              ))}
            </div>
          </div>
        </Link>
        <Spacer className='m-show' />
      </div>
    </div>
  )
}

const Enquiries = ({information}) => {
  return (
    <div className='grid grid-2 m-col-1 gap-15 m-gap-40'>
      <div className='flex flex-col gap-15'>
        <p className='sm-copy'>Project Enquiries</p>
        <Form />
      </div>
      <Contact contact={information.contact} />
    </div>
  )
}

export const Contact = ({contact}) => {
  return (
    <div className='flex flex-col gap-15'>
      <p className='sm-copy'>Contact</p>
      <div className='max-450 sm-copy flex flex-col'>
        {contact.map((link, index) => (
          <a className='link-gr mra' target='_blank' rel='noreferrer' href={link.link}>{link.title}</a>
        ))}
      </div>
    </div>
  )
}
