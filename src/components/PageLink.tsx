import React from "react"
import { Link } from "gatsby"
import { Location } from "@reach/router"

interface Props {
  to: string
  className?: string
}

const PageLink: React.FC<Props> = ({ to, className, children }) => {
  return (
    <Location>
      {({ location }) => {
        const inAdmin = location.pathname.includes("admin")
        if (inAdmin) {
          return <a className={className}>{children}</a>
        } else {
          return (
            <Link to={to} className={className}>
              {children}
            </Link>
          )
        }
      }}
    </Location>
  )
}

export default PageLink
