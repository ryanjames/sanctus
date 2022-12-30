import React from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import { getHome, Media } from "../models/home"
import Feature from "../components/Feature"
import Partners from "../components/Partners"
import Cta from "../components/Cta"
import Video from "../components/Video"

type Props = {
  data: {
    home: {
      edges: string[]
    }
  }
}

const IndexPage: React.FC<Props> = ({ data }) => {

  const homeContent = getHome(data.home.edges[0])

  console.log(homeContent)

  const featureBlocks = () => {
    let orientation: string
    const blocks = [...Array(4)].map((value, i) => {
      const num = i + 1;
      const featureBody = 'feature' + num + 'Body' as keyof typeof homeContent
      const featureMedia = 'feature' + num + 'Media' as keyof typeof homeContent
      const featureButtonLabel = 'feature' + num + 'ButtonLabel' as keyof typeof homeContent
      const featureButtonLink = 'feature' + num + 'ButtonLink' as keyof typeof homeContent
      const featureButton = { label: homeContent[featureButtonLabel] as string, link: homeContent[featureButtonLink] as string}
      if(homeContent[featureBody]) {
        orientation = orientation == 'left' ? 'right' : 'left'
        return <Feature key={i} body={homeContent[featureBody] as string} button={featureButton} orientation={orientation} media={homeContent[featureMedia] as Media } />
      } else {
        return
      }
    })
    return <>{blocks}</>
  }

  return (
    <StyledLayout page="home">
      <StyledReelContainer>
        <Video
          nativeControls={true}
          autoplay={false}
          src={homeContent.demoReel}
          demoReel={true}
          poster={homeContent.demoReelPoster}
          color="#000000"
          fitContainer={true}
        />
        <StyledContinue>
          <svg width="33" height="19" viewBox="0 0 33 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.4758 13.5406C18.2143 11.7678 19.8792 10.0693 21.544 8.37271C24.0352 5.82988 26.5284 3.28906 29.0196 0.74623C29.67 0.0824477 30.4533 -0.140149 31.3492 0.0964857C32.1714 0.313067 32.7093 0.85051 32.92 1.65868C33.1552 2.56511 32.8586 3.32515 32.2062 3.98894C28.5512 7.70692 24.9024 11.4309 21.2536 15.1529C20.2739 16.1536 19.2942 17.1543 18.3125 18.153C17.1958 19.286 15.8029 19.282 14.6862 18.1429C10.0413 13.4062 5.40055 8.67352 0.757738 3.9388C-0.226048 2.93411 -0.254682 1.51028 0.688198 0.623903C1.6413 -0.27451 3.05869 -0.198305 4.06088 0.824442C8.06761 4.9054 12.0702 8.99037 16.0729 13.0773C16.2017 13.2097 16.3142 13.3561 16.4758 13.5426L16.4758 13.5406Z" fill="white"/>
          </svg>
        </StyledContinue>
      </StyledReelContainer>
      {featureBlocks()}
      <Partners heading="We’ve joined agencies and studios like these:" partners={homeContent.agencies} />
      <Partners heading="In serving clients like these:" light={true} partners={homeContent.clients} />

      <Cta heading="Let us join you" background="/static/28e5242f1ab52422c58973c247f13b67/0e329/persuit-feature.jpg" button={{ link: "/contact", label: "Contact Us" }} />

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


export const pageQuery = graphql`
  query HomeQuery {
    home: allContentfulHomePage {
      edges {
        node {
          agencies {
            file {
              url
            }
          }
          clients {
            file {
              url
            }
          }
          demoReel
          demoReelPoster {
            localFile {
              childImageSharp {
                fluid(maxWidth: 2400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          feature1Media {
            localFile {
              childImageSharp {
                fluid(maxWidth: 2400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            file { 
              url 
              contentType
            }
          }
          feature1Body { raw }
          feature1ButtonLabel
          feature1ButtonLink
          feature2Media {
            localFile {
              childImageSharp {
                fluid(maxWidth: 2400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            file { 
              url 
              contentType
            }
          }
          feature2Body { raw }
          feature2ButtonLabel
          feature2ButtonLink
          feature3Media {
            localFile {
              childImageSharp {
                fluid(maxWidth: 2400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            file { 
              url 
              contentType
            }
          }
          feature3Body { raw }
          feature3ButtonLabel
          feature3ButtonLink
          feature4Media {
            localFile {
              childImageSharp {
                fluid(maxWidth: 2400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            file { 
              url 
              contentType
            }
          }
          feature4Body { raw }
          feature4ButtonLabel
          feature4ButtonLink
        }
      }
    }
  }
`

export default IndexPage
