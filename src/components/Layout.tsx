/** @jsx jsx */ import { jsx } from "@emotion/react"
import React from "react"
import SEO from "../components/SEO"
import siteContent from "../staticQueries/siteContent"
import GlobalCss from "../config/GlobalCss"
import { Helmet } from "react-helmet"
import colors from "../config/colors"
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
    <div className={className}>
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
      {page !== "home" && <Header page={page} />}
      <main>{children}</main>
      <footer>
        &copy; {year} {defaults.owner}
      </footer>
    </div>
  )
}

export default Layout
