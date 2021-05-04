import { graphql, useStaticQuery } from "gatsby"
import slugify from "slugify"

interface Image {
  full: string
  thumbnail: string
}

export interface PlaylistShape {
  id: string
  title: string
  active: boolean
  slug: string
  count: number
  image: string | Image
  map: Function
  filter: Function
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
                Playlist_Active
                Playlist_Tracks {
                  id
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
    query: { edges: PlaylistsData },
  } = query

  const Playlists = PlaylistsData.map((playlist: any) => {
    const tracks = playlist.node.data.Playlist_Tracks
    return {
      id: playlist.node.id,
      title: playlist.node.data.Playlist_Name,
      active: playlist.node.data.Playlist_Active,
      slug: slugify(playlist.node.data.Playlist_Name, { lower: true, strict: true }),
      count: tracks.length,
    }
  })

  return Playlists
}

export default playlists
