import React from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import MD from "../utils/MD"
// import PageLink from "./PageLink"
//import Container, { Col } from "./Container"

type Props = {
  className?: string
  content: string
}

const Hero: React.FC<Props> = ({ className, content }) => {
  return (
    <StyledHero className={`container ${className}`}>
      <MD content={content} />
    </StyledHero>
  )
}

const StyledHero = styled.div`
  ${tw``}
`
export default Hero
