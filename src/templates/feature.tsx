import React from "react"
import { graphql } from "gatsby"
import PageHeading from "../components/PageHeading"
import Container, { Col } from "../components/Container"
import SEO from "../components/SEO"
import Layout from "../components/Layout"
import Video from "../components/Video"
import { Helmet } from "react-helmet"
import styled from "@emotion/styled"
import tw from "twin.macro"
import { getFeature, QueryShape } from "../models/feature"

type Props = { data: { feature: QueryShape } }

const FeaturePage: React.FC<Props> = ({ data }) => {
  const description = "Description"
  const feature = getFeature(data.feature)
  console.log(feature)

  return (
    <StyledLibraryPageLayout>
      <Helmet titleTemplate="%s - Dan Koch">
        <title>{feature.title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <SEO title={`${feature.title}`} description={description} />
      <PageHeading tw="hidden lg:block" title={feature.title} />
      <Container>
        <Col>
          <Video src={feature.video} poster={feature.image} />
          Feature: {feature.title} <br />
        </Col>
      </Container>
    </StyledLibraryPageLayout>
  )
}

const StyledLibraryPageLayout = styled(Layout)`
  ${tw``}
`
export default FeaturePage

export const pageQuery = graphql`
  query FeatursQuery($id: String!) {
    feature: allAirtable(filter: { table: { eq: "Features" }, id: { eq: $id } }) {
      edges {
        node {
          id
          data {
            Feature_Name
            Feature_Image {
              localFiles {
                childImageSharp {
                  fluid(maxWidth: 2000) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            Feature_SVG {
              localFiles {
                publicURL
              }
            }
            Feature_Tracks {
              data {
                Track_Title
                URL
                Vibes {
                  data {
                    Vibe_Name
                  }
                }
                Genres {
                  data {
                    Genre_Name
                  }
                }
                Energy {
                  data {
                    Energy_Name
                  }
                }
              }
              id
            }
            Feature_Color
            Feature_Description
            Feature_Video
          }
        }
      }
    }
  }
`
