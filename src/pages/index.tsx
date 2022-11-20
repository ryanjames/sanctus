import React from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import Layout from "../components/Layout"
import Video from "../components/Video"

const IndexPage: React.FC = () => {
  
  const demoReel = {
    video: "https://vimeo.com/444653426",
    image: {
      "base64": "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAALABQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAwAC/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/2gAMAwEAAhADEAAAAQGGMxR//8QAGhAAAQUBAAAAAAAAAAAAAAAAAQACAxEhEv/aAAgBAQABBQKN1GR/RpQaQMX/xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAEDAQE/AT//xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAECAQE/AT//xAAYEAADAQEAAAAAAAAAAAAAAAABEBFRAP/aAAgBAQAGPwK5xOoV/wD/xAAYEAEBAQEBAAAAAAAAAAAAAAABABEhUf/aAAgBAQABPyESHPUm+DHEAA0YFQ3/2gAMAwEAAgADAAAAEPg//8QAFREBAQAAAAAAAAAAAAAAAAAAEBH/2gAIAQMBAT8Qh//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQIBAT8QP//EABoQAQADAQEBAAAAAAAAAAAAAAEAESFBYaH/2gAIAQEAAT8Qdse/URKHaKfPkyUjZewUlgR6RZS0uJu9Z//Z",
      "aspectRatio": 1.7751479289940828,
      "src": "/static/28e5242f1ab52422c58973c247f13b67/0e329/persuit-feature.jpg",
      "srcSet": "/static/28e5242f1ab52422c58973c247f13b67/4fe8c/persuit-feature.jpg 600w,\n/static/28e5242f1ab52422c58973c247f13b67/47498/persuit-feature.jpg 1200w,\n/static/28e5242f1ab52422c58973c247f13b67/0e329/persuit-feature.jpg 1600w",
      "sizes": "(max-width: 1600px) 100vw, 1600px",
    },
    color: "#000000",

  }

  return (
    <StyledLayout page="home">
      <StyledReelContainer>
        <Video
          nativeControls={true}
          autoplay={false}
          src={demoReel.video}
          poster={demoReel.image}
          color={demoReel.color}
          fitContainer={true}
        />
      </StyledReelContainer>
    </StyledLayout>
  )
}

const StyledLayout = styled(Layout)`
`
const StyledReelContainer = styled.div`
  margin-top: -8rem;
  height: 100vh;
`
export default IndexPage
