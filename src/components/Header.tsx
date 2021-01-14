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
      <Col>
        <nav className="navigation" tw="flex justify-between items-center py-4">
          <PageLink className={page == "about-and-contact" ? "selected" : ""} to="/about-and-contact">
            About &amp; Contact
          </PageLink>
          <PageLink tw="flex flex-col items-center" to="/">
            <Logo className="logo" tw="mb-1" />
            <Composer className="composer" />
          </PageLink>
          <PageLink className={page == "library" ? "selected" : ""} to="/library">
            Music Library
          </PageLink>
        </nav>
      </Col>
    </Container>
  </StyledHeader>
)

const StyledHeader = styled.header`
  ${tw``}
  .navigation > .selected {
    font-weight: bold;
  }
  .logo {
    width: 95px;
    height: auto;
  }
  .composer {
    width: 62px;
    height: auto;
  }
`
export default Header
