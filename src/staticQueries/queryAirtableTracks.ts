import { graphql, useStaticQuery } from "gatsby"

interface TrackShape {
  id: string
  title: string
  length: string
  priority: string
  energy: string
  parent?: string
  children?: TrackShape
  genres: {
    name: string
    id: string
  }[]
  vibes: {
    name: string
    id: string
  }[]
  map: Function
}

const queryAirtableTracks = (): TrackShape => {
  const query = useStaticQuery(
    graphql`
      query TracksQuery {
        query: allAirtable(filter: { table: { eq: "Tracks" } }) {
          edges {
            node {
              data {
                Track_Title
                Parent {
                  id
                }
                Genres {
                  data {
                    Genre_Name
                  }
                  id
                }
                Vibes {
                  data {
                    Vibe_Name
                  }
                  id
                }
                Length
                Priority
                Energy
              }
              id
            }
          }
        }
      }
    `
  )
  const {
    query: { edges: tracksData },
  } = query

  interface GenreQueryShape {
    id: string
    data: {
      Genre_Name: string
    }
    map: Function
  }
  interface VibeQueryShape {
    id: string
    data: {
      Vibe_Name: string
    }
    map: Function
  }

  interface QueryShape {
    node: {
      id: string
      data: {
        Track_Title: string
        Parent: {
          id: string
          data: {
            Track_Title: string
          }
        }[]
        Length: string
        Genres: GenreQueryShape
        Vibes: VibeQueryShape
        Priority: string
        Energy: string
      }
    }
    map: Function
  }

  const allTracks = tracksData.map((track: QueryShape) => ({
    id: track.node.id,
    title: track.node.data.Track_Title,
    parent: track.node.data.Parent ? track.node.data.Parent[0].id : null,
    length: track.node.data.Length,
    priority: track.node.data.Priority,
    energy: track.node.data.Energy,
    genres: track.node.data.Genres.map((genre: GenreQueryShape) => ({
      id: genre.id,
      name: genre.data.Genre_Name,
    })),
    vibes: track.node.data.Vibes.map((genre: VibeQueryShape) => ({
      id: genre.id,
      name: genre.data.Vibe_Name,
    })),
  }))

  const tracks = allTracks.filter((track: TrackShape) => {
    return track.parent === null
  })

  tracks.forEach((track: TrackShape) => {
    const childTracks = allTracks.filter((childTrack: TrackShape) => {
      return childTrack.parent === track.id
    })
    track.children = childTracks
    delete track.parent
  })

  return tracks
}

export default queryAirtableTracks
