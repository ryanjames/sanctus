import React from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import PageLink from "../components/PageLink"

import playlists, { PlaylistShape } from "../staticQueries/playlists"
import genres, { GenreShape } from "../staticQueries/genres"
import vibes, { VibeShape } from "../staticQueries/vibes"
import energies, { EnergyShape } from "../staticQueries/energies"

interface Props {
  id?: string
}

const LibraryCategories: React.FC<Props> = ({ id }) => {
  return (
    <StyledLibraryCategories>
      <ul>
        {playlists().map((playlist: PlaylistShape) => (
          <li key={playlist.id}>
            <PageLink className={id == playlist.id ? "-selected" : ""} to={`/library/${playlist.slug}`}>
              {playlist.title == "Favorite" ? "Favorites" : playlist.title}
            </PageLink>
          </li>
        ))}
      </ul>
      <div>
        <strong>Genres</strong>
        <ul>
          {genres().map((genre: GenreShape) => (
            <li key={genre.id}>
              <PageLink className={id == genre.id ? "-selected" : ""} to={`/library/genre/${genre.slug}`}>
                {genre.title}
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
      <div>
        <strong>Vibes</strong>
        <ul>
          {vibes().map((vibe: VibeShape) => (
            <li key={vibe.id}>
              <PageLink className={id == vibe.id ? "-selected" : ""} to={`/library/vibe/${vibe.slug}`}>
                {vibe.title}
              </PageLink>
            </li>
          ))}
        </ul>
      </div>
    </StyledLibraryCategories>
  )
}

const StyledLibraryCategories = styled.div`
  ${tw``}
  height: calc(100vh - 240px);
  margin-top: 40px;
  margin-left: -14px;
  overflow-y: scroll;
  overflow-x: visible;
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
    font-size: 0.85rem;
    column-count: 2;
    li {
      margin-bottom: 0;
      padding-left: 14px;
    }
  }
  & .-selected {
    font-weight: bold;
    ${tw`text-dk-green`}
    position: relative;
    &::before {
      content: "✓";
      position: absolute;
      left: -14px;
    }
  }
`

export default LibraryCategories
