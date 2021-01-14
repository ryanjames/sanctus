import React, { useState, useRef } from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import ReactPlayer from "react-player"
import Img, { FluidObject } from "gatsby-image"
import Play from "../graphics/play.svg"

interface Props {
  src: string
  color: string
  poster: FluidObject
  autoplay: boolean
}

const Video: React.FC<Props> = ({ src, poster, color, autoplay = false }) => {
  const [play, setPlay] = useState<boolean>(false)
  const [inProgress, setInProgress] = useState<boolean>(false)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  const togglePlay = () => {
    setPlay(!play)
  }

  const handleStop = () => {
    setPlay(false)
    if (player && player.current) {
      player.current.seekTo(0)
    }
    setInProgress(false)
  }

  const handleOnPlay = () => {
    setIsPlaying(true)
    setInProgress(true)
  }

  const handleOnPause = () => {
    setIsPlaying(false)
  }

  const handleOnReady = () => {
    if (autoplay == true) {
      setPlay(true)
      setIsPlaying(true)
      setInProgress(true)
    }
  }

  const player = useRef<ReactPlayer>(null)

  return (
    <StyledVideo>
      <div className="video-container" tw="relative overflow-hidden">
        <div tw="absolute inset-0">
          <div tw="bg-black" onClick={togglePlay}>
            {!inProgress && <Play />}
          </div>
          <div style={{ backgroundColor: color }} />
          <Img fluid={poster} />
          <ReactPlayer
            playing={play}
            ref={player}
            url={src}
            width="100%"
            height="100%"
            controls={false}
            onPause={handleOnPause}
            onPlay={handleOnPlay}
            onReady={handleOnReady}
          />
        </div>
      </div>
      {inProgress && (
        <>
          <span onClick={togglePlay}>{isPlaying ? <>Pause</> : <>Play</>}</span>
          <span onClick={handleStop}>Stop</span>
        </>
      )}
    </StyledVideo>
  )
}

const StyledVideo = styled.div`
  ${tw``}
  .video-container {
    padding-top: 56.25%;
  }
`
export default Video
