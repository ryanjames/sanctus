import React from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import Img, { FluidObject } from "gatsby-image"
import PageLink from "./PageLink"
import Container, { Col } from "./Container"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import formattingOptions from "../utils/formattingOptions"
import assets from "../staticQueries/assets"

type Props = {
  className?: string,
  media: FluidObject,
  body: string,
  button?: {
    link: string,
    label: string,
  },
  orientation?: string,
}

const CaseStudyFeature: React.FC<Props> = ({ className, media, body, button, orientation = "left" }) => {
  const content = JSON.parse(body)
  const caseStudyAssets = assets()
  return (
    <StyledFeature className={className} data-orientation={orientation}>
      <div className="feature-text-space" />
      <Img className="feature-image" fluid={media} />
      <div className="feature-text">
        <Container className="feature-text-inner">
          <Col tw="w-full xs:w-1/2">
            {documentToReactComponents(content, formattingOptions(caseStudyAssets))}
            {button && (
              <PageLink to={button.link} className="feature-button">
                {button.label}
              </PageLink>
            )}
          </Col>
        </Container>
      </div>
    </StyledFeature>
  )
}

const StyledFeature = styled.section`
  ${tw``}
  padding: 3em 0;
  position: relative;
  @media (min-width: 480px) {
    display: flex;
    align-items: center;
  }
  &[data-orientation="right"] {
    flex-direction: row-reverse;
    .feature-text-inner > div {
      display: flex;
      flex-direction: row-reverse;
    }
  }
  .feature-text-space, .feature-image {
    flex: 1;
  }
  .feature-button {
    padding: 0.8em 1em;
    border-radius: 6px;
    background: #689CB2;
    display: inline-block;
    margin-top: 16px;
  }
  .feature-image {
    @media (min-width: 480px) {
      min-height: 450px;
    }
    max-height: 650px;
  }
  .feature-text {
    padding-top: 2em;
    @media (min-width: 480px) {
      padding-top: 0;
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
    }
    display: flex;
    justify-content: center;
    h2 {
      font-weight:700;
      font-size: 1.7em;
    }
  }

`
export default CaseStudyFeature
