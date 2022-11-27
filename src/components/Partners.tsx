import React, { ReactNode } from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import Container, { Col } from "./Container"

type Props = {
  className?: string,
  heading: string,
  partners: {
    logo: ReactNode,
    link: string,
  }[],
  light?: boolean,
}

const Partners: React.FC<Props> = ({ className, partners, heading, light = false }) => {
  return (
    <StyledPartners light={light}>
      <Container>
        <Col>
          <h2>{heading}</h2>
        </Col>
        <StyledCol>
          {partners.map((partner) => 
            <a href={partner.link} target="_blank" rel="noreferrer">
              {partner.logo}
            </a>
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
export default Partners
