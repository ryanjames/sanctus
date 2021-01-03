require("wavesurfer.js")
import React, { useState } from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import Wavesurfer from "react-wavesurfer"

interface Props {
  file: string
}

const xhr = {
  cache: "default",
  mode: "cors",
  method: "GET",
  credentials: "same-origin",
  redirect: "follow",
  referrer: "client",
  headers: [
    {
      key: "Authorization",
      value: "Bearer MQa_dFZwV4cAAAAAAAAAAZYyhuJKLv2_TWj-sh-VW4QreVM9uBnhwCAfo4P-vNqc",
    },
  ],
}

const Player: React.FC<Props> = ({ file }) => {
  const [playing, setPlaying] = useState(false)
  const [pos, setPos] = useState(0)

  const handleTogglePlay = () => {
    setPlaying(!playing)
  }
  const handlePosChange = e => {
    setPos(e.originalArgs[0])
  }

  return (
    <StyledPlayer>
      <Wavesurfer audioFile={file} pos={pos} onPosChange={handlePosChange} playing={playing} />
      <button onClick={handleTogglePlay}>Play/Pause</button>
    </StyledPlayer>
  )
}

export default Player

const StyledPlayer = styled.div`
  ${tw``}
`
