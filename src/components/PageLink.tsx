import React from "react"
import { navigate } from "gatsby"
import styled from "@emotion/styled"
import tw from "twin.macro"

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

  const go = () => {
    if (window.WaveSurfer && window.player && url) {
      document.body.className = ""
      window.player.pause()
      window.player.destroy()
    }
    navigate(url)
  }

  return (
    <StyledPageLink className={className} onClick={go}>
      {children}
    </StyledPageLink>
  )
}

const StyledPageLink = styled.span`
  ${tw``}
  cursor: pointer;
`

export default PageLink
