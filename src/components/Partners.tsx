import React, { ReactNode } from "react"
import styled from "@emotion/styled"
import { IPartner } from "../models/home"
import tw from "twin.macro"
import Container, { Col } from "./Container"

type Props = {
  heading: string,
  partners: IPartner[],
  light?: boolean,
}

const Partners: React.FC<Props> = ({ partners, heading, light = false }) => {
  return (
    <StyledPartners light={light}>
      <Container>
        <Col>
          <h2>{heading}</h2>
        </Col>
        <StyledCol>
          {partners.map((partner, i) => {
            return (
              <span key={i}>
                <img src={partner.localFile.publicURL} />
              </span>
            )
          })}
        </StyledCol>
      </Container>
    </StyledPartners>
  )
}

const StyledCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 40px;
  img {
    transition: opacity 0.3s ease-in-out;
    opacity: 0.5;
  }
  a:hover img {
    opacity: 1;
  }
`

const StyledPartners = styled.section<{ light: boolean }>`
  ${tw``}
  background-color: ${props => props.light ? '#2E3140' : '#252834'};
  padding: 60px 0;
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
