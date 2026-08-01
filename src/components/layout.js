import React from "react"
import Header from "./header"
import { ReactLenis } from "lenis/react"
import PageTransition from "./pageTransition"
import Preloader from "./preloader"
import Footer from "./footer"
import "../scss/site.scss"

const SCROLL_OPTIONS = {
  duration: 1.2,
  orientation: "vertical",
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 1,
  smoothTouch: false,
}

export default function Layout({ children, homepage, footer, enquiry, information }) {
  return (
    <ReactLenis root options={SCROLL_OPTIONS}>
      {( homepage ? <Preloader />:'')}
      <Header enquiry={enquiry} homepage={homepage} information={information} />
      <PageTransition>
        <main>{children}</main>
        {( footer ? <Footer />:'')}
      </PageTransition>
    </ReactLenis>
  )
}
