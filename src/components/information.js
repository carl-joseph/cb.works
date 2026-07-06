import React, { useEffect, useState } from "react"
import { GatsbyImage } from "gatsby-plugin-image"

export default function Information({ information }) {
  return (
    <div className='p20 grid grid-1-2 m-col-1'>
      <Profile image={information.image} video={information.video} />
      <Content information={information} />
    </div>
  )
}

const Profile = ({image, video}) => {
  return (
    <div>
      <div className='max-275 m-max-150'>
        <div className='ratio-3-4 bg-grey pos-rel'>
          {image ? <GatsbyImage image={image.gatsbyImageData} className='bg-image' alt='CB Works' /> : ""}
          {( video ? <video src={video} muted playsInline autoPlay loop className='bg-image' />:'')}
        </div>
      </div>
    </div>
  )
}

const Studio = ({information, className}) => {
  return (
    <div className={'flex flex-col gap-15 '+className}>
      <p className='sm-copy'>Studio</p>
      <div className='max-450 op-50 white-space'>{information}</div>
    </div>
  )
}

const Content = ({information}) => {
  return (
    <div className='flex flex-col row-130 m-gap-40'>
      <div className='grid grid-2 m-col-1'>
        <Studio className='m-hide' information={information.studio} />
        <div className='flex flex-col gap-15'>
          <p className='sm-copy'>Process</p>
          <div className='max-450 flex flex-col gap-15'> 
            {information.process.map((process, index) => (
              <div><span className='mr5'>{process.title}:</span><span className='op-50'>{process.content}</span></div>
            ))}
          </div>
          <p className='sm-copy op-50 mt10 button'>Request Full Process</p>
        </div>
      </div>
      <div className='grid grid-2 m-col-1 m-gap-40'>
        <div className='flex flex-col gap-15'>
          <p className='sm-copy'>Capabilities</p>
          <div className='max-450 white-space op-50'>{information.capabilities}</div>
        </div>
        <div className='flex flex-col gap-15'>
          <p className='sm-copy'>Ethos</p>
          <div className='max-450 white-space op-50'>{information.ethos}</div>
        </div>
      </div>
      <div className='grid grid-2 m-col-1 m-gap-40'>
        <Team join={information.join} />
        <div className='flex flex-col gap-15'>
          <p className='sm-copy'>Contact</p>
          <div className='max-450 flex flex-col'>
            {information.contact.map((link, index) => (
              <a className='sm-copy link-gr mra' href={link.link}>{link.title}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


const names = ["The team", "Carl", "Mary", "Aru", "Calvin"]

const Team = ({ join }) => {
  const [text, setText] = useState("")
  const [nameIndex, setNameIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = names[nameIndex]
    let timeout
    if (!isDeleting && text !== current) {
      timeout = setTimeout(() => {
        setText(current.slice(0, text.length + 1))
      }, 100)
    } else if (!isDeleting && text === current) {
      timeout = setTimeout(() => {
        setIsDeleting(true)
      }, 1500)
    } else if (isDeleting && text.length > 0) {
      timeout = setTimeout(() => {
        setText(current.slice(0, text.length - 1))
      }, 100)
    } else if (isDeleting && text.length === 0) {
      setIsDeleting(false)
      setNameIndex((nameIndex + 1) % names.length)
    }

    return () => clearTimeout(timeout)
  }, [text, isDeleting, nameIndex])

  return (
    <div className="flex flex-col gap-15">
      <p className="sm-copy">
        Join {text}
        <span className="cursor grey">|</span>
      </p>

      <div className="max-450 op-50">{join}</div>
    </div>
  )
}
