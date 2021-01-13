import React from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import PageLink from "../components/PageLink"
import Play from "../graphics/play.svg"
import { ReactSVG } from "react-svg"
import Img from "gatsby-image"
import { FeatureShape } from "../models/feature"

interface Props {
  feature: FeatureShape
}

const FeatureTile: React.FC<Props> = ({ feature }) => {
  return (
    <StyledFeatureTile>
      <PageLink to={`/feature/${feature.slug}`}>
        <Play />
        <ReactSVG src={feature.logo} />
        <Img fluid={feature.image} />
        <h3>{feature.title}</h3>
        <p>{feature.blurb}</p>
      </PageLink>
      <div className="categories">
        <dl>
          <dt>Genres</dt>
          {feature.genres.map(genre => (
            <dd key={genre.slug}>
              <PageLink to={`/library/genre/${genre.slug}`}>{genre.name}</PageLink>
            </dd>
          ))}
        </dl>
        <dl>
          <dt>Vibes</dt>
          {feature.vibes.map(vibe => (
            <dd key={vibe.slug}>
              <PageLink to={`/library/vibe/${vibe.slug}`}>{vibe.name}</PageLink>
            </dd>
          ))}
        </dl>
      </div>
    </StyledFeatureTile>
  )
}

const StyledFeatureTile = styled.div`
  ${tw``}
`

export default FeatureTile
