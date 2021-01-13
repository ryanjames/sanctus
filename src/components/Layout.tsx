/** @jsx jsx */ import { jsx } from "@emotion/react"
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Header from "./Header"

interface Props {
  className?: string
}

const Layout: React.FC<Props> = ({ children, className }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className={className}>
      <Header siteTitle={data.site.siteMetadata.title} />
      <main>{children}</main>
      <Helmet>
        <script src="https://unpkg.com/wavesurfer.js"></script>
      </Helmet>
      <footer>Copyright Dan Koch</footer>
    </div>
  )
}

export default Layout
