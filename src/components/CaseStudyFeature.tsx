import React from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
// import PageLink from "./PageLink"
//import Container, { Col } from "./Container"

type Props = {
  className?: string
}

const HeaderGradient: React.FC<Props> = ({ className }) => {
  return <StyledHeaderGradient className={`container ${className}`} />
}

const StyledHeaderGradient = styled.div`
  ${tw`fixed top-0 left-0 right-0 h-32 z-40`}
  background: linear-gradient(rgba(28, 30, 40, 0.8), rgba(28, 30, 40, 0));
`
export default HeaderGradient
