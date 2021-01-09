import React, { useEffect, useState } from "react"
import { ParentTrackShape } from "../models/tracks"
import { ActiveTrackContext, ActiveTrackContextType } from "../contexts/ActiveTrackContext"

type Props = {
  track: ParentTrackShape
  status: string
}

type TrackPlayer = {
  play: Function
  pause: Function
  stop: Function
}

const TrackPlayer: React.FC<Props> = ({ track, status }) => {
  const { updateActivePlayer, activePlayer, activeTrack } = React.useContext(ActiveTrackContext) as ActiveTrackContextType

  useEffect(() => {
    if (window.WaveSurfer) {
      if (activePlayer.id !== track.id) {
        const wavesurfer = window.WaveSurfer.create({
          container: `#t-${track.id}`,
          waveColor: "violet",
          progressColor: "purple",
        })
        updateActivePlayer({
          id: track.id,
          instance: wavesurfer,
        })
      } else {
        activePlayer.instance.load(track.url)
        activePlayer.instance.init()
        console.log(activePlayer)
      }
      /*
      if (activePlayer.id !== track.id) {
        const wavesurfer = new window.WaveSurfer({
          container: `#t-${track.id}`,
          waveColor: "violet",
          progressColor: "purple",
        })
        updateActivePlayer({
          id: track.id,
          instance: wavesurfer,
        })
        setTimeout(() => {
          console.log(activePlayer)
        }, 2000)
      }
      */
    }
  }, [activePlayer, updateActivePlayer, track])

  /*
  if (activePlayer.instance) {
    switch (status) {
      case "play":
        activePlayer.instance.play()
        break
      case "pause":
        activePlayer.instance.pause()
        break
      default:
        activePlayer.instance.stop()
        break
    }
  }
  */
  return (
    <>
      <div id={`t-${track.id}`} />
    </>
  )
}

export default TrackPlayer
