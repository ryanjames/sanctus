import React, { useState } from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import Lottie from "react-lottie"
import sanctus from "../animation-data/sanctus-spectrum.json"

type Props = {
  className?: string
}

const SanctusSpectrum: React.FC<Props> = ({ className = "" }) => {
  const [isRunning, setIsRunning] = useState(true)
  const [direction, setDirection] = useState(1)

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: sanctus,
  }

  const handleHover = () => {
    // setIsRunning(false)
  }

  const handleOut = () => {
    // setIsRunning(true)
  }

  return (
    <StyledSpectrumContainer className={`spectrum ${className}`} onMouseOver={handleHover} onMouseLeave={handleOut}>
      <StyledSpectrum>
        <Lottie options={defaultOptions} direction={direction} isClickToPauseDisabled={true} width="100%" height="auto" isStopped={!isRunning} />
      </StyledSpectrum>
    </StyledSpectrumContainer>
  )
}

const StyledSpectrumContainer = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`
const StyledSpectrum = styled.div`
  opacity: 0.15;
  margin-left: -10%;
  margin-right: -10%;
`

export default SanctusSpectrum
