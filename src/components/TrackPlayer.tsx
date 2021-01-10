import React, { useEffect } from "react"

type Props = {
  track: {
    id: string
    url: string
  }
}

const TrackPlayer: React.FC<Props> = ({ track }) => {
  useEffect(() => {
    if (window.WaveSurfer) {
      if (window.player) {
        window.player.destroy()
      }
      window.player = new window.WaveSurfer({
        container: `#t-${track.id}`,
        waveColor: "violet",
        progressColor: "purple",
      })
      window.player.init()
      window.player.load(track.url)
      window.player.on("ready", function () {
        window.player.play()
      })
    }
  })

  return (
    <>
      <div id={`t-${track.id}`} />
    </>
  )
}

export default TrackPlayer
