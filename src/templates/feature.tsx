import React from "react"
import { graphql } from "gatsby"
import PageHeading from "../components/PageHeading"
import ActiveTrackProvider from "../contexts/ActiveTrackContext"
import Container, { Col } from "../components/Container"
import SEO from "../components/SEO"
import LibraryCategories from "../components/LibraryCategories"
import Layout from "../components/Layout"
import { Helmet } from "react-helmet"
import styled from "@emotion/styled"
import tw from "twin.macro"
import { getFeature, QueryShape } from "../models/feature"

type Props = { data: { feature: QueryShape } }

const FeaturePage: React.FC<Props> = ({ data }) => {
  const title = "Title"
  const description = "Description"
  const feature = getFeature(data.feature)
  console.log(feature)

  return (
    <StyledLibraryPageLayout>
      <Helmet titleTemplate="%s - Dan Koch">
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <SEO title={`${title} Music`} description={description} />
      <PageHeading tw="hidden lg:block" title={title} />
      <Container>
        <div tw="flex flex-nowrap w-full">Feature</div>
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
              url
            }
            Feature_SVG {
              url
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
