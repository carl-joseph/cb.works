import React, { useEffect, useState } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import Form from "../components/form"

export default function Enquiry({ information }) {
  return (
    <div className='p20 grid grid-1-2 m-col-1'>
      <Preview gallery={information.previews}  />
      <Contact information={information} />
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
      <div className="max-275">
        <div className="bg-grey flex ratio-1-1">
          <div className="project-media bg-grey-100 ratio-8-5 pos-rel">
            {gallery.map((image, index) => (
              <GatsbyImage key={image.id || index} image={image.gatsbyImageData} className={`bg-image preview-image ${index === active ? "active z-2" : ""}`}alt={image.title || ""} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const Contact = ({information}) => {
  return (
    <div className='grid grid-2 m-col-1 gap-15'>
      <div className='flex flex-col gap-15'>
        <p className='sm-copy'>Project Enquiries</p>
        <Form />
      </div>
      <Details contact={information.contact} />
    </div>
  )
}

const Details = ({contact}) => {
  return (
    <div className='flex flex-col gap-15'>
      <p className='sm-copy'>Contact</p>
      <div className='max-450 flex flex-col'>
        {contact.map((link, index) => (
          <a className='sm-copy link-gr mra' href={link.link}>{link.title}</a>
        ))}
      </div>
    </div>
  )
}
