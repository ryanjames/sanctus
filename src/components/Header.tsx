import React from "react"
import PageLink from "./PageLink"
import styled from "@emotion/styled"
import tw from "twin.macro"
import Container, { Col } from "./Container"
import Logo from "../graphics/logo.svg"
import Composer from "../graphics/composer.svg"

type Props = {
  page?: string
}

const Header: React.FC<Props> = ({ page }) => (
  <StyledHeader>
    <Container full={true}>
      <Col tw="flex justify-between py-4">
        <PageLink tw="flex flex-col items-center" to="/">
          <Logo width={94} height="auto" tw="mb-1" />
          <Composer width={62} />
        </PageLink>
      </Col>
    </Container>
    Current Page: {page}
  </StyledHeader>
)

const StyledHeader = styled.header`
  ${tw``}
`
export default Header
