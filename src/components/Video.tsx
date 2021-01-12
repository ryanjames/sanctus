import React from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import Youtube from "react-youtube"
import Vimeo from "@u-wave/react-vimeo"
import ISpot from "./ISpot"
import Img, { FluidObject } from "gatsby-image"
import Play from "../graphics/play.svg"

interface Props {
  src: string
  poster: FluidObject
}

const opts = {
  width: "100%",
  height: "100%",
}

const video = (src: string) => {
  if (src.includes("youtube")) {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = src.match(regExp)
    if (match) {
      const videoId = match[2]
      return <Youtube videoId={videoId} opts={opts} />
    } else {
      // Error
    }
  } else if (src.includes("vimeo")) {
    const regExp = /https:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/
    const match = src.match(regExp)
    if (match) {
      const videoId = match[2]
      return <Vimeo video={videoId} />
    } else {
      // error
    }
  } else if (src.includes("ispot")) {
    const videoId = src.split("/").slice(-1)[0]
    if (videoId) {
      return <ISpot videoId={videoId} />
    } else {
      // error
    }
  } else {
    // error
  }
}

const Video: React.FC<Props> = ({ src, poster }) => {
  return (
    <StyledVideo>
      <Play />
      <Img fluid={poster} />
      {video(src)}
    </StyledVideo>
  )
}

const StyledVideo = styled.div`
  ${tw``}
`
export default Video
