import React from "react"
import { graphql } from "gatsby"
import Container, { Col } from "../components/Container"
import Layout from "../components/Layout"
import Video from "../components/Video"
import styled from "@emotion/styled"
import tw from "twin.macro"
import MD from "../utils/MD"
import { getCaseStudy } from "../models/case-study"
import { Helmet } from "react-helmet"

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
            <MD content={caseStudy.body} externalLinks />
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
          body {
            raw
          }
          slug
        }
      }
    }
  }
`
