import { graphql, useStaticQuery } from "gatsby"
import slugify from "slugify"

interface Image {
  full: string
  thumbnail: string
}

export interface PlaylistShape {
  id: string
  title: string
  slug: string
  count: number
  image: string | Image
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
                Playlist_Image {
                  localFiles {
                    childImageSharp {
                      fluid(maxWidth: 600) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
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
      slug: slugify(playlist.node.data.Playlist_Name, { lower: true, strict: true }),
      image: playlist.node.data.Playlist_Image.localFiles[0].childImageSharp.fluid,
      count: tracks.length,
    }
  })

  return Playlists
}

export default playlists
