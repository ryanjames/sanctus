import React, { useState } from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import TrackPlayer from "./TrackPlayer"
import { ParentTrackShape } from "../models/tracks"
import { ActiveTrackContext, ActiveTrackContextType } from "../contexts/ActiveTrackContext"

interface Props {
  track: ParentTrackShape
}

const TrackDetails: React.FC<Props> = ({ track }) => {
  const { activeTrack, updateActiveTrack } = React.useContext(ActiveTrackContext) as ActiveTrackContextType

  const handleExpand = () => {
    updateActiveTrack({
      id: track.id,
      version: activeTrack.version ? activeTrack.version : track.id,
    })
  }

  const handleVersion = event => {
    updateActiveTrack({
      id: track.id,
      version: event.target.value,
    })
  }

  return (
    <>
      <button onClick={handleExpand}>Expand</button>
      <StyledTrackDetails>
        {activeTrack.id == track.id && (
          <>
            {track.children && track.children.length > 0 && (
              <select onChange={handleVersion}>
                <option>{track.title}</option>
                {track.children.map(child => (
                  <option value={child.id} key={child.id}>
                    {child.title}
                  </option>
                ))}
              </select>
            )}
            <TrackPlayer track={track} status="play" />
          </>
        )}
      </StyledTrackDetails>
    </>
  )
}

export default TrackDetails

const StyledTrackDetails = styled.div`
  ${tw``}
  .track-details {
    display: none;
    &.-expand {
      display: block;
    }
  }
`
