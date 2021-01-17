import React from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import PageLink from "./PageLink"
import Img, { FluidObject } from "gatsby-image"

import genres from "../staticQueries/genres"

interface IGenre {
  id: string
  title: string
  slug: string
  count: number
  image: FluidObject
  className: string
}

const GenreCards: React.FC<{ className: string }> = ({ className }) => {
  return (
    <StyledGenreCards tw="flex flex-wrap -mx-4" className={className}>
      {genres().map((genre: IGenre) => (
        <PageLink key={genre.id} tw="w-1/3 p-4 pb-8 relative block" to={`/library/genre/${genre.slug}`}>
          <div className="image" tw="w-full relative mb-2">
            <div className="image-container">
              <Img fluid={genre.image} />
            </div>
          </div>
          <div tw="flex justify-between items-center">
            <strong>{genre.title}</strong>
            <span>{genre.count} tracks</span>
          </div>
        </PageLink>
      ))}
    </StyledGenreCards>
  )
}

const StyledGenreCards = styled.div`
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
export default GenreCards
