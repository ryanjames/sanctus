import React, { useRef } from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import Img, { FluidObject } from "gatsby-image"
import ReactPlayer from "react-player"
import PageLink from "./PageLink"
import Container, { Col } from "./Container"
import { Media } from "../models/home"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import formattingOptions from "../utils/formattingOptions"
import assets from "../staticQueries/assets"

type Props = {
  className?: string,
  media?: Media
  body: string,
  button?: {
    link: string,
    label: string,
  },
  orientation?: string,
}

const Feature: React.FC<Props> = ({ className, media, body, button, orientation = "left" }) => {
  const content = JSON.parse(body)
  const featureAssets = assets()
  const player = useRef<ReactPlayer>(null)

  const presentMedia = (media?: Media) => {
    if(media) {
      switch(media.type) {
        case "fluid":
          return <div className="feature-image"><Img fluid={media.object as FluidObject} /></div>
        case "static":
          return <div className="feature-image"><img className="feature-image" src={media.object as string} /></div>
        case "video":
          return (
            <div className="feature-image">
              <ReactPlayer
                playing={true}
                ref={player}
                url={media.object as string}
                loop={true}
                width="100%"
                volume={1}
                height="100%"
                controls={false}
              />
            </div>
          )
      }
    } else {
      return undefined
    }

  }


  return (
    <StyledFeature className={className} data-orientation={orientation}>
      <div className="feature-text-space" />
      {presentMedia(media)}
      <div className="feature-text">
        <Container className="feature-text-inner">
          <Col tw="w-full xs:w-1/2">
            <div>
              {documentToReactComponents(content, formattingOptions(featureAssets))}
            </div>
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
    margin-bottom: 2em;
    margin-top: 2em;
  }
  .feature-text-inner {
    width: 100%;
  }
  .feature-text {
    @media (min-width: 480px) {
      padding-top: 0;
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
    }
    display: flex;
    justify-content: center;
    h3 {
      font-weight:700;
      line-height: 1.2em;
      font-size: 1.7em;
    }
  }

`
export default Feature
