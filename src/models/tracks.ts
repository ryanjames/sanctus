import slugify from "slugify"
import childTracks from "../staticQueries/childTracks"

export interface CategoryShape {
  name: string
  id: string
  slug: string
}

export interface TrackShape {
  id: string
  title: string
  length: string
  url: string
  priority: number
  genres: CategoryShape[]
  vibes: CategoryShape[]
  energy: CategoryShape
  search?: string
  favorite?: boolean
  parent?: string
  children?: TrackShape[]
  filter?: Function
  reduce?: Function
}

export interface GenreQueryShape {
  id: string
  data: { Genre_Name: string }
  map: Function
}
export interface PlaylistQueryShape {
  id: string
  data: { Playlist_Name: string }
  map: Function
}
export interface EnergyQueryShape {
  id: string
  data: { Energy_Name: string }
  map: Function
}
export interface VibeQueryShape {
  id: string
  data: { Vibe_Name: string }
  map: Function
}

export interface QueryNodeShape {
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
      URL: string
      Length: string
      Favorite: boolean
      Genres: GenreQueryShape
      Vibes: VibeQueryShape
      Energy: EnergyQueryShape[]
      Priority: number
    }
  }
  reduce: Function
}

export interface QueryShape {
  edges: QueryNodeShape
}

export const getChildTracks = (parentId: string): Array<TrackShape> => {
  const trackChildren = childTracks().reduce((filtered: Array<TrackShape>, childTrack: TrackShape) => {
    if (childTrack.parent === parentId) {
      filtered.push(childTrack)
    }
    return filtered
  }, [])
  trackChildren.sort((a: TrackShape, b: TrackShape) => (a.length > b.length ? 1 : -1)).reverse()
  return trackChildren
}

export const getTracks = (query: QueryShape): Array<TrackShape> => {
  const tracksData = query.edges
  const tracks = tracksData.reduce((filtered: Array<TrackShape>, track: QueryNodeShape) => {
    if (track.node.data.Parent === null) {
      const children: TrackShape[] = []
      const parentTrack = {
        id: track.node.id,
        title: track.node.data.Track_Title,
        length: track.node.data.Length,
        priority: track.node.data.Priority,
        favorite: track.node.data.Favorite,
        energy: {
          id: track.node.data.Energy[0].id,
          name: track.node.data.Energy[0].data.Energy_Name,
          slug: slugify(track.node.data.Energy[0].data.Energy_Name, { lower: true, strict: true }),
        },
        genres: track.node.data.Genres.map((genre: GenreQueryShape) => ({
          id: genre.id,
          name: genre.data.Genre_Name,
          slug: slugify(genre.data.Genre_Name, { lower: true, strict: true }),
        })),
        vibes: track.node.data.Vibes.map((vibe: VibeQueryShape) => ({
          id: vibe.id,
          name: vibe.data.Vibe_Name,
          slug: slugify(vibe.data.Vibe_Name, { lower: true, strict: true }),
        })),
        search: "",
        children: children,
        url: track.node.data.URL,
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
      const trackChildren = getChildTracks(parentTrack.id)
      console.log(trackChildren)

      parentTrack.children = trackChildren

      filtered.push(parentTrack)
    }

    // Return everything
    return filtered
  }, [])

  tracks.sort((a: TrackShape, b: TrackShape) => (a.priority > b.priority ? 1 : -1))

  return tracks
}
