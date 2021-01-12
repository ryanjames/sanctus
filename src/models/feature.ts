import slugify from "slugify"

interface CategoryShape {
  name: string
  slug: string
}

interface TrackShape {
  name: string
  id: string
}

export interface FeatureShape {
  id: string
  title: string
  color: string
  image: object
  logo: string
  video: string
  description: string
  genres: CategoryShape[]
  vibes: CategoryShape[]
  energies: string[]
  tracks: TrackShape[]
}

export interface QueryTrackShape {
  data: {
    Track_Title: string
    URL: string
    Vibes: VibeQueryShape[]
    Genres: GenreQueryShape[]
    Energy: {
      data: {
        Energy_Name: string
      }
    }[]
  }
  id: string
  reduce: Function
  map: Function
}

export interface GenreQueryShape {
  data: { Genre_Name: string }
}
export interface VibeQueryShape {
  data: { Vibe_Name: string }
}

export interface QueryNodeShape {
  node: {
    id: string
    data: {
      Feature_Name: string
      Feature_Image: {
        localFiles: {
          childImageSharp: {
            fluid: {}
          }
        }[]
      }
      Feature_SVG: {
        localFiles: {
          publicURL: string
        }[]
      }
      Feature_Tracks: QueryTrackShape
      Feature_Color: string
      Feature_Description: string
      Feature_Video: string
    }
  }
  reduce: Function
}

export interface QueryShape {
  edges: QueryNodeShape[]
}

export const getFeature = (query: QueryShape): FeatureShape => {
  const base = query.edges[0].node
  const data = query.edges[0].node.data
  const tracksData = data.Feature_Tracks

  const energies = tracksData.reduce((energies: string[], track: QueryTrackShape) => {
    energies.push(track.data.Energy[0].data.Energy_Name)
    return energies.filter((energy, pos) => {
      return energies.indexOf(energy) == pos
    })
  }, [])

  const genres = tracksData.reduce((genres: CategoryShape[], track: QueryTrackShape) => {
    const trackGenres = track.data.Genres.map((genre: GenreQueryShape) => ({
      name: genre.data.Genre_Name,
      slug: slugify(genre.data.Genre_Name, { lower: true }),
    }))
    genres = genres.concat(trackGenres).filter((v, i, a) => a.findIndex(t => t.name === v.name) === i)

    return genres
  }, [])

  const vibes = tracksData.reduce((vibes: CategoryShape[], track: QueryTrackShape) => {
    const trackVibes = track.data.Vibes.map((vibe: VibeQueryShape) => ({
      name: vibe.data.Vibe_Name,
      slug: slugify(vibe.data.Vibe_Name, { lower: true }),
    }))
    vibes = vibes.concat(trackVibes).filter((v, i, a) => a.findIndex(t => t.name === v.name) === i)

    return vibes
  }, [])

  const tracks = tracksData.map((track: QueryTrackShape) => ({
    id: track.id,
    name: track.data.Track_Title,
  }))

  const feature = {
    id: base.id,
    title: data.Feature_Name,
    color: data.Feature_Color,
    image: data.Feature_Image.localFiles[0].childImageSharp.fluid,
    logo: data.Feature_SVG.localFiles[0].publicURL,
    video: data.Feature_Video,
    description: data.Feature_Description,
    genres: genres,
    vibes: vibes,
    tracks: tracks,
    energies: energies,
  }

  return feature
}
