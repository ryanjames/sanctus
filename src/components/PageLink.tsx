import React from "react"
import { Link } from "gatsby"

interface Props {
  to: string
  className?: string
}

const PageLink: React.FC<Props> = ({ to, className, children }) => {
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  )
}

export default PageLink
