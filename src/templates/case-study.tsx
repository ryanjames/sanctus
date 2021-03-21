import React from "react"
import { graphql } from "gatsby"
import Container, { Col } from "../components/Container"
import Layout from "../components/Layout"
import Video from "../components/Video"
import styled from "@emotion/styled"
import tw from "twin.macro"
import { getCaseStudy } from "../models/case-study"
import { Helmet } from "react-helmet"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

/*
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { renderRichText } from "gatsby-source-contentful/rich-text"

const Bold = ({ children }) => <span className="bold">{children}</span>
const Text = ({ children }) => <p className="align-center">{children}</p>

const formattingOptions = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [BLOCKS.EMBEDDED_ASSET]: node => {
      return (
        <>
          <h2>Embedded Asset</h2>
          <pre>
            <code>{JSON.stringify(node, null, 2)}</code>
          </pre>
        </>
      )
    },
  },
}
*/

type Props = {
  data: {
    caseStudy: {
      edges: string[]
    }
  }
  search?: {
    play: string
  }
}

const CaseStudyPage: React.FC<Props> = ({ data }) => {
  const caseStudy = getCaseStudy(data.caseStudy.edges[0])
  const content = JSON.parse(caseStudy.body)

  console.log(content)

  return (
    <StyledLayout>
      <Helmet>
        <script src="https://unpkg.com/wavesurfer.js"></script>
      </Helmet>
      <Container className="caseStudy-content" tw="pt-8 pb-32">
        <Col>
          <Video src={caseStudy.video} poster={caseStudy.image} color={caseStudy.color} />
          <div className="meta" tw="-mt-16 pt-3">
            <div className="client-badge" tw="flex items-center">
              <h1 tw="text-2xl ml-4 mb-2">{caseStudy.title}</h1>
            </div>
          </div>
          <div className="description" tw="max-w-3xl pb-12">
            {documentToReactComponents(content)}
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
  .caseStudy-content {
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
export default CaseStudyPage

export const pageQuery = graphql`
  query CaseStudyQuery($id: String!) {
    caseStudy: allContentfulCaseStudy(filter: { id: { eq: $id } }) {
      edges {
        node {
          id
          title
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
            references {
              ... on ContentfulAsset {
                contentful_id
                fixed(width: 1600) {
                  width
                  height
                  src
                  srcSet
                }
              }
            }
          }
          slug
        }
      }
    }
  }
`
