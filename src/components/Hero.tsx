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
          <div tw="flex flex-col py-12 md:py-48 max-w-4xl m-auto">
            <Logo className="logo" tw="mb-4" />
            <Composer className="composer" tw="mb-16" />
            <h2>
              <MD content={content} removeRootP={true} />
            </h2>
          </div>
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
