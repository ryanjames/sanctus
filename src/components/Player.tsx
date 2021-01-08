import React, { useEffect, useState } from "react"
import { ParentTrackShape } from "../models/tracks"

type Props = {
  track: ParentTrackShape
}

const Player: React.FC<Props> = ({ track }) => {
  const [play, setPlay] = useState(false)
  const [ws, setWS] = useState()

  const handlePlay = () => {
    setPlay(!play)
    play ? ws.play() : ws.pause()
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
      setWS(wavesurfer)
    })
  }, [setWS, track])
  return (
    <>
      <button onClick={handlePlay}>Play/Pause</button>
      <div id={`t-${track.id}`} />
    </>
  )
}

export default Player
