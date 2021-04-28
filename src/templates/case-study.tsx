import React from "react"
import { graphql } from "gatsby"
import Container, { Col } from "../components/Container"
import Layout from "../components/Layout"
import Video from "../components/Video"
import ReactPlayer from "react-player"
import InlinePlayer from "../components/InlinePlayer"
import styled from "@emotion/styled"
import ActiveTrackProvider from "../contexts/ActiveTrackContext"
import PageLink from "../components/PageLink"
import tw from "twin.macro"
import { getCaseStudy } from "../models/case-study"
import { Helmet } from "react-helmet"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import { BLOCKS, MARKS } from "@contentful/rich-text-types"
/*
import { renderRichText } from "gatsby-source-contentful/rich-text"

const Bold = ({ children }) => <span className="bold">{children}</span>
const Text = ({ children }) => <p className="align-center">{children}</p>

*/

type Props = {
  data: {
    caseStudy: {
      edges: string[]
    }
    assets: {
      edges: string[]
    }
  }
  search?: {
    play: string
  }
}

const CaseStudyPage: React.FC<Props> = ({ data }) => {
  const caseStudy = getCaseStudy(data.caseStudy.edges[0])
  const assets = data.assets.edges

  const content = JSON.parse(caseStudy.body)

  const formattingOptions = {
    renderMark: {
      [MARKS.CODE]: node => <div className="inline-video"><ReactPlayer url={node} controls={true} /></div>,
    },
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: node => {
        const validAsset = assets.filter(obj => {
          if (obj.next) {
            return obj.next.contentful_id === node.data.target.sys.id
          }
        })
        if (validAsset[0].next) {
          const asset = validAsset[0].next
          const type = asset.file.contentType
          const newLocal = null
          switch (type) {
            case "image/jpeg":
              return <img tw="my-12" src={asset.fixed.src} alt={asset.title} />
              break
            case "audio/x-wav":
              return (
                <InlinePlayer
                  track={{
                    id: asset.contentful_id,
                    title: asset.title,
                    length: "",
                    url: asset.file.url,
                    moods: [],
                    energy: {
                      name: "",
                      id: "",
                      slug: "",
                    },
                    priority: 0,
                  }}
                />
              )
              break
            default:
              return newLocal
          }
        }
      },
    },
  }

  return (
    <StyledLayout>
      <Helmet>
        <script src="https://unpkg.com/wavesurfer.js"></script>
      </Helmet>
      <div tw="-mt-32 relative z-10">
        <Video autoplay={false} src={caseStudy.video} poster={caseStudy.image} color={caseStudy.color} />
      </div>
      <Container className="caseStudy-content" tw="pb-32">
        <Col tw="w-1/4 text-gray-500">
          <label tw="text-xs pt-9 uppercase tracking-widest mb-4">Client</label>
          <p>{caseStudy.client}</p>
          <label tw="text-xs pt-9 uppercase tracking-widest mb-4">Studio</label>
          <p>{caseStudy.studio}</p>
          <label tw="text-xs pt-9 uppercase tracking-widest mb-4">Role</label>
          <p>{caseStudy.role}</p>
          <label tw="text-xs pt-9 uppercase tracking-widest mb-4">Category</label>
          <p>
            <PageLink tw="text-gray-500 hover:text-white" to={`/work/?category=${caseStudy.category.slug}`}>
              {caseStudy.category.title}
            </PageLink>
          </p>
        </Col>
        <Col tw="w-3/4">
          <h1 tw="text-3xl font-normal mb-12">{caseStudy.title}</h1>
          <div className="description" tw="pb-12">
            <ActiveTrackProvider>{documentToReactComponents(content, formattingOptions)}</ActiveTrackProvider>
          </div>
        </Col>
      </Container>
    </StyledLayout>
  )
}

const StyledLayout = styled(Layout)`
  ${tw``}
  .client-badge svg path {
    fill: #111;
  }
  .inline-video {
    padding-top: 56.25%;
    position: relative;
    margin: 40px 0;
    > div {
      ${tw`absolute inset-0`}
      width: 100% !important;
      height: 100% !important;
    }
  }
  .video-gradient {
    background: linear-gradient(rgba(28, 30, 40, 0.8), rgba(28, 30, 40, 0));
  }
  .caseStudy-content {
    .description {
      p {
        ${tw`text-base leading-relaxed`}
      }
      h3 {
        ${tw`text-xl py-8 font-normal`}
      }
    }
  }
`
export default CaseStudyPage

export const pageQuery = graphql`
  query CaseStudyQuery($id: String!) {
    assets: allContentfulAsset {
      edges {
        next {
          title
          contentful_id
          fixed(width: 1600) {
            src
          }
          file {
            contentType
            url
          }
        }
      }
    }
    caseStudy: allContentfulCaseStudy(filter: { id: { eq: $id } }) {
      edges {
        node {
          id
          title
          client
          studio
          role
          overlayColor
          image {
            localFile {
              childImageSharp {
                fluid(maxWidth: 2400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          videoUrl
          category {
            title
            slug
          }
          body {
            raw
          }
          slug
        }
      }
    }
  }
`
