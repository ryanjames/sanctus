import React, { ReactNode } from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import { IRelatedStudy } from "../models/case-study"
import Container, { Col } from "./Container"
import PageLink from "../components/PageLink"
import Img, { FluidObject } from "gatsby-image"

type Props = {
  className?: string,
  heading: string,
  studies: IRelatedStudy[]
  light?: boolean,
}

const RelatedCaseStudies: React.FC<Props> = ({ className, studies, heading, light = false }) => {
  return (
    <StyledRelatedStudies className={className} light={light}>
      <Container>
        <Col>
          <h2>{heading}</h2>
        </Col>
        <StyledCol>
          {studies.map((study, i) => 
            <PageLink className="related-study" key={i} to={`/work/${study.slug}`}>
              <Img fluid={study.image.localFile.childImageSharp.fluid} />
              <h3>{study.title}</h3>
            </PageLink>
          )}
        </StyledCol>
      </Container>
    </StyledRelatedStudies>
  )
}

const StyledCol = styled(Col)`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: center;
  justify-content: center;
`

const StyledRelatedStudies = styled.section<{ light: boolean }>`
  ${tw``}
  background-color: ${props => props.light ? '#2E3140' : '#252834'};
  padding: 8% 0;
  h2 {
    text-align: center;
    width: 100%;
    display: block;
    font-weight: 700;
    font-size: 1.7em;
    margin-bottom: 32px;
  }
  .related-study {
    width: 20%;
    padding-top: 15%;
    position: relative;
    h3 {
      display: flex;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0;
      align-items: center;
      text-align: center;
      font-size: 18px;
      padding: 0 24px;
      justify-content: center;
      z-index: 2;
      background: rgba(0,0,0,0.5)
    }
    .gatsby-image-wrapper {
      z-index: 1;
      position: absolute !important;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
`
export default RelatedCaseStudies
