import { graphql, useStaticQuery } from "gatsby"
import slugify from "slugify"
import { FluidObject } from "gatsby-image"

export interface FeatureShape {
  id: string
  title: string
  color: string
  image: FluidObject
  logo: string
  slug: string
}

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
                Feature_Color
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

  interface QueryShape {
    node: {
      id: string
      data: {
        Feature_Name: string
        Feature_Image: {
          localFiles: {
            childImageSharp: {
              fluid: FluidObject
            }
          }[]
        }
        Feature_SVG: {
          localFiles: {
            publicURL: string
          }[]
        }
        Feature_Color: string
      }
    }
  }

  const Features = FeaturesData.map((feature: QueryShape) => ({
    id: feature.node.id,
    title: feature.node.data.Feature_Name,
    slug: slugify(feature.node.data.Feature_Name, { lower: true, strict: true }),
    image: feature.node.data.Feature_Image.localFiles[0].childImageSharp.fluid,
    color: feature.node.data.Feature_Color,
    logo: feature.node.data.Feature_SVG.localFiles[0].publicURL,
  }))

  return Features
}

export default features
