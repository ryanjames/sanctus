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
  image: FluidObject
}

const GenreCards: React.FC = () => {
  return (
    <StyledGenreCards tw="list-none flex flex-wrap -mx-2 md:-mx-3 pt-8" className="genre-cards">
      {genres().map((genre: IGenre) => (
        <li tw="w-1/2 sm:w-1/3 pb-0 sm:pb-2 md:pb-3 px-1 sm:px-3" key={genre.id}>
          <PageLink
            tw="block xs:p-4 lg:p-8 text-sm h-full relative flex justify-center items-center"
            to={`/library/genre/${genre.slug}`}
          >
            <div tw="w-full pt-full relative mb-12">
              <Img fluid={genre.image} />
            </div>
            <span tw="absolute w-full bottom-0 left-0 px-3 pb-4 xs:pb-5 sm:pb-8 text-center">{genre.title}</span>
          </PageLink>
        </li>
      ))}
    </StyledGenreCards>
  )
}

const StyledGenreCards = styled.ul`
  ${tw``}
`
export default GenreCards
