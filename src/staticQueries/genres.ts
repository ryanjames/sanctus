import { graphql, useStaticQuery } from "gatsby"
import slugify from "slugify"

interface Image {
  full: string
  thumbnail: string
}

export interface GenreShape {
  id: string
  title: string
  image: string | Image
  count: number
  slug: string
  map: Function
}

const genres = (): GenreShape => {
  const query = useStaticQuery(
    graphql`
      query GenresQuery {
        query: allAirtable(sort: { fields: data___Genre_Order }, filter: { table: { eq: "Genres" } }) {
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
                Tracks {
                  id
                  data {
                    Parent {
                      id
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

  const Genres = GenresData.map((genre: any) => {
    const tracks = genre.node.data.Tracks.filter((track: any) => track.data.Parent === null)
    return {
      id: genre.node.id,
      title: genre.node.data.Genre_Name,
      slug: slugify(genre.node.data.Genre_Name, { lower: true, strict: true }),
      image: genre.node.data.Genre_Image.localFiles[0].childImageSharp.fluid,
      count: tracks.length,
    }
  })

  return Genres
}

export default genres
