import React, { useRef } from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import Img, { FluidObject } from "gatsby-image"
import ReactPlayer from "react-player"
import PageLink from "./PageLink"
import Video from "../components/Video"
import Container, { Col } from "./Container"
import { SectionMedia } from "../models/sections"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import formattingOptions from "../utils/formattingOptions"
import assets from "../staticQueries/assets"

type Props = {
  className?: string,
  section: {
    media?: SectionMedia
    body?: string,
    link?: string,
    button?: string,
    orientation: string,
  }
  orientation?: string,
}


const Section: React.FC<Props> = ({ className, section }) => {
  const body = section.body && JSON.parse(section.body)
  const sectionAssets = assets()
  const player = useRef<ReactPlayer>(null)

  const presentMedia = (media?: SectionMedia) => {
    if(media) {
      switch(media.type) {
        case "fluid":
          return <div className="section-image"><Img fluid={media.src as FluidObject} /></div>
        case "static":
          return <div className="section-image"><img src={media.src as string} /></div>
        case "video":
          return (
            <div className="section-video">
              <div className="section-video-inner">
                <Video
                  nativeControls={false}
                  autoplay={false}
                  src={media.src as string}
                  fitContainer={true}
                />
              </div>
            </div>
          )
        case "static-video":
          return (
            <div className="section-image">
              <ReactPlayer
                playing={true}
                ref={player}
                url={media.src as string}
                loop={true}
                width="100%"
                height="auto"
                volume={1}
                controls={true}
              />
            </div>
          )
      }
    } else {
      return undefined
    }

  }

  return (
    <StyledSection className={className} data-orientation={section.orientation}>
      <div className="section-text-space" />
      {section.media && (
          presentMedia(section.media)
      )}
      <div className="section-text">
        <Container className="section-text-inner">
          <Col>
            <div>
              {documentToReactComponents(body, formattingOptions(sectionAssets))}
            </div>
            {section.button && section.link && (
              <PageLink to={section.link} className="section-button">
                {section.button}
              </PageLink>
            )}
          </Col>
        </Container>
      </div>
    </StyledSection>
  )
}

const StyledSection = styled.section`
  padding: 3em 0;
  position: relative;
  @media (min-width: 480px) {
    display: flex;
    align-items: center;
  }
  .col {
    ${tw`w-full xs:w-1/2`}
  }
  &[data-orientation="stacked"] {
    .col {
      ${tw`xs:w-full`}
      max-width: 864px;
      margin: 0 auto;
    }
    display: block;
    .section-text-inner > div {
      display: block;
    }
    .section-text {
      position: relative;
    }
  }
  &[data-orientation="right"] {
    flex-direction: row-reverse;
    .section-text-inner > div {
      display: flex;
      flex-direction: row-reverse;
    }
  }
  .section-text-space, .section-image, .section-video {
    flex: 1;
  }
  .section-button {
    padding: 0.8em 1em;
    border-radius: 6px;
    background: #689CB2;
    display: inline-block;
    margin-top: 16px;
  }
  .section-image, .section-video {
    margin-bottom: 2em;
    margin-top: 2em;
    img {
      width: 100%;
      object-fit: cover;

    }
  }
  &[!data-orientation="stacked"] {
    .section-image, .section-video {
      @media(min-width: 1600px) {
        max-height: 420px;
        overflow: hidden;
      }
    }
  }
  .section-video {
    width: 100%;
    padding-top: 38.5%;
    position: relative;
    .section-video-inner {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
  .section-text-inner {
    width: 100%;
  }
  .section-text {
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
export default Section
