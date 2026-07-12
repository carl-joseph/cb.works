import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"


export default function Grid({ projects }) {
  return (
    <div className='p20 mth m-m0 flex flex-col gap-20 row-150 m-pr0 m-pl0'>
      {projects.map((project, index) => (
        <Project project={project.node} index={index+1} key={index} />
      ))}
    </div>
  )
}

const Project = ({project, index}) => {
  return (
    <div className='project flex flex-col gap-10'>
      <Swiper className='project-gallery' slidesPerView={1.1} slidesOffsetBefore={20} slidesOffsetAfter={20} spaceBetween={10} breakpoints={{ 768: { slidesPerView: 3, slidesOffsetBefore: 0, slidesOffsetAfter: 0, enabled: false } }}>
        {project.imageGallery.map((image, index) => (
          <SwiperSlide key={image.id || index}>
            <Media image={image} title={project.title} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='grid gap-10 m-col-1 m-pr20 m-pl20'>
        <div className='flex gap-5 sm-copy black'>
          <p>{index}. {project.title}</p>
          {( project.link ? <><span className='grey'>/</span><a className='link-gr' target='_blank' rel='noreferrer' href={project.link}>Visit Site</a></>:'')}
        </div>
        <div className='op-50 w-90'>
          {project.description}
        </div>
        <div className='flex op-50 space-between'>
          <p>{project.designCredit}</p>
          <p>{project.year}</p>
        </div>
      </div>
    </div>
  )
}


const Media = ({ image, title }) => {
  const img = image?.gatsbyImageData
  const isPortrait = img ? img.height > img.width : false
  const video = image.customData.video; 
  return (
    <div className='bg-grey ratio-1-1 flex pos-rel'>
        <div className={`project-media bg-grey pos-rel z-2 ${isPortrait ? "ratio-9-19 portrait" : "ratio-8-5"}`}>
          {image ? <GatsbyImage image={image.gatsbyImageData} className='bg-image' alt={title || ""} /> : ""}
          {video ? <video src={video} playsInline autoPlay muted loop className='bg-image' />:''}
        </div>
    </div>
  )
}