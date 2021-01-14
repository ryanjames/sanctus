import React, { useState, useRef } from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import ReactPlayer from "react-player"
import hex2rgba from "hex2rgba"
import querySearch from "stringquery"
import Img, { FluidObject } from "gatsby-image"
import Play from "../graphics/play.svg"
import Pause from "../graphics/pause.svg"
import Restart from "../graphics/restart.svg"

interface Props {
  src: string
  color: string
  poster: FluidObject
  autoplay: boolean
}

const Video: React.FC<Props> = ({ src, poster, color }) => {
  const color1 = hex2rgba(color)
  const color2 = hex2rgba(color, 0)

  const [play, setPlay] = useState<boolean>(false)
  const [inProgress, setInProgress] = useState<boolean>(false)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [volume, setVolume] = useState(1)

  const autoplay = querySearch(location.search).play

  const handlePlay = () => {
    setPlay(false)
    setPlay(true)
  }

  const handlePause = () => {
    let intVolume = 1
    setIsPlaying(false)
    const volumeInterval = setInterval(() => {
      if (intVolume > 0) {
        intVolume -= 0.2
        if (intVolume > 0) {
          setVolume(intVolume)
        }
      } else {
        setPlay(false)
        setVolume(1)
        clearInterval(volumeInterval)
      }
    }, 70)
  }

  const handleResume = () => {
    let intVolume = 0
    setPlay(true)
    setVolume(0)
    setIsPlaying(false)
    const volumeInterval = setInterval(() => {
      if (intVolume < 1) {
        intVolume += 0.2
        if (intVolume < 1) {
          setVolume(intVolume)
        }
      } else {
        setVolume(1)
        clearInterval(volumeInterval)
      }
    }, 70)
  }

  const handleRestart = () => {
    setPlay(false)
    if (player && player.current) {
      player.current.seekTo(0)
    }
    setTimeout(() => {
      setPlay(true)
    }, 200)
  }

  const handleOnEnded = () => {
    setPlay(false)
    setInProgress(false)
    setIsPlaying(false)
    if (player && player.current) {
      player.current.seekTo(0)
    }
  }

  const handleOnPlay = () => {
    setIsPlaying(true)
    setInProgress(true)
  }

  const handleOnPause = () => {
    setIsPlaying(false)
  }

  const handleOnReady = () => {
    if (autoplay) {
      setPlay(true)
      setIsPlaying(true)
      setInProgress(true)
      const url = new URL(window.location.href)
      const params = new URLSearchParams(url.search.slice(1))
      params.delete("play")
      window.history.replaceState({}, "", `${window.location.pathname}${window.location.hash}`)
    }
  }

  const player = useRef<ReactPlayer>(null)

  return (
    <StyledVideo color1={color1} color2={color2}>
      <div className={`video-container ${inProgress ? "playing" : ""}`} tw="relative overflow-hidden">
        <div tw="absolute inset-0">
          <div
            tw="absolute inset-0 flex justify-center items-center"
            className={`${autoplay ? "autoplay" : ""} play`}
            onClick={handlePlay}
          >
            <Play />
          </div>
          <div style={{ backgroundColor: color }} />
          <div className="image-container">
            <div tw="absolute inset-0" className="image-overlay"></div>
            <Img fluid={poster} />
          </div>
          <ReactPlayer
            playing={play}
            ref={player}
            url={src}
            width="100%"
            volume={volume}
            height="100%"
            controls={false}
            onPause={handleOnPause}
            onPlay={handleOnPlay}
            onEnded={handleOnEnded}
            onReady={handleOnReady}
          />
        </div>
      </div>
      <div className={`controls ${inProgress ? "show" : ""}`} tw="relative mt-5 -ml-1">
        <Play className={`play-control ${isPlaying ? "" : "show"}`} onClick={handleResume} />
        <Pause className={`pause-control ${isPlaying ? "show" : ""}`} onClick={handlePause} />
        <Restart className="restart-control" tw="ml-8 cursor-pointer" onClick={handleRestart} />
      </div>
    </StyledVideo>
  )
}

const StyledVideo = styled.div<{ color1: string; color2: string }>`
  ${tw``}
  .video-container {
    padding-top: 56.25%;
  }
  .image-container {
    transition: all 0.6s ease-in-out;
    ${tw`absolute left-0 right-0 z-0`}
    top: 50%;
    transform: translateY(-50%) scale(1);
  }
  .image-overlay {
    z-index: 1;
    background: linear-gradient(0deg, ${props => props.color1} 0%, ${props => props.color2} 100%);
  }
  .controls {
    transition: all 0.4s ease-in-out;
    transform: translateX(-30px);
    opacity: 0;
    z-index: -1;
    &.show {
      opacity: 1;
      z-index: 1;
      transform: translateX(0);
    }
    .play-control,
    .pause-control {
      transition: all 0.4s ease-in-out;
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      &:hover {
        cursor: pointer;
        path {
          fill: ${props => props.color1};
        }
      }
      &.show {
        opacity: 1;
        z-index: 1;
      }
    }
    .restart-control:hover {
      path {
        fill: ${props => props.color1};
      }
    }
  }
  .play {
    transition-delay: 0.2s;
    z-index: 3;
    opacity: 1;
    svg {
      transition: all 0.3s ease-in-out;
      transform: scale(1);
      width: 50px;
      height: 50px;
      path {
        fill: white;
      }
    }
    &:hover {
      cursor: pointer;
      svg {
        transform: scale(1.4);
      }
    }
  }
  .playing {
    .play,
    .image-container {
      opacity: 0;
      z-index: -1;
    }
  }
  .play.autoplay {
    display: none;
  }
`
export default Video
