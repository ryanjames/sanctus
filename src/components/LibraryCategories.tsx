import React from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import PageLink from "../components/PageLink"

import Close from "../graphics/close.svg"
import playlists, { PlaylistShape } from "../staticQueries/playlists"
import moods, { MoodShape } from "../staticQueries/moods"
import energies, { EnergyShape } from "../staticQueries/energies"

interface Props {
  id?: string
  closeMenu: Function
}

const LibraryCategories: React.FC<Props> = ({ id, closeMenu }) => {
  return (
    <>
      <Close onClick={closeMenu} tw="cursor-pointer absolute right-6 top-6 sm:hidden" />
      <h3 tw="mt-8 text-lg -mb-8 sm:hidden">Filters</h3>
      <StyledLibraryCategories>
        <ul>
          {playlists().map((playlist: PlaylistShape) => (
            <li key={playlist.id}>
              <PageLink className={id == playlist.id ? "-selected" : ""} to={`/library/playlist/${playlist.slug}`}>
                {playlist.title == "Favorite" ? "Favorites" : playlist.title}
              </PageLink>
            </li>
          ))}
        </ul>
        <div>
          <strong>Genres</strong>
          <ul>
            {moods().map((mood: MoodShape) => (
              <li key={mood.id}>
                <PageLink className={id == mood.id ? "-selected" : ""} to={`/library/mood/${mood.slug}`}>
                  {mood.title}
                </PageLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <strong>Energies</strong>
          <ul>
            {energies().map((energy: EnergyShape) => (
              <li key={energy.id}>
                <PageLink className={id == energy.id ? "-selected" : ""} to={`/library/energy/${energy.slug}`}>
                  {energy.title}
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
  ${tw``}
  height: calc(100vh - 76px);
  @media (min-width: 640px) {
    height: calc(100vh - 240px);
  }
  width: 100%;
  margin-top: 40px;
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

export default LibraryCategories
