import React from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import PageLink from "./PageLink"
import Video from "../components/Video"
import Container, { Col } from "./Container"
import InlinePlayer from "../components/InlinePlayer"
import { ISection, ISectionMediaAsset } from "../models/section"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import formattingOptions from "../utils/formattingOptions"
import assets from "../staticQueries/assets"


const Section: React.FC<ISection> = (section) => {
  const body = section.body && JSON.parse(section.body.raw)

  const presentMedia = (section: ISection) => {
    const media = section.mediaAsset
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
      } else if(media.file.contentType.includes("audio")) {
        return (
          <div className="section-audio">
            <InlinePlayer
              track={{
                id: media.id,
                title: media.title,
                length: "",
                url: media.localFile.publicURL,
                moods: [],
                energy: {
                  name: "",
                  id: "",
                  slug: "",
                },
                playlists: [],
                priority: 0,
              }}
            />
          </div>
        )
      } else if(media.file.contentType.includes("html")) {
        return (
          <div className="section-video">
            <div className="section-video-inner">
              <div className="section-video-sizer">
                <Video
                  nativeControls={false}
                  customControls={section.mediaControls}
                  autoplay={!section.mediaControls}
                  src={`https://vimeo.com/${media.file.fileName}`}
                  fitContainer={true}
                />
              </div>
            </div>
          </div>
        )
      } else {
        return <div className="section-image"><img src={media.localFile.publicURL} /></div>
      }
    } else if(section.mediaUrl) {
      return (
        <div className="section-video">
          <div className="section-video-inner">
            <div className="section-video-sizer">
              <Video
                nativeControls={false}
                customControls={true}
                autoplay={false}
                src={section.mediaUrl}
                fitContainer={true}
              />
            </div>
          </div>
        </div>
      )
    } else {
      return undefined
    }
  }

  return (
    <StyledSection data-orientation={section.orientation}>
      <div className="section-text-space" />
      {(section.mediaAsset || section.mediaUrl) && (
          presentMedia(section)
      )}
      <div className="section-text">
        <Container className="section-text-inner">
          <Col>
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
    video {
      object-fit: cover;
    }
    > div {
      width: 100%;
    }
    img {
      max-height: 500px;
      width: 100%;
      object-fit: contain;
      margin-bottom: 0;
      display: block;
      max-width: 640px;
    }
  }
  .section-video-inner {
    width: 100%;
    max-width: 640px;
    padding-bottom: 24px;
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
      font-size: 1.9em;
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
    .section-audio {
      max-width: 864px;
      margin: 0 auto;
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
