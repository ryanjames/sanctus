import React, { useContext } from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import TrackPlayer from "./TrackPlayer"
import { TrackShape } from "../models/tracks"
import { ActiveTrackContext, ActiveTrackContextType } from "../contexts/ActiveTrackContext"

interface Props {
  track: TrackShape
}

const TrackDetails: React.FC<Props> = ({ track }) => {
  const { activeTrack, updateActiveTrack } = useContext(ActiveTrackContext) as ActiveTrackContextType

  const handleExpand = () => {
    updateActiveTrack({
      id: track.id,
      version: track,
    })
  }

  const handleChangeVersion = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const string = event.target.value
    const child = track.children?.find(child => child.id === string)
    updateActiveTrack({
      id: track.id,
      version: child ? child : track,
    })
  }

  return (
    <>
      <button onClick={handleExpand}>Expand</button>
      <StyledTrackDetails>
        {activeTrack.id == track.id && (
          <>
            {track.children && track.children.length > 0 && (
              <select onChange={handleChangeVersion} value={activeTrack?.version?.id}>
                <option value={track.id}>{track.title}</option>
                {track.children.map(child => (
                  <option value={child.id} key={child.id}>
                    {child.title}
                  </option>
                ))}
              </select>
            )}
            <TrackPlayer track={{ id: activeTrack.version.id, url: activeTrack.version.url }} />
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
