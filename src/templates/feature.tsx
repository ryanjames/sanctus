import React, { useEffect } from "react"
import { graphql } from "gatsby"
import Container, { Col } from "../components/Container"
import withLocation from "../utils/withLocation"
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

const FeaturePage: React.FC<Props> = ({ data, search }) => {
  const feature = getFeature(data.feature.edges[0])

  const featureCards = features().filter(obj => {
    return obj.id !== feature.id
  })

  return (
    <StyledLayout>
      <Helmet>
        <script src="https://unpkg.com/wavesurfer.js"></script>
      </Helmet>
      <Container className="feature-content">
        <Col>
          <Video
            src={feature.video}
            poster={feature.image}
            color={feature.color}
            autoplay={search?.play ? true : false}
          />
          <div className="meta">
            <div className="client-badge">
              <ReactSVG src={feature.logo} />
              {feature.title}
            </div>
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
          </div>
          <div className="description">
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
`
export default withLocation(FeaturePage)

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
