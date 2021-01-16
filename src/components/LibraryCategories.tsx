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
      <dl>
        {playlists().map((playlist: PlaylistShape) => (
          <dd key={playlist.id}>
            <PageLink className={id == playlist.id ? "-selected" : ""} to={`/library/${playlist.slug}`}>
              {playlist.title}
            </PageLink>
          </dd>
        ))}
      </dl>
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
  & .-selected {
    font-weight: bold;
  }
  ul {
    column-count: 2;
  }
`

export default LibraryCategories
