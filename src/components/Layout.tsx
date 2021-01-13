/** @jsx jsx */ import { jsx } from "@emotion/react"
import React from "react"
import SEO from "../components/SEO"
import siteContent from "../staticQueries/siteContent"
import GlobalCss from "../config/GlobalCss"

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
      <SEO defaults={defaults} title={title} description={description} meta={meta} owner={owner} ogImage={ogImage} />
      <Header page={page} />
      <main>{children}</main>
      <footer>
        &copy; {year} {defaults.owner}
      </footer>
    </div>
  )
}

export default Layout
