import React, { useEffect } from "react"
import colors from "../config/colors"
import styled from "@emotion/styled"
import tw from "twin.macro"
import hex2rgba from "hex2rgba"
import Play from "../graphics/play.svg"
import Pause from "../graphics/pause.svg"

type Props = {
  className: string
  track: {
    id: string
    url: string
  }
}

const TrackPlayer: React.FC<Props> = ({ track, className }) => {
  const handlePlay = () => {
    window.player.play()
  }

  const handlePause = () => {
    window.player.pause()
  }

  useEffect(() => {
    if (window.WaveSurfer) {
      if (window.player) {
        window.player.destroy()
        document.body.className = ""
      }
      const color1 = hex2rgba(colors["dk-green"], 0.6)
      const color2 = hex2rgba(colors["dk-green"], 0.4)
      const progressColor = hex2rgba(colors["dk-green"], 0.5)
      const linGrad = window.document.createElement("canvas").getContext("2d")?.createLinearGradient(0, 0, 0, 120)
      linGrad?.addColorStop(0.5, color1)
      linGrad?.addColorStop(0.5, color2)

      window.player = new window.WaveSurfer({
        container: `#t-${track.id}`,
        waveColor: linGrad,
        progressColor: progressColor,
        cursorWidth: 2,
        cursorColor: colors["dk-green"],
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
        window.player.play()
      })
      window.player.on("pause", () => {
        document.body.classList.remove("player-playing")
        document.body.classList.add("player-paused")
      })
      window.player.on("play", () => {
        document.body.classList.remove("player-paused")
        document.body.classList.add("player-loaded", "player-playing")
      })
    }
  })

  return (
    <StyledTrackPlayer className={className} tw="flex items-center" color={colors["dk-green"]}>
      <div className="controls" tw="w-8 h-6 relative">
        <Pause className="pause-control" onClick={handlePause} />
        <Play className="play-control" onClick={handlePlay} />
      </div>
      <div tw="flex-1" id={`t-${track.id}`} />
    </StyledTrackPlayer>
  )
}

const StyledTrackPlayer = styled.div<{ color: string }>`
  ${tw``}
  height: 60px;
  padding: 50px 0 40px;
  .play-control,
  .pause-control {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 18px;
    height: 18px;
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
