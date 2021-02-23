import React, { useState } from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import Lottie from "react-lottie"
import LogoWordmark from "./LogoWordmark"
import sanctus from "../animation-data/sanctus.json"

type Props = {
  className?: string
}

const LogoWaveform: React.FC<Props> = ({ className = "" }) => {
  const [isRunning, setIsRunning] = useState(false)
  const [isRun, setIsRun] = useState(false)

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: sanctus,
  }

  const handleHover = () => {
    if (!isRun) {
      setIsRunning(true)
      setTimeout(() => {
        setIsRun(true)
      }, 1700)
    }
  }

  return (
    <StyledLogoWaveform className={`${className} ${isRun ? "run" : ""}`}>
      <div onMouseOver={handleHover}>
        <Lottie options={defaultOptions} height={70} width={160} isStopped={!isRunning} />
        <span className="wordmark" tw="absolute top-0 w-64">
          <LogoWordmark />
        </span>
      </div>
    </StyledLogoWaveform>
  )
}

const StyledLogoWaveform = styled.div`
  ${tw``}
  .wordmark div {
    opacity: 0;
  }
  &.run .wordmark div.ready {
    opacity: 1;
  }
`
export default LogoWaveform
