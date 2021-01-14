import React from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import PageLink from "../components/PageLink"
import Play from "../graphics/play.svg"
import { ReactSVG } from "react-svg"
import hex2rgba from "hex2rgba"
import Img from "gatsby-image"
import { FeatureShape } from "../models/feature"

interface Props {
  feature: FeatureShape
}

const FeatureCard: React.FC<Props> = ({ feature }) => {
  const color1 = hex2rgba(feature.color)
  const color2 = hex2rgba(feature.color, 0)

  return (
    <StyledFeatureCard color1={color1} color2={color2}>
      <div className="client">
        <div tw="flex flex-col items-center max-w-md text-center">
          <ReactSVG src={feature.logo} />
          <h3>{feature.title}</h3>
          <p tw="text-lg">{feature.blurb}</p>
        </div>
      </div>
      <div className="image-container">
        <div tw="absolute inset-0" className="image-overlay"></div>
        <Img fluid={feature.image} />
      </div>
      <PageLink className="play" tw="block" to={`/features/${feature.slug}?play=true`}>
        <Play />
      </PageLink>
      <div className="categories" tw="w-full pr-9 pb-2">
        <PageLink to={`/features/${feature.slug}`} tw="flex items-center justify-end">
          <ReactSVG tw="mr-4" src={feature.logo} />
          <div tw="font-bold pb-1 text-xl">{feature.title}</div>
        </PageLink>
        <dl tw="flex w-full justify-end text-sm mb-0">
          <dt tw="block">Genres</dt>
          {feature.genres.map(genre => (
            <dd key={genre.slug} tw="ml-5 mb-3">
              <PageLink to={`/library/genre/${genre.slug}`}>{genre.name}</PageLink>
            </dd>
          ))}
        </dl>
        <dl tw="flex w-full justify-end text-sm mb-0">
          <dt>Vibes</dt>
          {feature.vibes.map(vibe => (
            <dd key={vibe.slug} tw="ml-5">
              <PageLink to={`/library/vibe/${vibe.slug}`}>{vibe.name}</PageLink>
            </dd>
          ))}
        </dl>
      </div>
    </StyledFeatureCard>
  )
}

const StyledFeatureCard = styled.div<{ color1: string; color2: string }>`
  ${tw`text-white`}
  margin-top: -2px;
  a {
    ${tw`text-white underline`}
  }
  dt {
    opacity: 0.75;
    font-weight: 400;
  }
  .image-overlay {
    z-index: 1;
    background: linear-gradient(0deg, ${props => props.color1} 0%, ${props => props.color2} 100%);
  }
  .image-container {
    transition: all 0.4s ease-in-out;
    ${tw`absolute left-0 right-0 z-0`}
    top: 50%;
    transform: translateY(-50%) scale(1);
  }
  &:hover .image-container {
    transform: translateY(-50%) scale(1.3);
  }
  .client {
    ${tw`absolute inset-0 flex justify-center items-center`}
    z-index: 1;
    transition: all 0.4s ease-in-out;
    opacity: 1;
  }
  &:hover .client {
    opacity: 0;
    filter: blur(1rem);
    transform: scale(0.4);
  }
  .play {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 3;
    transition: all 0.4s ease-in-out;
    transform: translateX(-50%) translateY(-50%) scale(0.4);
    opacity: 0;
  }
  &:hover .play {
    transform: translateX(-50%) translateY(-50%) scale(1);
    opacity: 1;
  }
  .categories {
    > a {
      text-decoration: none;
    }
    ${tw`absolute bottom-0 right-0`}
    backface-visibility: hidden;
    transition: all 0.4s ease-in-out;
    z-index: 4;
    svg {
      width: 40px;
      height: auto;
    }
    opacity: 0;
    transform: translateX(100%);
  }
  &:hover .categories {
    opacity: 1;
    transform: translateX(0);
  }
`

export default FeatureCard
