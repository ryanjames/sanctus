import React from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import PageLink from "./PageLink"
import Img, { FluidObject } from "gatsby-image"

import playlists from "../staticQueries/playlists"

interface Category {
  id: string
  title: string
  slug: string
  count: number
  image: FluidObject
}

const PlaylistCards: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <StyledPlaylistCards tw="flex flex-wrap -mx-3 sm:-mx-4" className={className}>
      {playlists().map((playlist: Category) => (
        <PageLink
          key={playlist.id}
          tw="w-1/2 sm:w-1/2 md:w-1/3 px-3 xs:px-4 pb-6 sm:pb-10 relative block"
          to={`/library/${playlist.slug}`}
        >
          <div className="image" tw="w-full relative mb-1 sm:mb-2">
            <div className="image-container">
              <Img fluid={playlist.image} />
            </div>
          </div>
          <div tw="flex justify-between items-center text-sm md:text-base">
            <strong>{playlist.title == "Favorite" ? "Favorites" : playlist.title}</strong>
            <span>
              {playlist.count}
              <span tw="hidden sm:inline"> tracks</span>
            </span>
          </div>
        </PageLink>
      ))}
    </StyledPlaylistCards>
  )
}

const StyledPlaylistCards = styled.div`
  ${tw``}
  .image {
    padding-top: 70%;
    overflow: hidden;
  }
  .image-container {
    transition: transform 0.4s ease-in-out;
    transform: translateY(-50%) scale(1);
    top: 50%;
    position: absolute;
    width: 100%;
    height: 100%;
    &:hover {
      transform: translateY(-50%) scale(1.2);
    }
  }
`
export default PlaylistCards
