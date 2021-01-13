import React, { useContext } from "react"
import { graphql } from "gatsby"
import Container, { Col } from "../components/Container"
import SEO from "../components/SEO"
import Layout from "../components/Layout"
import Video from "../components/Video"
import { Helmet } from "react-helmet"
import styled from "@emotion/styled"
import tw from "twin.macro"
import { ReactSVG } from "react-svg"
import PageLink from "../components/PageLink"
import HTML from "../utils/HTML"
import { getFeature, QueryShape } from "../models/feature"
import ActiveTrackProvider from "../contexts/ActiveTrackContext"
import TrackDetails from "../components/TrackDetails"

type Props = { data: { feature: QueryShape } }

const FeaturePage: React.FC<Props> = ({ data }) => {
  const description = "Description"
  const feature = getFeature(data.feature)

  return (
    <StyledFeature>
      <Helmet titleTemplate="%s - Dan Koch">
        <title>{feature.title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <SEO title={`${feature.title}`} description={description} />
      <Container>
        <Col>
          <Video src={feature.video} poster={feature.image} color={feature.color} />
          <div className="meta">
            <div className="client">
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
          <div className="description">{HTML(feature.description)}</div>
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
    </StyledFeature>
  )
}

const StyledFeature = styled(Layout)`
  ${tw``}
  .client svg path {
    fill: #000;
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
