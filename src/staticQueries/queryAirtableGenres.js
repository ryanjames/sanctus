import { graphql, useStaticQuery } from "gatsby"

const queryAirtableGenres = () => {
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

  const Genres = GenresData.map(genre => ({
    id: genre.node.id,
    title: genre.node.data.Genre_Name,
    image: genre.node.data.Genre_Image ? {
      full: genre.node.data.Genre_Image[0].url,
      thumbnail: genre.node.data.Genre_Image[0].thumbnails.large.url
    } : null,
  }))
  return Genres
}

export default queryAirtableGenres
