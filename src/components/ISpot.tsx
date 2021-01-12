import React from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"

interface Props {
  videoId: string
}

const ISpot: React.FC<Props> = ({ videoId }) => {
  return (
    <StyledISpot>
      <iframe
        src={`https://www.ispot.tv/share/${videoId}?auto_start=1`}
        frameBorder="0"
        scrolling="no"
        allow="fullscreen"
      />
    </StyledISpot>
  )
}

const StyledISpot = styled.div`
  ${tw``}
  position:relative;
  width: 100%;
  padding-top: 56.25%;
  padding-bottom: 40px;
  iframe {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }
`
export default ISpot
