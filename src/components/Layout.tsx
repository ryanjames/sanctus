/** @jsx jsx */ import { jsx } from "@emotion/react"
import React from "react"
import SEO from "../components/SEO"
import styled from "@emotion/styled"
import PageLink from "../components/PageLink"
import LogoWaveform from "../components/LogoWaveform"
import LogoWordmark from "../components/LogoWordmark"
import tw from "twin.macro"
import siteContent from "../staticQueries/siteContent"
import GlobalCss from "../config/GlobalCss"
import { Helmet } from "react-helmet"

export interface LayoutProps {
  className?: string
  title?: string
  meta?: []
  page?: string
  owner?: string
  description?: string
  ogImage?: string
}

const Layout: React.FC<LayoutProps> = ({ title, description, page, children, meta, owner, ogImage, className }) => {
  const defaults = siteContent().defaults

  return (
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
      <SEO defaults={defaults} title={title} description={description} meta={meta} owner={owner} ogImage={ogImage} />
      <span tw="fixed top-10 left-12">{page !== "home" ? <LogoWaveform /> : <LogoWordmark />}</span>
      <nav className="navigation" tw="fixed right-12 top-12">
        {page !== "home" && <PageLink to="/">Home</PageLink>}
        <PageLink to="/work">Work</PageLink>
        <PageLink to="/library">Music Library</PageLink>
        <PageLink to="/about-and-contact">About / Contact</PageLink>
      </nav>
      <main>{children}</main>
      <footer />
    </StyledLayout>
  )
}

const StyledLayout = styled.div`
  ${tw`pt-32`}
  .navigation a {
    ${tw`ml-8`}
  }
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
