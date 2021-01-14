import React from "react"
import { Link } from "gatsby"

interface Props {
  to?: string
  href?: string
  className?: string
}

const PageLink: React.FC<Props> = ({ to, href, className, children }) => {
  let url = to || ""
  if (href) {
    url = `/${href.replace(/http:\/\/\/|http:\/\/|\//, "")}`
  }

  return (
    <Link to={url} className={className}>
      {children}
    </Link>
  )
}

export default PageLink
