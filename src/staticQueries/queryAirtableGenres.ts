import { graphql, useStaticQuery } from "gatsby"

interface Image {
  full: string
  thumbnail: string
}

interface GenresShape {
  [index: number]: {
    id: string
    title: string
    image: string | Image
  }
  map: Function
}

const queryAirtableGenres = (): GenresShape => {
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

  interface GenreShape {
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

  const Genres = GenresData.map((genre: GenreShape) => ({
    id: genre.node.id,
    title: genre.node.data.Genre_Name,
    image: genre.node.data.Genre_Image
      ? {
          full: genre.node.data.Genre_Image[0].url,
          thumbnail: genre.node.data.Genre_Image[0].thumbnails.large.url,
        }
      : null,
  }))

  return Genres
}

export default queryAirtableGenres
