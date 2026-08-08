import React, { useEffect, useState } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import Spacer from "../components/spacer"
import { Link } from "gatsby"

export default function Information({ information }) {
  return (
    <div className='p20 grid grid-1-2 m-col-1 m-gap-0'>
      <Profile image={information.image} video={information.video} />
      <Content information={information} />
      <div style={{height:'100px'}} className='m-show'/>
    </div>
  )
}

const Profile = ({image, video}) => {
  return (
    <div className='flex flex-col gap-15 m-gap-0'>
      <div className='m-hide' style={{height:'14.5px'}} />
      <div className='max-225 flex flex-col gap-5 m-mt40 m-mb40 m-max-150 m-100 m-ma'>
        <div className='ratio-4-5 bg-grey pos-rel'>
          {image ? <GatsbyImage image={image.gatsbyImageData} className='bg-image' alt='CB Works' /> : ""}
          {( video ? <video src={video} muted playsInline autoPlay loop className='bg-image' />:'')}
        </div>
        <p className='f-10 m-show op-50'>Carl Beaverson, Director</p>
      </div>
      <Spacer className='m-show' />
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
    <div className='flex flex-col row-120 m-gap-40'>
      <div className='grid grid-2 m-col-1 m-gap-40'>
        <Studio  information={information.studio} />
        <div className='flex flex-col gap-15'>
          <p className='sm-copy'>Process</p>
          <div className='max-450 flex flex-col gap-15'> 
            {information.process.map((process, index) => (
              <div><span className='mr5'>{process.title}:</span><span className='op-50'>{process.content}</span></div>
            ))}
          </div>
          <Link to='/enquiry' className='sm-copy link-gr mt10 button'>Request Full Process</Link>
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
          <div className='max-450 flex sm-copy flex-col'>
            {information.contact.map((link, index) => (
              <a className=' link-gr mra' target='_blank' rel='noreferrer' href={link.link}>{link.title}</a>
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
