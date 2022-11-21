import React, { useState, useRef } from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import ReactPlayer from "react-player"
import hex2rgba from "hex2rgba"
import Img, { FluidObject } from "gatsby-image"
import Play from "../graphics/play.svg"
import Pause from "../graphics/pause.svg"
import Restart from "../graphics/restart.svg"

interface Props {
  src: string
  color: string
  poster: FluidObject
  autoplay: boolean
  nativeControls?: boolean
  fitContainer?: boolean
  demoReel?: boolean
  className?: string
}

const Video: React.FC<Props> = ({ src, poster, color, autoplay = false, className, nativeControls = false, demoReel = false,  fitContainer = false }) => {
  const color1 = hex2rgba(color)
  const color2 = hex2rgba(color, 0)

  const [play, setPlay] = useState<boolean>(false)
  const [inProgress, setInProgress] = useState<boolean>(false)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [volume, setVolume] = useState(1)

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

  const handleMuteAll = () => {
    if (typeof window !== "undefined") {
      window.muteAll()
    }
  }

  const handleOnPlay = () => {
    handleMuteAll()
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
    <StyledVideo fitContainer={fitContainer} className={className} color1={color1} color2={color2}>
      <div className={`video-container ${inProgress ? "playing" : ""}`} tw="relative overflow-hidden">
        <div tw="absolute inset-0">
          {!demoReel ? (
            <div
              tw="absolute inset-0 flex justify-center items-center"
              className={`${autoplay ? "autoplay" : ""} play`}
              onClick={handlePlay}
            >
                <Play />
            </div>
            ) : (
            <div
              tw="absolute inset-0 flex px-6 justify-center items-center"
              className={`${autoplay ? "autoplay" : ""} demo-play`}
            >
              <svg className="logo-wordmark" width="302" height="56" viewBox="0 0 302 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M204.998 55.9311C196.09 55.9311 188.84 48.6808 188.84 39.7733V0H198.058V9.21828H207.276V18.4366H198.058V39.8078C198.058 43.6056 201.131 46.7129 204.963 46.7129H207.311V55.9311H204.998ZM290.724 29.3466L272.909 26.1703C270.907 25.825 269.457 24.0987 269.457 22.0617C269.457 19.7485 271.321 17.8842 273.634 17.8842H285.028C288.86 17.8842 291.933 20.9914 291.933 24.7892H301.151C301.151 15.8817 293.901 8.63135 284.993 8.63135H273.6C266.211 8.63135 260.204 14.6388 260.204 22.0272C260.204 28.518 264.865 34.0766 271.252 35.2159L289.067 38.3922C291.07 38.7375 292.52 40.4638 292.52 42.5008C292.52 44.814 290.655 46.6783 288.342 46.6783H276.949C273.116 46.6783 270.044 43.5711 270.044 39.7733H260.825C260.825 48.6808 268.076 55.9312 276.983 55.9312H288.377C295.765 55.9312 301.772 49.9237 301.772 42.5353C301.772 36.0445 297.111 30.4859 290.724 29.3466ZM245.772 39.7733C245.772 43.6056 242.665 46.6783 238.867 46.6783H229.649C225.817 46.6783 222.744 43.571 222.744 39.7733V9.21828H213.526V39.7733C213.526 48.6808 220.776 55.9311 229.683 55.9311H238.902C247.809 55.9311 255.06 48.6808 255.06 39.7733V9.21828H245.841V39.7733H245.772ZM156.938 17.8842H166.157C169.989 17.8842 173.062 20.9914 173.062 24.7892H182.28C182.28 15.8817 175.03 8.63135 166.122 8.63135H156.904C147.996 8.63135 140.746 15.8817 140.746 24.7892V39.7733C140.746 48.6808 147.996 55.9312 156.904 55.9312H166.122C175.03 55.9312 182.28 48.6808 182.28 39.7733H173.062C173.062 43.6056 169.954 46.6783 166.157 46.6783H156.938C153.106 46.6783 150.033 43.5711 150.033 39.7733V24.7892C150.033 20.9914 153.141 17.8842 156.938 17.8842ZM110.191 8.66588H119.409C128.282 8.66588 135.533 15.8817 135.498 24.7892V55.3442H126.28V24.7892C126.28 20.9914 123.207 17.8842 119.375 17.8842H110.156C106.359 17.8842 103.251 20.9569 103.251 24.7892V55.3787H94.0331V24.8238C94.0331 15.9162 101.283 8.66588 110.191 8.66588ZM74.5262 8.66588H63.1329C54.2253 8.66588 46.975 15.9162 46.975 24.8238H56.1932C56.1932 20.9914 59.3005 17.9187 63.0983 17.9187H74.4917C76.8049 17.9187 78.6693 19.7831 78.6693 22.0963V25.5488L57.0909 29.4156C50.9109 30.5205 46.388 35.9064 46.388 42.19C46.388 46.0569 48.0107 49.7511 50.8763 52.3405C53.4312 54.6537 56.7457 55.9311 60.1637 55.9311C60.5482 55.9311 60.903 55.9014 61.2833 55.8695L61.2834 55.8695L61.3721 55.8621L78.6693 54.3085V55.3442H87.9221V22.0617C87.9221 14.6733 81.9147 8.66588 74.5262 8.66588ZM78.7038 45.0557L60.578 46.6783C59.3005 46.7819 58.0576 46.3676 57.1254 45.5045C56.1587 44.6413 55.6408 43.433 55.6408 42.1555C55.6408 40.3257 56.9528 38.772 58.7481 38.4613L78.7383 34.9052V45.0557H78.7038ZM12.8984 26.1703L30.7135 29.3466C37.1007 30.4859 41.7271 36.0445 41.7616 42.5698C41.7616 49.9583 35.7542 55.9657 28.3658 55.9657H16.9724C8.06485 55.9657 0.814517 48.7153 0.814517 39.8078H10.0673C10.0673 43.6056 13.1401 46.7129 16.9724 46.7129H28.3658C30.679 46.7129 32.5434 44.8485 32.5434 42.5353C32.5434 40.4983 31.0933 38.772 29.0908 38.4268L11.2757 35.2504C4.88851 34.1111 0.227585 28.5525 0.227585 22.0617C0.227585 14.6733 6.235 8.66587 13.5889 8.63135H24.9823C33.8898 8.63135 41.1402 15.8817 41.1402 24.7892H31.9219C31.9219 20.9914 28.8491 17.8842 25.0168 17.8842H13.6234C11.3102 17.8842 9.44587 19.7485 9.44587 22.0617C9.44587 24.0987 10.8959 25.825 12.8984 26.1703Z" fill="white"/>
              </svg>
              <p tw="text-2xl mt-4 text-center">Sonic support for agencies and studios</p>
              <div className="button" onClick={handlePlay}>
                Demo Reel
                <Play />
              </div>
            </div>

            )}
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
              controls={nativeControls}
              onPause={handleOnPause}
              onPlay={handleOnPlay}
              onEnded={handleOnEnded}
              onReady={handleOnReady}
            />
        </div>
      </div>
      <div tw="flex justify-center pt-6">
        <div tw="h-16" className={`controls ${inProgress ? "show" : ""}`}>
          {!nativeControls && (
            <>
              <Play className={`play-control ${isPlaying ? "" : "show"}`} onClick={handleResume} />
              <Pause className={`pause-control ${isPlaying ? "show" : ""}`} onClick={handlePause} />
              <Restart className="restart-control" tw="ml-8 cursor-pointer" onClick={handleRestart} />
            </>
          )}
        </div>
      </div>
    </StyledVideo>
  )
}

const StyledVideo = styled.div<{ fitContainer: boolean; color1: string; color2: string }>`
  ${tw``}
  ${props => props.fitContainer ? (
    `
      height: 100%;
      .video-container {
        height: 100%;
      }
    .image-container {
      transition: all 0.6s ease-in-out;
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .gatsby-image-wrapper {
      height: 100%;
    }
    `
  ) : (
    `
      .video-container {
        height: 56.25vw;
        max-height: 80vh;
      }
      .image-container {
        transition: all 0.6s ease-in-out;
        position: absolute;
        left: 0;
        right: 0;
        z-index: 0;
        top: 50%;
        transform: translateY(-50%) scale(1);
      }
    `
  )}
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
      path {
        fill: white;
      }
      &:hover {
        cursor: pointer;
        path {
          fill: white;
        }
      }
      &.show {
        opacity: 1;
        z-index: 1;
      }
    }
    .restart-control {
      path {
        fill: white;
      }
      &:hover path {
        fill: white;
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
  .demo-play {
    transition-delay: 0.2s;
    z-index: 3;
    opacity: 1;
    display: flex;
    flex-direction: column;
    .logo-wordmark {
      width: 100%;
      height: auto;
      @media (min-width: 310px) {
        width: 300px;
      }
      path {
      fill: #fff;
      }
    }
    .button {
      margin-top: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      font-weight: 700;
      gap: 16px;
      background-color: rgba(104, 156, 178, 0.6);
      padding: 12px 24px;
      border-radius: 6px;
      svg {
        width: 24px;
        height: 24px;
        path {
          fill: white;
        }
      }
      &:hover {
        cursor: pointer;
      }
    }
  }
  .playing {
    .play,
    .demo-play,
    .image-container {
      opacity: 0;
      z-index: -1;
    }
  }
  .play.autoplay,
  .demo-play.autoplay {
    display: none;
  }
`
export default Video
