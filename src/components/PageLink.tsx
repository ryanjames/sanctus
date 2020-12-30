import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { Location } from "@reach/router"

const PageLink = ({ to, className, children }) => {
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

PageLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default PageLink
