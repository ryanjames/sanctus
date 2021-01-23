import slugify from "slugify"
import { FluidObject } from "gatsby-image"
import { TrackShape, getChildTracks } from "../models/tracks"

interface CategoryShape {
  name: string
  slug: string
}

export interface FeatureShape {
  id: string
  title: string
  color: string
  image: FluidObject
  logo: string
  video: string
  description?: string
  genres: CategoryShape[]
  vibes: CategoryShape[]
  slug: string
  energies: string[]
  track: TrackShape[]
  similar: TrackShape[]
  map: Function
}

export const getFeature = (query: any): FeatureShape => {
  const base = query.node
  const data = base.data
  const trackData = data.Feature_Track
  const similarTracksData = data.Similar_Tracks
  const energies = trackData.reduce((energies: string[], track: any) => {
    energies.push(track.data.Energy[0].data.Energy_Name)
    return energies.filter((energy, pos) => {
      return energies.indexOf(energy) == pos
    })
  }, [])

  const genres = trackData.reduce((genres: CategoryShape[], track: any) => {
    const trackGenres = track.data.Genres.map((genre: any) => ({
      name: genre.data.Genre_Name,
      slug: slugify(genre.data.Genre_Name, { lower: true, strict: true }),
    }))
    genres = genres.concat(trackGenres).filter((v, i, a) => a.findIndex(t => t.name === v.name) === i)

    return genres
  }, [])

  const vibes = trackData.reduce((vibes: CategoryShape[], track: any) => {
    const trackVibes = track.data.Vibes.map((vibe: any) => ({
      name: vibe.data.Vibe_Name,
      slug: slugify(vibe.data.Vibe_Name, { lower: true, strict: true }),
    }))
    vibes = vibes.concat(trackVibes).filter((v, i, a) => a.findIndex(t => t.name === v.name) === i)

    return vibes
  }, [])

  const track: TrackShape[] = trackData.map((track: any) => ({
    id: track.id,
    title: track.data.Track_Title,
    url: track.data.URL,
    length: track.data.Length,
    priority: 0,
    genres: null,
    vibes: null,
    energy: null,
    children: getChildTracks(track.id),
  }))

  const similarTracks: TrackShape[] = similarTracksData.map((track: any) => ({
    id: track.id,
    title: track.data.Track_Title,
    url: track.data.URL,
    length: track.data.Length,
    priority: 0,
    genres: null,
    vibes: null,
    energy: null,
    children: getChildTracks(track.id),
  }))

  const feature = {
    id: base.id,
    title: data.Feature_Name,
    color: data.Feature_Color,
    image: data.Feature_Image.localFiles[0].childImageSharp.fluid,
    logo: data.Feature_SVG.localFiles[0].publicURL,
    video: data.Feature_Video,
    description: data.Feature_Description,
    slug: slugify(data.Feature_Name, { lower: true, strict: true }),
    genres: genres,
    vibes: vibes,
    track: track,
    similar: similarTracks,
    energies: energies,
    map: Function,
  }

  return feature
}
