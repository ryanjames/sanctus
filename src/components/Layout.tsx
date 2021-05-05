import React, { useState } from "react"
import SEO from "../components/SEO"
import styled from "@emotion/styled"
import colors from "../config/colors"
import LogoWaveform from "../components/LogoWaveform"
import LogoWordmark from "../components/LogoWordmark"
import LogoWordmarkMobile from "../components/LogoWordmarkMobile"
import HeaderGradient from "../components/HeaderGradient"
import tw from "twin.macro"
import GlobalCss from "../config/GlobalCss"
import Close from "../graphics/close.svg"
import Menu from "../graphics/menu.svg"
import { Helmet } from "react-helmet"
import TransitionLink, { TransitionState } from "gatsby-plugin-transition-link"
import { motion } from "framer-motion"

export interface LayoutProps {
  className?: string
  title?: string
  meta?: []
  page?: string
  owner?: string
  description?: string
  ogImage?: string
}

const Nav: React.FC<LayoutProps> = ({ page }) => {
  return (
    <nav>
      {page !== "home" && (
        <TransitionLink
          to="/"
          exit={{ length: 0.4, state: { opacity: 0 } }}
          entry={{ delay: 0.4, state: { opacity: 1 } }}
        >
          Home
        </TransitionLink>
      )}
      <TransitionLink
        className={page == "features" ? "-selected" : ""}
        to="/work"
        exit={{ length: 0.4, state: { opacity: 0 } }}
        entry={{ delay: 0.4, state: { opacity: 1 } }}
      >
        Work
      </TransitionLink>
      <TransitionLink
        className={page == "library" ? "-selected" : ""}
        to="/library"
        exit={{ length: 0.4, state: { opacity: 0 } }}
        entry={{ delay: 0.4, state: { opacity: 1 } }}
      >
        Music Library
      </TransitionLink>
      <TransitionLink
        className={page == "about-and-contact" ? "-selected" : ""}
        to="/about-and-contact"
        exit={{ length: 0.4, state: { opacity: 0 } }}
        entry={{ delay: 0.4, state: { opacity: 1 } }}
      >
        About / Contact
      </TransitionLink>
    </nav>
  )
}

const Layout: React.FC<LayoutProps> = ({ title, description, page, children, meta, owner, ogImage, className }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(mobileMenuOpen ? false : true)
  }

  return (
    <TransitionState>
      {({ transitionStatus, entry, exit }) => (
        <StyledLayout className={className}>
          <GlobalCss />
          <Helmet>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
          </Helmet>
          <SEO title={title} description={description} meta={meta} owner={owner} ogImage={ogImage} />
          <motion.div
            tw="fixed top-0 left-4 sm:top-4 sm:left-10 z-50"
            initial={entry.state}
            animate={transitionStatus === "exiting" ? exit.state : { opacity: 1 }}
            transition={transitionStatus === "exiting" ? { duration: exit.length } : { duration: 0.4 }}
          >
            <div tw="hidden md:block relative">{page !== "home" ? <LogoWaveform /> : <LogoWordmark />}</div>
            <div tw="relative md:hidden">
              <LogoWordmarkMobile />
            </div>
          </motion.div>
          <div className="desktop-nav" tw="hidden sm:block">
            <Nav page={page} />
          </div>
          <Menu onClick={toggleMobileMenu} tw="sm:hidden cursor-pointer absolute z-50 right-8 top-8" />
          <div className={`mobile-nav ${mobileMenuOpen ? "active" : ""}`} tw="sm:hidden">
            <Close onClick={toggleMobileMenu} tw="cursor-pointer absolute right-8 top-8" />
            <Nav page={page} />
          </div>
          <motion.main
            tw="w-full md:w-auto sm:px-12 md:px-0"
            initial={entry.state}
            animate={transitionStatus === "exiting" ? exit.state : { opacity: 1 }}
            transition={transitionStatus === "exiting" ? { duration: exit.length } : { duration: 3.4 }}
          >
            <HeaderGradient />
            {children}
          </motion.main>
          <footer />
        </StyledLayout>
      )}
    </TransitionState>
  )
}

const StyledLayout = styled.div`
  ${tw`pt-32`}
  .desktop-nav {
    ${tw`fixed top-12 right-12 z-50`}
    a {
      ${tw`pb-2 ml-8`}
      &.-selected {
        ${tw`border-0 border-b-2 border-solid`}
        border-color: ${colors["bright-sun"]};
      }
    }
  }
  .mobile-nav {
    transition: all 0.5s ease-in-out;
    ${tw`z-50 bg-gray-900 absolute w-full h-full pt-24 top-0 right-0`}
    transform: translateX(100%);
    &.active {
      transform: translateX(0);
    }
    svg path {
      fill: #fff;
    }
  }
  .mobile-nav a {
    transition: border 0.3s ease-in-out;
    ${tw` pb-2 text-xl block text-center my-6`}
    border-bottom: 3px solid transparent;
    &.-selected {
      color: ${colors["bright-sun"]};
    }
  }
  /*
      &.-selected {
      border-color: ${colors["bright-sun"]};
    }
  */
  .header-spacer {
    height: 63px;
    @media (min-width: 640px) {
      height: 80px;
    }
  }
  .footer-library {
    padding-bottom: 24px;
    @media (min-width: 640px) {
      position: fixed;
      bottom: 0;
      padding-top: 0;
    }
  }
`

export default Layout
