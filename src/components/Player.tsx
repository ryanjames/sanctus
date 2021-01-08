import React, { useEffect, useState } from "react"
import { ParentTrackShape } from "../models/tracks"

type Props = {
  track: ParentTrackShape
}

type Player = {
  play: Function
  pause: Function
}

const Player: React.FC<Props> = ({ track }) => {
  const [play, setPlay] = useState(false)
  const [player, setPlayer] = useState<Player | null>(null)

  const handlePlay = () => {
    if (player) {
      setPlay(!play)
      play ? player.play() : player.pause()
    }
  }

  useEffect(() => {
    const wavesurfer = window.WaveSurfer.create({
      container: `#t-${track.id}`,
      waveColor: "violet",
      progressColor: "purple",
    })
    wavesurfer.load(track.url)
    wavesurfer.on("ready", function () {
      wavesurfer.play()
      setPlayer(wavesurfer)
    })
  }, [setPlayer, track])
  return (
    <>
      <button onClick={handlePlay}>Play/Pause</button>
      <div id={`t-${track.id}`} />
    </>
  )
}

export default Player
