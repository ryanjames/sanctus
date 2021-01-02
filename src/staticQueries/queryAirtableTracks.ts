import slugify from "slugify"
import { graphql, useStaticQuery } from "gatsby"

export interface CategoryShape {
  name: string
  id: string
  slug: string
}

interface ChildTrackShape {
  id: string
  title: string
  length: string
  parent: string
}

export interface ParentTrackShape {
  id: string
  title: string
  length: string
  priority: string
  search: string
  energy: string
  genres: CategoryShape[]
  vibes: CategoryShape[]
  children?: ChildTrackShape[]
  filter: Function
}

const queryAirtableTracks = (): ParentTrackShape => {
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
  }

  const tracks = tracksData.reduce((filtered: Array<ParentTrackShape>, track: QueryShape) => {
    if (track.node.data.Parent === null) {
      const parentTrack = {
        id: track.node.id,
        title: track.node.data.Track_Title,
        length: track.node.data.Length,
        priority: track.node.data.Priority,
        energy: track.node.data.Energy,
        genres: track.node.data.Genres.map((genre: GenreQueryShape) => ({
          id: genre.id,
          name: genre.data.Genre_Name,
          slug: slugify(genre.data.Genre_Name, { lower: true }),
        })),
        vibes: track.node.data.Vibes.map((vibe: VibeQueryShape) => ({
          id: vibe.id,
          name: vibe.data.Vibe_Name,
          slug: slugify(vibe.data.Vibe_Name, { lower: true }),
        })),
        search: "",
        children: [],
      }

      // Assemble search string from title, genres and vibes
      const genres = parentTrack.genres.reduce(function (
        prevVal: { name: string },
        currVal: { name: string },
        idx: number
      ) {
        return idx == 0 ? currVal.name : prevVal + ", " + currVal.name
      },
      "")

      const vibes = parentTrack.vibes.reduce(function (
        prevVal: { name: string },
        currVal: { name: string },
        idx: number
      ) {
        return idx == 0 ? currVal.name : prevVal + ", " + currVal.name
      },
      "")
      parentTrack.search = "".concat(parentTrack.title, " | ", genres, " | ", vibes)

      // Add child tracks
      const childTracks = tracksData.reduce((filtered: Array<ChildTrackShape>, track: QueryShape) => {
        if (track.node.data.Parent !== null) {
          if (track.node.data.Parent[0].id === parentTrack.id) {
            const childTrack = {
              id: track.node.id,
              title: track.node.data.Track_Title,
              length: track.node.data.Length,
              parent: track.node.data.Parent[0].id,
            }
            filtered.push(childTrack)
          }
        }
        return filtered
      }, [])
      parentTrack.children = childTracks

      filtered.push(parentTrack)
    }

    // Return everything
    return filtered
  }, [])

  return tracks
}

export default queryAirtableTracks
