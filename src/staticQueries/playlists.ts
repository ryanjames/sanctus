import { graphql, useStaticQuery } from "gatsby"
import slugify from "slugify"

export interface PlaylistShape {
  id: string
  title: string
  slug: string
  map: Function
}

const playlists = (): PlaylistShape => {
  const query = useStaticQuery(
    graphql`
      query PlaylistsQuery {
        query: allAirtable(filter: { table: { eq: "Playlists" } }) {
          edges {
            node {
              data {
                Playlist_Name
              }
              id
            }
          }
        }
      }
    `
  )
  const {
    query: { edges: PlaylistsData },
  } = query

  interface QueryShape {
    node: {
      id: string
      data: {
        Playlist_Name: string
      }
    }
  }

  const Playlists = PlaylistsData.map((playlist: QueryShape) => ({
    id: playlist.node.id,
    title: playlist.node.data.Playlist_Name,
    slug: slugify(playlist.node.data.Playlist_Name, { lower: true, strict: true }),
  }))

  return Playlists
}

export default playlists
