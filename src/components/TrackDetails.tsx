import React, { useState } from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import Player from "./Player"
import { ParentTrackShape } from "../models/tracks"
import Select from "react-select"

interface Props {
  track: ParentTrackShape
}

const TrackDetails: React.FC<Props> = ({ track }) => {
  const [expand, setExpand] = useState(false)

  const handleExpand = () => {
    setExpand(!expand)
  }

  const trackSelect = () => {
    if (track.children && track.children.length) {
      const parentTrack = [
        {
          value: track.id,
          label: track.title + " " + track.length,
        },
      ]
      const childTracks = track.children.map(child => ({
        value: child.id,
        label: `${child.title}<span>"${child.length}</span>`,
      }))
      const options = parentTrack.concat(childTracks)
      return <Select options={options} />
    }
  }

  return (
    <StyledTrackDetails>
      <button onClick={handleExpand}>Expand</button>

      {expand && (
        <>
          {trackSelect()}
          <Player track={track} />
        </>
      )}
    </StyledTrackDetails>
  )
}

export default TrackDetails

const StyledTrackDetails = styled.div`
  ${tw``}
`
