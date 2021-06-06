import React from "react"
import { navigate } from "gatsby"
import styled from "@emotion/styled"
import tw from "twin.macro"

interface Props {
  to?: string
  href?: string
  className?: string
  onMouseEnter?: any
}

const PageLink: React.FC<Props> = ({ to, href, className, children, onMouseEnter }) => {
  let url = to || ""
  if (href) {
    url = `/${href.replace(/http:\/\/\/|http:\/\/|\//, "")}`
  }

  const go = () => {
    if (window.player) {
      document.body.className = ""
      window.player.destroy()
    }
    window.muteAll()
    navigate(url)
  }

  return (
    <StyledPageLink className={className} onClick={go} onMouseEnter={onMouseEnter}>
      {children}
    </StyledPageLink>
  )
}

const StyledPageLink = styled.a`
  ${tw``}
  cursor: pointer;
`

export default PageLink
