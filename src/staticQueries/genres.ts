import { graphql, useStaticQuery } from "gatsby"
import slugify from "slugify"
import { FluidObject } from "gatsby-image"

interface Image {
  full: string
  thumbnail: string
}

export interface GenreShape {
  id: string
  title: string
  image: string | Image
  slug: string
  map: Function
}

const genres = (): GenreShape => {
  const query = useStaticQuery(
    graphql`
      query GenresQuery {
        query: allAirtable(filter: { table: { eq: "Genres" } }) {
          edges {
            node {
              data {
                Genre_Name
                Genre_Image {
                  localFiles {
                    childImageSharp {
                      fluid(maxWidth: 600) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              }
              id
            }
          }
        }
      }
    `
  )
  const {
    query: { edges: GenresData },
  } = query

  interface QueryShape {
    node: {
      id: string
      data: {
        Genre_Name: string
        Genre_Image: {
          localFiles: {
            childImageSharp: {
              fluid: FluidObject
            }
          }[]
        }
      }
    }
  }

  const Genres = GenresData.map((genre: QueryShape) => ({
    id: genre.node.id,
    title: genre.node.data.Genre_Name,
    slug: slugify(genre.node.data.Genre_Name, { lower: true, strict: true }),
    image: genre.node.data.Genre_Image.localFiles[0].childImageSharp.fluid,
  }))

  return Genres
}

export default genres
