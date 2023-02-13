import React from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import { IHome } from "../models/home"
import { ISection, getSections } from "../models/section"
import Section from "../components/Section"
import Partners from "../components/Partners"
import Cta from "../components/Cta"
import Video from "../components/Video"

const IndexPage: React.FC<IHome> = ({ data }) => {

  const content = data.home.nodes[0]
  const sections = getSections(content.sections)

  return (
    <StyledLayout page="home">
      <StyledReelContainer>
        <Video
          nativeControls={false}
          autoplay={false}
          src={content.demoReel}
          demoReel={true}
          poster={content.demoReelPoster.localFile.childImageSharp.fluid}
          color="#000000"
          fitContainer={true}
          proceed={true}
        />
      </StyledReelContainer>
      {sections.map((section: ISection, i: number) => <Section key={i} {...section} />)}
      <Partners heading="We've joined agencies and studios like these:" partners={content.agencies} />
      <Partners heading="In serving clients like these:" light={true} partners={content.clients} />
      <Cta heading="Let’s Collaborate" background={content.demoReelPoster.localFile.childImageSharp.fluid} button={{ link: "/contact", label: "Contact Us" }} />
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
      nodes {
        agencies {
          localFile {
            publicURL
          }
        }
        clients {
          localFile {
            publicURL
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
        sections {
          body
           {
            raw
          }
          title
          buttonText
          link
          mediaControls
          mediaAsset {
            localFile {
              publicURL
            }
            file {
              contentType
              fileName
            }
          }
          stacked
        }
      }
    }
  }
`

export default IndexPage
