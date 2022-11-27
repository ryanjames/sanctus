import React from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import Layout from "../components/Layout"
import Feature from "../components/Feature"
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

  const feature = {
    image: {
      "base64": "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAALABQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAwAC/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/2gAMAwEAAhADEAAAAQGGMxR//8QAGhAAAQUBAAAAAAAAAAAAAAAAAQACAxEhEv/aAAgBAQABBQKN1GR/RpQaQMX/xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAEDAQE/AT//xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAECAQE/AT//xAAYEAADAQEAAAAAAAAAAAAAAAABEBFRAP/aAAgBAQAGPwK5xOoV/wD/xAAYEAEBAQEBAAAAAAAAAAAAAAABABEhUf/aAAgBAQABPyESHPUm+DHEAA0YFQ3/2gAMAwEAAgADAAAAEPg//8QAFREBAQAAAAAAAAAAAAAAAAAAEBH/2gAIAQMBAT8Qh//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQIBAT8QP//EABoQAQADAQEBAAAAAAAAAAAAAAEAESFBYaH/2gAIAQEAAT8Qdse/URKHaKfPkyUjZewUlgR6RZS0uJu9Z//Z",
      "aspectRatio": 1.7751479289940828,
      "src": "/static/28e5242f1ab52422c58973c247f13b67/0e329/persuit-feature.jpg",
      "srcSet": "/static/28e5242f1ab52422c58973c247f13b67/4fe8c/persuit-feature.jpg 600w,\n/static/28e5242f1ab52422c58973c247f13b67/47498/persuit-feature.jpg 1200w,\n/static/28e5242f1ab52422c58973c247f13b67/0e329/persuit-feature.jpg 1600w",
      "sizes": "(max-width: 1600px) 100vw, 1600px",
    },
    title: "Audio for Experiences",
    slug: "/work/pursuit",
    body: "Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.",
  }

  return (
    <StyledLayout page="home">
      <StyledReelContainer>
        <Video
          nativeControls={true}
          autoplay={false}
          src={demoReel.video}
          demoReel={true}
          poster={demoReel.image}
          color={demoReel.color}
          fitContainer={true}
        />
        <StyledContinue>
          <svg width="33" height="19" viewBox="0 0 33 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.4758 13.5406C18.2143 11.7678 19.8792 10.0693 21.544 8.37271C24.0352 5.82988 26.5284 3.28906 29.0196 0.74623C29.67 0.0824477 30.4533 -0.140149 31.3492 0.0964857C32.1714 0.313067 32.7093 0.85051 32.92 1.65868C33.1552 2.56511 32.8586 3.32515 32.2062 3.98894C28.5512 7.70692 24.9024 11.4309 21.2536 15.1529C20.2739 16.1536 19.2942 17.1543 18.3125 18.153C17.1958 19.286 15.8029 19.282 14.6862 18.1429C10.0413 13.4062 5.40055 8.67352 0.757738 3.9388C-0.226048 2.93411 -0.254682 1.51028 0.688198 0.623903C1.6413 -0.27451 3.05869 -0.198305 4.06088 0.824442C8.06761 4.9054 12.0702 8.99037 16.0729 13.0773C16.2017 13.2097 16.3142 13.3561 16.4758 13.5426L16.4758 13.5406Z" fill="white"/>
          </svg>
        </StyledContinue>
      </StyledReelContainer>
      <Feature 
        title={feature.title}
        image={feature.image}
        button={{ link: feature.slug, label: "View Case Study"} }
        body={feature.body} 
      />
      <Feature 
        orientation="right"
        title={feature.title}
        image={feature.image}
        button={{ link: feature.slug, label: "View Case Study"} }
        body={feature.body} 
      />
      <Feature 
        title={feature.title}
        image={feature.image}
        button={{ link: feature.slug, label: "View Case Study"} }
        body={feature.body} 
      />
      <Feature 
        orientation="right"
        title={feature.title}
        image={feature.image}
        button={{ link: feature.slug, label: "View Case Study"} }
        body={feature.body} 
      />
    </StyledLayout>
  )
}

const StyledLayout = styled(Layout)`
  ${tw``}
`

const StyledContinue = styled.div`
  ${tw``}
  position: absolute;
  bottom: 24px;
  display: flex;
  justify-content: center;
  width: 100%;
  left: 0;
  z-index: 10;
  svg {
    opacity: 0.4;
    width: 16px;
    height: auto;
  }
`

const StyledReelContainer = styled.div`
  margin-top: -8rem;
  height: 100vh;
  position: relative;
`
export default IndexPage
