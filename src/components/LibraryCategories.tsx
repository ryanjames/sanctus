import React, { useMemo } from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import PageLink from "../components/PageLink"
import { TrackShape } from "../models/tracks"
import { CategoryShape } from "../models/tracks"
import withLocation from "../utils/withLocation"
import Close from "../graphics/close.svg"
import playlists, { PlaylistShape } from "../staticQueries/playlists"
import moods, { MoodShape } from "../staticQueries/moods"
import energies, { EnergyShape } from "../staticQueries/energies"
// import { FilteredTracksContext, FilteredTracksContextType } from "../contexts/FilteredTracksContext"
import queryString from "query-string"

interface Props {
  closeMenu: Function
  location: {
    search: string
  }
  tracksData: TrackShape[]
}

const LibraryCategories: React.FC<Props> = ({ location, tracksData, closeMenu }) => {
  // const { filteredTracks } = useContext(FilteredTracksContext) as FilteredTracksContextType
  const urlQuery = queryString.parse(location.search)
  const memoizedData = useMemo(() => tracksData, [tracksData])

  const assembleUrl = (string: string) => {
    const newQuery = []
    const newQueryCategory = string.split("=")[0]
    const newQueryValue = string.split("=")[1]
    const existingQuery = location.search.replace("?", "").split("&")
    let remove = false
    if (existingQuery[0] == "") {
      return `?${string}`
    } else {
      existingQuery.forEach((parameter: string) => {
        const keyvalue = parameter.split("=")
        const key = keyvalue[0]
        const value = keyvalue[1]
        if (!key.includes(newQueryCategory)) {
          newQuery.push(`${key}=${value}`)
        }
        if (key.includes(newQueryCategory) && value.includes(newQueryValue)) {
          remove = true
        }
      })
      if (!remove) {
        newQuery.push(`${newQueryCategory}=${newQueryValue}`)
      }
      return "?" + newQuery.join("&")
    }
  }

  let availablePlaylists: string[] = []
  let availableMoods: string[] = []
  let availableEnergies: string[] = []
  const dupedPlaylists: CategoryShape[] = []
  const dupedMoods: CategoryShape[] = []
  const dupedEnergies: string[] = []

  const filteredPlaylistTracks = memoizedData
    .filter(obj => {
      const moods = obj.moods
      if (moods && urlQuery.mood) {
        const checkMoods = (obj: { slug: string }) => obj.slug === urlQuery.mood
        return moods.some(checkMoods)
      } else {
        return true
      }
    })
    .filter(obj => {
      if (obj.energy && urlQuery.energy) {
        return obj.energy.slug == urlQuery.energy
      } else {
        return true
      }
    })

  const filteredEnergyTracks = memoizedData
    .filter(obj => {
      const playlists = obj.playlists
      if (playlists && urlQuery.playlist) {
        const checkPlaylists = (obj: { slug: string }) => obj.slug === urlQuery.playlist
        return playlists.some(checkPlaylists)
      } else {
        return true
      }
    })
    .filter(obj => {
      const moods = obj.moods
      if (moods && urlQuery.mood) {
        const checkMoods = (obj: { slug: string }) => obj.slug === urlQuery.mood
        return moods.some(checkMoods)
      } else {
        return true
      }
    })

  const filteredMoodTracks = memoizedData
    .filter(obj => {
      const playlists = obj.playlists
      if (playlists && urlQuery.playlist) {
        const checkPlaylists = (obj: { slug: string }) => obj.slug === urlQuery.playlist
        return playlists.some(checkPlaylists)
      } else {
        return true
      }
    })
    .filter(obj => {
      if (obj.energy && urlQuery.energy) {
        return obj.energy.slug == urlQuery.energy
      } else {
        return true
      }
    })

  if (Object.keys(urlQuery).length > 0) {
    filteredPlaylistTracks.forEach(track => {
      if (track.playlists) {
        dupedPlaylists.push(...track.playlists)
      }
    })
    availablePlaylists = [...new Set(dupedPlaylists.map(item => item.slug))]
    filteredMoodTracks.forEach(track => {
      if (track.moods) {
        dupedMoods.push(...track.moods)
      }
    })
    availableMoods = [...new Set(dupedMoods.map(item => item.slug))]
    filteredEnergyTracks.forEach(track => {
      if (track.energy) {
        dupedEnergies.push(track.energy.slug)
      }
    })
    availableEnergies = [...new Set(dupedEnergies)]
  }

  return (
    <>
      <Close className="close" onClick={closeMenu} tw="cursor-pointer absolute right-6 top-6 sm:hidden" />
      <h3 tw="text-lg -mt-8 sm:hidden">Filters</h3>
      <StyledLibraryCategories>
        <ul>
          <li>
            <PageLink
              className={Object.keys(queryString.parse(location.search)).length === 0 ? "-selected" : ""}
              to="/library/"
            >
              All Tracks
            </PageLink>
          </li>
          {playlists()
            .filter((playlist: PlaylistShape) => playlist.title == "Favorites")
            .map((playlist: PlaylistShape) => (
              <li key={playlist.id}>
                {!availablePlaylists.length || availablePlaylists.includes(playlist.slug) ? (
                  <PageLink
                    className={queryString.parse(location.search).playlist == playlist.slug ? "-selected" : ""}
                    to={assembleUrl(`playlist=${playlist.slug}`)}
                  >
                    {playlist.title}
                  </PageLink>
                ) : (
                  <div tw="opacity-50">{playlist.title}</div>
                )}
              </li>
            ))}
        </ul>
        <strong>Playlists</strong>
        <ul>
          {playlists()
            .filter((playlist: PlaylistShape) => playlist.title !== "Favorites")
            .filter((playlist: PlaylistShape) => playlist.active)
            .map((playlist: PlaylistShape) => (
              <li key={playlist.id}>
                {!availablePlaylists.length || availablePlaylists.includes(playlist.slug) ? (
                  <PageLink
                    className={queryString.parse(location.search).playlist == playlist.slug ? "-selected" : ""}
                    to={assembleUrl(`playlist=${playlist.slug}`)}
                  >
                    {playlist.title}
                  </PageLink>
                ) : (
                  <div tw="opacity-50">{playlist.title}</div>
                )}
              </li>
            ))}
        </ul>
        <div>
          <strong>Energies</strong>
          <ul>
            {energies().map((energy: EnergyShape) => (
              <li key={energy.id}>
                {!availableEnergies.length || availableEnergies.includes(energy.slug) ? (
                  <PageLink
                    className={queryString.parse(location.search).energy == energy.slug ? "-selected" : ""}
                    to={assembleUrl(`energy=${energy.slug}`)}
                  >
                    {energy.title}
                  </PageLink>
                ) : (
                  <div tw="opacity-50">{energy.title}</div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <strong>Moods</strong>
          <ul>
            {moods().map((mood: MoodShape) => (
              <li key={mood.id}>
                {!availableMoods.length || availableMoods.includes(mood.slug) ? (
                  <PageLink
                    className={queryString.parse(location.search).mood == mood.slug ? "-selected" : ""}
                    to={assembleUrl(`mood=${mood.slug}`)}
                  >
                    {mood.title}
                  </PageLink>
                ) : (
                  <div tw="opacity-50">{mood.title}</div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </StyledLibraryCategories>
    </>
  )
}

const StyledLibraryCategories = styled.div`
  ${tw`mt-0 sm:-mt-8`}
  height: calc(100vh - 76px);
  @media (min-width: 640px) {
    height: calc(100vh - 180px);
  }
  width: 100%;
  margin-left: -14px;
  overflow-y: scroll;
  overflow-x: hidden;
  strong {
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-size: 0.75rem;
    display: block;
    padding: 24px 0 8px 14px;
  }
  ul {
    list-style-type: none;
    margin: 0;
    column-count: 2;
    @media (min-width: 480px) {
      column-count: 3;
    }
    @media (min-width: 640px) {
      column-count: 2;
      font-size: 0.85rem;
    }
    li {
      margin-bottom: 0;
      padding: 3px 0 3px 14px;
    }
  }
  & .-selected {
    font-weight: bold;
    ${tw`text-hippie-blue`}
    position: relative;
    &::before {
      content: "✓";
      position: absolute;
      left: -14px;
    }
  }
`

export default withLocation(LibraryCategories)
