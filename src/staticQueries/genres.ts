import { graphql, useStaticQuery } from "gatsby"
import slugify from "slugify"

interface Image {
  full: string
  thumbnail: string
}

interface GenreShape {
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
                  url
                  thumbnails {
                    large {
                      url
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
          url: string
          thumbnails: {
            large: {
              url: string
            }
          }
        }[]
      }
    }
  }

  const Genres = GenresData.map((genre: QueryShape) => ({
    id: genre.node.id,
    title: genre.node.data.Genre_Name,
    slug: slugify(genre.node.data.Genre_Name, { lower: true }),
    image: genre.node.data.Genre_Image
      ? {
          full: genre.node.data.Genre_Image[0].url,
          thumbnail: genre.node.data.Genre_Image[0].thumbnails.large.url,
        }
      : null,
  }))

  return Genres
}

export default genres
