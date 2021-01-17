import { graphql, useStaticQuery } from "gatsby"
import { getFeature, FeatureShape } from "../models/feature"

const features = (): Array<FeatureShape> => {
  const query = useStaticQuery(
    graphql`
      query FeaturesQuery {
        query: allAirtable(sort: { fields: data___Feature_Order }, filter: { table: { eq: "Features" } }) {
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
                Feature_Track {
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
                Similar_Tracks {
                  data {
                    Track_Title
                    URL
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

  const Features = FeaturesData.map((feature: any) => {
    return getFeature(feature)
  })

  return Features
}

export default features
