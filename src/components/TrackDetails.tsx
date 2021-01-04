import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import Player from "./Player"

interface Props {
  track: {
    url: string
    id: string
  }
}

const TrackDetails: React.FC<Props> = ({ track }) => {
  const [expand, setExpand] = useState(false)

  const handleExpand = () => {
    setExpand(!expand)
  }

  return (
    <StyledTrackDetails>
      <button onClick={handleExpand}>Expand</button>
      {expand && <Player track={track} />}
    </StyledTrackDetails>
  )
}

export default TrackDetails

const StyledTrackDetails = styled.div`
  ${tw``}
`
