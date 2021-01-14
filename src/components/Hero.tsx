import React from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import MD from "../utils/MD"
import Logo from "../graphics/logo.svg"
import Composer from "../graphics/composer.svg"
import Container, { Col } from "./Container"

type Props = {
  className?: string
  content: string
}

const Hero: React.FC<Props> = ({ className, content }) => {
  return (
    <StyledHero className={`container ${className}`}>
      <Container>
        <Col>
          <div tw="flex flex-col">
            <Logo className="logo" tw="mb-4" />
            <Composer className="composer" />
          </div>
          <h2>
            <MD content={content} removeRootP={true} />
          </h2>
        </Col>
      </Container>
    </StyledHero>
  )
}

const StyledHero = styled.div`
  ${tw``}
  .logo {
    width: 260px;
    height: auto;
  }
  .composer {
    width: 132px;
    height: auto;
  }
`
export default Hero
