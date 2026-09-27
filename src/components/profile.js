import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Volume2, VolumeX, Pause, Play } from "lucide-react"
import { GatsbyImage } from "gatsby-plugin-image"
import Spacer from "../components/spacer"
import { Link } from "gatsby"

export const Profile = ({image, video}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [previewPaused, setPreviewPaused] = useState(false)
  const originalVideoRef = useRef(null)

  const openModal = () => {
    originalVideoRef.current?.pause()
    setIsClosing(false)
    setPreviewPaused(true)
    setIsOpen(true)
    requestAnimationFrame(() => {
      setIsVisible(true)
    })
  }

  const closeModal = () => {
    setIsClosing(true)
  }

  return (
  <>
    <div className='flex flex-col gap-15 m-gap-0'>
      <div className='m-hide' style={{height:'14.5px'}} />
      <div className='max-225 flex flex-col gap-5 m-mt40 m-mb40 m-max-150 m-100 m-ma'>
        <div className={`video--preview ratio-3-4 pointer bg-grey pos-rel${previewPaused ? " paused" : ""}`} onClick={openModal}>
          {image ? <GatsbyImage image={image.gatsbyImageData} className='bg-image' alt='CB Works' /> : ""}
          {( video ? <video ref={originalVideoRef} src={video} muted playsInline autoPlay loop className='bg-image' />:'')}
        </div>
        <p className='f-10 m-show op-50'>Studio BTS</p>
      </div>
      <Spacer className='m-show' />
    </div>
    {isOpen && (
      <VideoPlayer video={video} image={image} isVisible={isVisible} isClosing={isClosing} closeModal={closeModal} onFadeOutEnd={() => { setIsOpen(false); setPreviewPaused(false); setIsClosing(false); setIsVisible(false); originalVideoRef.current?.play().catch(() => {})}} />
    )}
  </>
  )
}

export const VideoPlayer = ({ video, image, closeModal, isClosing, isVisible, onFadeOutEnd }) => {
  const videoRef = useRef(null)
  const [muted, setMuted] = useState(false)
  const [playing, setPlaying] = useState(true)

  const togglePlay = async () => {
    const player = videoRef.current
    if (!player) return

    if (player.paused) {
      try {
        await player.play()
        setPlaying(true)
      } catch {
        setPlaying(false)
      }
    } else {
      player.pause()
      setPlaying(false)
    }
  }
  const toggleSound = () => {
    const player = videoRef.current
    if (!player) return

    player.muted = !player.muted
    setMuted(player.muted)
  }
  return (
    <div className={`video--modal${isVisible ? " is-visible" : ""}${isClosing ? " is-closing" : ""}`} onTransitionEnd={isClosing ? onFadeOutEnd : undefined}>
      <div className='player bg-black ratio-9-16 pos-rel'>
        {image ? <GatsbyImage image={image.gatsbyImageData} className='bg-image' alt='CB Works' /> : ""}
        {( video ? <video ref={videoRef} src={video} onClick={togglePlay} playsInline autoPlay loop className='bg-image pointer' />:'')}
        <div className='controls flex align-center'>
          {playing ? <Pause size={15} onClick={togglePlay} color="white" />: <Play onClick={togglePlay} size={15} color="white" />}
          {muted ? <VolumeX size={17} onClick={toggleSound} color="white"/> : <Volume2 onClick={toggleSound} size={17} color="white"/>}
        </div>
      </div>
      <div className='background' onClick={closeModal}/>
    </div>
  )
}