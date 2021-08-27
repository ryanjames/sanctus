import slugify from "slugify"

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
  moods: CategoryShape[]
  energy: CategoryShape
  search?: string
  playlists: CategoryShape[]
  favorite?: boolean
  index?: number
  filter?: Function
  reduce?: Function
}
export interface EnergyQueryShape {
  id: string
  data: { Energy_Name: string }
  map: Function
}
export interface MoodQueryShape {
  id: string
  data: { Mood_Name: string }
  map: Function
}
export interface PlaylistsQueryShape {
  id: string
  data: { Playlist_Name: string }
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
      Playlists: PlaylistsQueryShape[]
      Moods: MoodQueryShape[]
      Energy: EnergyQueryShape[]
      Priority: number
    }
  }
  map: Function
  reduce: Function
}

export interface QueryShape {
  edges: QueryNodeShape
}

export const getTracks = (query: QueryShape): Array<TrackShape> => {
  const tracksData = query.edges
  const tracks = tracksData.map((track: QueryNodeShape) => {
    const trackObj = {
      id: track.node.id,
      title: track.node.data.Track_Title,
      length: track.node.data.Length,
      priority: track.node.data.Priority,
      energy: {
        id: track.node.data.Energy[0].id,
        name: track.node.data.Energy[0].data.Energy_Name,
        slug: slugify(track.node.data.Energy[0].data.Energy_Name, { lower: true, strict: true }),
      },
      moods: track.node.data.Moods.map((mood: MoodQueryShape) => ({
        id: mood.id,
        name: mood.data.Mood_Name,
        slug: slugify(mood.data.Mood_Name, { lower: true, strict: true }),
      })),
      playlists: track.node.data.Playlists
        ? track.node.data.Playlists.map((playlist: PlaylistsQueryShape) => ({
            id: playlist.id,
            name: playlist.data.Playlist_Name,
            slug: slugify(playlist.data.Playlist_Name, { lower: true, strict: true }),
          }))
        : null,
      search: "",
      url: track.node.data.URL,
    }
    trackObj.search = trackObj.title
    /*
    const moods = trackObj.moods.reduce(function (prevVal: { name: string }, currVal: { name: string }, idx: number) {
      return idx == 0 ? currVal.name : prevVal + ", " + currVal.name
    }, "")
    trackObj.search = "".concat(trackObj.title, " | ", moods)
    */

    // Return everything
    return trackObj
  }, [])

  tracks.sort((a: TrackShape, b: TrackShape) => (a.priority > b.priority ? 1 : -1))

  return tracks
}
