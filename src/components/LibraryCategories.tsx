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
      <dl>
        <dt>Genres</dt>
        {genres().map((genre: GenreShape) => (
          <dd key={genre.id}>
            <PageLink className={id == genre.id ? "-selected" : ""} to={`/library/genre/${genre.slug}`}>
              {genre.title}
            </PageLink>
          </dd>
        ))}
      </dl>
      <dl>
        <dt>Energies</dt>
        {energies().map((energy: EnergyShape) => (
          <dd key={energy.id}>
            <PageLink className={id == energy.id ? "-selected" : ""} to={`/library/energy/${energy.slug}`}>
              {energy.title}
            </PageLink>
          </dd>
        ))}
      </dl>
      <dl>
        <dt>Vibes</dt>
        {vibes().map((vibe: VibeShape) => (
          <dd key={vibe.id}>
            <PageLink className={id == vibe.id ? "-selected" : ""} to={`/library/vibe/${vibe.slug}`}>
              {vibe.title}
            </PageLink>
          </dd>
        ))}
      </dl>
    </StyledLibraryCategories>
  )
}

const StyledLibraryCategories = styled.div`
  ${tw`pt-8 md:pt-16 border-0 border-b border-solid border-gray-400`}
  & .-selected {
    font-weight: bold;
  }
`

export default LibraryCategories
