import React from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import { getHome } from "../models/home"
import { SectionShape } from "../models/sections"
import Section from "../components/Section"
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

  return (
    <StyledLayout page="home">
      <StyledReelContainer>
        <Video
          nativeControls={false}
          autoplay={false}
          src={homeContent.demoReel}
          demoReel={true}
          poster={homeContent.demoReelPoster}
          color="#000000"
          fitContainer={true}
          proceed={true}
        />
      </StyledReelContainer>
      {homeContent.sections.map((section: SectionShape, i: number) => <Section key={i} section={section} />)}
      <Partners heading="We've joined agencies and studios like these:" partners={homeContent.agencies} />
      <Partners heading="In serving clients like these:" light={true} partners={homeContent.clients} />
      <Cta heading="Let’s Collaborate" background={homeContent.demoReelPoster} button={{ link: "/contact", label: "Contact Us" }} />
    </StyledLayout>
  )
}


const StyledLayout = styled(Layout)`
  ${tw``}
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
            description
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
          section1Media {
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
          section1Body { raw }
          section1Button
          section1Link
          section2Media {
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
          section2Body { raw }
          section2Button
          section2Link
          section3Media {
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
          section3Body { raw }
          section3Button
          section3Link
          section4Media {
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
          section4Body { raw }
          section4Button
          section4Link
        }
      }
    }
  }
`

export default IndexPage
