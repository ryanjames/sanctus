/** @jsx jsx */ import { jsx } from "@emotion/react"
import React from "react"
import SEO from "../components/SEO"
import styled from "@emotion/styled"
import tw from "twin.macro"
import siteContent from "../staticQueries/siteContent"
import GlobalCss from "../config/GlobalCss"
import { Helmet } from "react-helmet"
import Header from "./Header"

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
  const year = new Date().getFullYear()

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
      </Helmet>
      <SEO defaults={defaults} title={title} description={description} meta={meta} owner={owner} ogImage={ogImage} />
      {page !== "home" && (
        <>
          <div className="header-spacer" />
          <Header page={page} />
        </>
      )}
      <main>{children}</main>
      <footer tw="text-center w-full block py-24" className={page ? `footer-${page}` : ""}>
        &copy; {year} {defaults.owner}
      </footer>
    </StyledLayout>
  )
}

const StyledLayout = styled.div`
  ${tw``}
  .header-spacer {
    height: 80px;
  }
  .footer-library {
    position: fixed;
    bottom: 0;
    padding-top: 0;
    padding-bottom: 24px;
  }
`

export default Layout
