import React from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import PageLink from "../components/PageLink"
import withLocation from "../utils/withLocation"
import Close from "../graphics/close.svg"
import playlists, { PlaylistShape } from "../staticQueries/playlists"
import moods, { MoodShape } from "../staticQueries/moods"
import energies, { EnergyShape } from "../staticQueries/energies"
import queryString from "query-string"

interface Props {
  closeMenu: Function
  location: {
    origin: string
  }
}

const LibraryCategories: React.FC<Props> = ({ closeMenu }) => {
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
                <PageLink
                  className={queryString.parse(location.search).playlist == playlist.slug ? "-selected" : ""}
                  to={assembleUrl(`playlist=${playlist.slug}`)}
                >
                  {playlist.title}
                </PageLink>
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
                <PageLink
                  className={queryString.parse(location.search).playlist == playlist.slug ? "-selected" : ""}
                  to={assembleUrl(`playlist=${playlist.slug}`)}
                >
                  {playlist.title}
                </PageLink>
              </li>
            ))}
        </ul>
        <div>
          <strong>Energies</strong>
          <ul>
            {energies().map((energy: EnergyShape) => (
              <li key={energy.id}>
                <PageLink
                  className={queryString.parse(location.search).energy == energy.slug ? "-selected" : ""}
                  to={assembleUrl(`energy=${energy.slug}`)}
                >
                  {energy.title}
                </PageLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <strong>Moods</strong>
          <ul>
            {moods().map((mood: MoodShape) => (
              <li key={mood.id}>
                <PageLink
                  className={queryString.parse(location.search).mood == mood.slug ? "-selected" : ""}
                  to={assembleUrl(`mood=${mood.slug}`)}
                >
                  {mood.title}
                </PageLink>
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
    height: calc(100vh - 140px);
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
      padding-left: 14px;
      a {
        display: inline-block;
        padding: 3px 0;
      }
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
