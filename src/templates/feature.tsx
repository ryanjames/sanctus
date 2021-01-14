import React from "react"
import { graphql } from "gatsby"
import Container, { Col } from "../components/Container"
import Layout from "../components/Layout"
import Video from "../components/Video"
import styled from "@emotion/styled"
import tw from "twin.macro"
import { ReactSVG } from "react-svg"
import PageLink from "../components/PageLink"
import MD from "../utils/MD"
import { getFeature, QueryFeatureShape } from "../models/feature"
import ActiveTrackProvider from "../contexts/ActiveTrackContext"
import TrackDetails from "../components/TrackDetails"
import { Helmet } from "react-helmet"
import FeatureCards from "../components/FeatureCards"
import features from "../staticQueries/features"

type Props = {
  data: {
    feature: {
      edges: QueryFeatureShape[]
    }
  }
  search?: {
    play: string
  }
}

const FeaturePage: React.FC<Props> = ({ data }) => {
  const feature = getFeature(data.feature.edges[0])

  const featureCards = features().filter(obj => {
    return obj.id !== feature.id
  })

  return (
    <StyledLayout>
      <Helmet>
        <script src="https://unpkg.com/wavesurfer.js"></script>
      </Helmet>
      <Container className="feature-content" tw="pt-8 pb-32">
        <Col>
          <Video src={feature.video} poster={feature.image} color={feature.color} />
          <div className="meta" tw="-mt-16 pt-3">
            <div className="client-badge" tw="flex items-center ">
              <ReactSVG src={feature.logo} tw="opacity-30" />
              <h1 tw="text-2xl ml-4 mb-2">{feature.title}</h1>
            </div>
            <div className="categories" tw="-mt-16">
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
          </div>
          <div className="description" tw="max-w-3xl">
            <MD content={feature.description} />
          </div>
          <ActiveTrackProvider>
            {feature.tracks.map(track => (
              <div key={track.id} className="track">
                {track.title}
                <TrackDetails track={track} />
              </div>
            ))}
          </ActiveTrackProvider>
        </Col>
      </Container>
      <FeatureCards features={featureCards} />
    </StyledLayout>
  )
}

const StyledLayout = styled(Layout)`
  ${tw``}
  .client-badge svg path {
    fill: #111;
  }
  .feature-content {
    .categories a {
      border-bottom: 1px solid #aaa;
    }
    .description {
      p {
        ${tw`text-xl`}
      }
    }
  }
`
export default FeaturePage

export const pageQuery = graphql`
  query FeatureQuery($id: String!) {
    feature: allAirtable(filter: { table: { eq: "Features" }, id: { eq: $id } }) {
      edges {
        node {
          id
          data {
            Feature_Name
            Feature_Image {
              localFiles {
                childImageSharp {
                  fluid(maxWidth: 2000) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            Feature_SVG {
              localFiles {
                publicURL
              }
            }
            Feature_Tracks {
              data {
                Track_Title
                URL
                Vibes {
                  data {
                    Vibe_Name
                  }
                }
                Genres {
                  data {
                    Genre_Name
                  }
                }
                Energy {
                  data {
                    Energy_Name
                  }
                }
              }
              id
            }
            Feature_Color
            Feature_Description
            Feature_Video
          }
        }
      }
    }
  }
`
