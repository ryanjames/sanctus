import React, { ReactNode } from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import Container, { Col } from "./Container"
import Img, { FluidObject } from "gatsby-image"
import PageLink from "./PageLink"

type Props = {
  className?: string,
  heading: string,
  button: {
    link: string,
    label: string,
  },
  background: FluidObject,
}

const Cta: React.FC<Props> = ({ className, heading, button, background }) => {
  return (
    <StyledCta className={className}>
      <div className="cta-background">
        <Img className="cta-background-image" fluid={background} />
      </div>
      <Container className="cta-container">
        <Col className="cta-content">
          <h2>{heading}</h2>
          <PageLink to={button.link} className="feature-button">
            {button.label}
          </PageLink>
        </Col>
      </Container>
    </StyledCta>
  )
}

const StyledCta = styled.section`
  ${tw``}
  position: relative;
  .cta-container {
    position: relative;
    z-index: 1;
  }
  .cta-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .cta-background {
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 0;
    .cta-background-image {
      width: 100%;
      height: 100%;
    }
  }
  padding: 12% 0;
  h2 {
    text-align: center;
    width: 100%;
    display: block;
    font-weight: 700;
    font-size: 1.7em;
    margin-bottom: 32px;
  }
  .feature-button {
    padding: 0.8em 1em;
    border-radius: 6px;
    background: #689CB2;
    display: inline-block;
  }
`
export default Cta
