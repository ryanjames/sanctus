import React from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"
import tw from "twin.macro"

interface Props {
  to?: string
  href?: string
  className?: string
}

const clearPlayer = () => {
  if (window.WaveSurfer) {
    if (window.player) {
      window.player.destroy()
      document.body.className = ""
    }
  }
}

const PageLink: React.FC<Props> = ({ to, href, className, children }) => {
  let url = to || ""
  if (href) {
    url = `/${href.replace(/http:\/\/\/|http:\/\/|\//, "")}`
  }

  return (
    <StyledPageLink to={url} className={className} onClick={clearPlayer}>
      {children}
    </StyledPageLink>
  )
}

const StyledPageLink = styled(Link)`
  ${tw``}
`

export default PageLink
