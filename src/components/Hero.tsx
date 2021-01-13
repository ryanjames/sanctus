import React from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
// import PageLink from "./PageLink"
//import Container, { Col } from "./Container"

type Props = {
  className?: string
}

const Hero: React.FC<Props> = ({ className }) => {
  return (
    <StyledHero className={`container ${className}`}>
      <>Heroe</>
    </StyledHero>
  )
}

const StyledHero = styled.div`
  ${tw``}
`
export default Hero
