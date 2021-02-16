import React from "react"
// import PageLink from "../components/PageLink"
import styled from "@emotion/styled"
import tw from "twin.macro"
import Layout from "../components/Layout"
import caseStudies from "../staticQueries/caseStudies"
import { CaseStudyShape } from "../models/case-study"
import Container, { Col } from "../components/Container"
import PageLink from "../components/PageLink"

const WorkPage: React.FC = () => {
  const caseStudiesData = caseStudies().sort((a: CaseStudyShape, b: CaseStudyShape) => (a.title > b.title ? 1 : -1))

  return (
    <StyledLayout title="Features" page="features">
      <Container>
        <Col>
          {caseStudiesData.map((caseStudy: CaseStudyShape) => (
            <PageLink className="case-study-row" key={caseStudy.id} to={`/work/${caseStudy.slug}`}>
              <h2>{caseStudy.title}</h2>
              <div
                className="image"
                style={{
                  backgroundImage: `url(${caseStudy.image.src})`,
                }}
              />
            </PageLink>
          ))}
        </Col>
      </Container>
    </StyledLayout>
  )
}

const StyledLayout = styled(Layout)`
  ${tw``}
  .case-study-row {
    ${tw`relative block h-32 mb-8`}
    h2 {
      ${tw`text-lg pt-6`}
      position: relative;
      z-index: 2;
    }
    .image {
      transition: 0.2s ease-in-out;
      ${tw`absolute top-0 left-16 right-0 bottom-0`}
      background-position: center;
      background-size: cover;
      z-index: 1;
      opacity: 0.3;
    }
    &:hover {
      .image {
        opacity: 0.8;
      }
    }
  }
`
export default WorkPage
