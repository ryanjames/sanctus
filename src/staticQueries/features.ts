import { graphql, useStaticQuery } from "gatsby"
import { getFeature, QueryFeatureShape, FeatureShape } from "../models/feature"

const features = (): FeatureShape => {
  const query = useStaticQuery(
    graphql`
      query FeaturesQuery {
        query: allAirtable(filter: { table: { eq: "Features" } }) {
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
                Feature_Blurb
                Feature_Video
              }
            }
          }
        }
      }
    `
  )
  const {
    query: { edges: FeaturesData },
  } = query

  const Features = FeaturesData.map((feature: QueryFeatureShape) => {
    console.log(getFeature(feature))
    return getFeature(feature)
  })

  return Features
}

export default features
