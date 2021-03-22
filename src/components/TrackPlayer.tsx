import React, { useEffect } from "react"
import colors from "../config/colors"
import styled from "@emotion/styled"
import tw from "twin.macro"
import { isMobile } from "react-device-detect"
import hex2rgba from "hex2rgba"
import Play from "../graphics/play.svg"
import Pause from "../graphics/pause.svg"

type Props = {
  className: string
  track: {
    id: string
    url: string
  }
  pause: boolean
}

const TrackPlayer: React.FC<Props> = ({ track, className, pause }) => {
  const handlePlay = () => {
    document.body.classList.add("player-playing")
    document.body.classList.remove("player-paused")
    window.player.play()
  }

  const handlePause = () => {
    document.body.classList.remove("player-playing")
    document.body.classList.add("player-paused")
    window.player.pause()
  }

  const loadPlayer = () => {
    if (!document.getElementById(`t-${track.id}`).firstChild) {
      const color1 = hex2rgba(colors["white"], 0.6)
      const color2 = hex2rgba(colors["white"], 0.4)
      const progressColor = hex2rgba(colors["white"], 0.7)
      const linGrad = window.document.createElement("canvas").getContext("2d")?.createLinearGradient(0, 0, 0, 120)
      linGrad?.addColorStop(0.5, color1)
      linGrad?.addColorStop(0.5, color2)
      const timeContainer = document.getElementById(`time-${track.id}`)
      let durTotal = 0

      window.player = new window.WaveSurfer({
        container: `#t-${track.id}`,
        waveColor: isMobile ? color2 : linGrad,
        progressColor: progressColor,
        cursorWidth: 2,
        cursorColor: colors["white"],
        height: 60,
        responsive: true,
        barWidth: 3,
        barGap: 1,
        barMinHeight: 4,
        barRadius: 4,
      })
      window.player.init()
      window.player.load(track.url)

      window.player.on("ready", () => {
        setTimeout(() => {
          durTotal = window.player.getDuration()
          window.player.id = track.id
          if (isMobile || pause) {
            document.body.classList.add("player-loaded", "player-paused")
          } else {
            window.player.play()
            document.body.classList.remove("player-paused")
            document.body.classList.add("player-loaded", "player-playing")
          }
        }, 30)
      })
      if (timeContainer) {
        window.player.on("audioprocess", (time: any) => {
          durTotal = durTotal == 0 ? window.player.getDuration() : durTotal
          const durMinutes = Math.floor(durTotal / 60)
          const durSeconds = ("00" + Math.floor(durTotal - durMinutes * 60)).slice(-2)
          const duration = durMinutes + ":" + durSeconds
          const minutes = Math.floor((time % 3600) / 60)
          const seconds = ("00" + Math.floor(time % 60)).slice(-2)
          timeContainer.textContent = minutes + ":" + seconds + " | " + duration
        })
      }
    }
  }

  useEffect(() => {
    if (!window.player) {
      const waveSurferLoaded = () => {
        // Make sure Wavesurfer is loaded
        if (window.WaveSurfer) {
          loadPlayer()
          clearInterval(checkWaveSurferLoaded)
        }
      }
      const checkWaveSurferLoaded = setInterval(waveSurferLoaded, 1000)
    } else {
      if (window.player && window.player.id !== track.id) {
        document.body.className = ""
        window.player.destroy()
        loadPlayer()
      }
    }
  })

  return (
    <StyledTrackPlayer className={className} tw="flex relative items-center" color={colors["white"]}>
      <div className="controls" tw="w-8 h-6 relative">
        <Pause className="pause-control" onClick={handlePause} />
        <Play className="play-control" onClick={handlePlay} />
      </div>
      <div tw="flex-1" id={`t-${track.id}`} />
      <div tw="absolute right-0 bottom-0" id={`time-${track.id}`} />
    </StyledTrackPlayer>
  )
}

const StyledTrackPlayer = styled.div<{ color: string }>`
  ${tw``}
  height: 60px;
  padding: 50px 0;
  .play-control,
  .pause-control {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 18px;
    height: 18px;
    path {
      fill: #fff;
    }
    &:hover {
      cursor: pointer;
      path {
        fill: ${props => props.color};
      }
    }
  }
  .pause-control {
    .player-playing & {
      opacity: 1;
      z-index: 1;
    }
  }
  .play-control {
    .player-paused & {
      opacity: 1;
      z-index: 1;
    }
  }
`

export default TrackPlayer
