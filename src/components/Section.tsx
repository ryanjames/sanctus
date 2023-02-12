import React, { useRef } from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import ReactPlayer from "react-player"
import PageLink from "./PageLink"
import Video from "../components/Video"
import Container, { Col } from "./Container"
import { ISection, ISectionMediaAsset } from "../models/section"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import formattingOptions from "../utils/formattingOptions"
import assets from "../staticQueries/assets"


const Section: React.FC<ISection> = (section) => {
  const player = useRef<ReactPlayer>(null)
  const body = section.body && JSON.parse(section.body.raw)

  const presentMedia = (media: ISectionMediaAsset) => {
    if(media) {
      if(media.file.contentType.includes("video")) {
        return (
          <div className="section-video">
            <div className="section-video-inner">
              <div className="section-video-sizer">
                <Video
                  nativeControls={false}
                  customControls={section.mediaControls}
                  autoplay={!section.mediaControls}
                  src={media.localFile.publicURL}
                  fitContainer={true}
                />
              </div>
            </div>
          </div>
        )
      } else {
        return <div className="section-image"><img src={media.localFile.publicURL} /></div>
      }
    } else {
      return undefined
    }
  }

  return (
    <StyledSection data-orientation={section.orientation}>
      <div className="section-text-space" />
      {section.mediaAsset && (
          presentMedia(section.mediaAsset)
      )}
      <div className="section-text">
        <Container className="section-text-inner">
          <Col>
            <h2>{section.title}</h2>
            <div>
              {documentToReactComponents(body, formattingOptions(assets()))}
            </div>
            {section.buttonText && section.link && (
              <PageLink to={section.link} className="section-button">
                {section.buttonText}
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

  /* Media */
  .section-image, .section-video {
    position: relative;
    z-index: 2;
    margin-bottom: 2em;
    margin-top: 2em;
    display: flex;
    flex: 1;
    div {
      width: 100%;
    }
    img {
      width: 100%;
      object-fit: cover;
      margin-bottom: 0;
      display: block;
      max-width: 640px;
    }
  }
  .section-video-inner {
    width: 100%;
    max-width: 640px;
  }
  .section-video-sizer {
    width: 100%;
    height: 0;
    padding-top: 53.35%;
    position: relative;
    > div {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
  /* Section Text Content */
  .section-text-space {
    flex: 1;
  }
  .section-text-inner {
    width: 100%;
  }
  .section-text {
    position: relative;
    z-index: 1;
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
  .section-button {
    padding: 0.8em 1em;
    border-radius: 6px;
    background: #689CB2;
    display: inline-block;
    margin-top: 16px;
  }
  
  /* Stacked */
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
      text-align: center;
    }
    .section-image {
      justify-content: center;
      img, video {
        max-width: 1280px;
      }
    }
  }
  
  /* Text to the right */
  &[data-orientation="right"] {
    flex-direction: row-reverse;
    .section-image, .section-video {
      flex-direction: row-reverse;
    }
    .section-text-inner > div {
      display: flex;
      flex-direction: row-reverse;
    }
  }


`
export default Section
