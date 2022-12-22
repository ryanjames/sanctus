import React, { ReactNode } from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import Container, { Col } from "./Container"
import PageLink from "../components/PageLink"
import { FluidObject } from "gatsby-image"

type Props = {
  className?: string,
  heading: string,
  studies: {
    title: string,
    slug: string,
    image: FluidObject,
  }[],
  light?: boolean,
}

const RelatedCaseStudies: React.FC<Props> = ({ className, studies, heading, light = false }) => {
  return (
    <StyledPartners className={className} light={light}>
      <Container>
        <Col>
          <h2>{heading}</h2>
        </Col>
        <StyledCol>
          {studies.map((study, i) => 
            <PageLink key={i} to={`/work/${study.slug}`}>
              {study.title}
            </PageLink>
          )}
        </StyledCol>
      </Container>
    </StyledPartners>
  )
}

const StyledCol = styled(Col)`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;
  svg {
    width: 48px;
  }
`

const StyledPartners = styled.section<{ light: boolean }>`
  ${tw``}
  background-color: ${props => props.light ? '#2E3140' : '#252834'};
  padding: 12% 0;
  h2 {
    text-align: center;
    width: 100%;
    display: block;
    font-weight: 700;
    font-size: 1.7em;
    margin-bottom: 32px;
  }
`
export default RelatedCaseStudies
