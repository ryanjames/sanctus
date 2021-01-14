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
        <nav className="navigation" tw="flex items-center py-8">
          <span tw="w-1/3">
            <PageLink className={page == "about-and-contact" ? "selected" : ""} tw="mr-6" to="/about-and-contact">
              About &amp; Contact
            </PageLink>
            <PageLink className={page == "features" ? "selected" : ""} to="/features">
              Featured Work
            </PageLink>
          </span>
          <PageLink tw="w-1/3 flex flex-col items-center" to="/">
            <Logo className="logo" tw="mb-1" />
            <Composer className="composer" />
          </PageLink>
          <span tw="w-1/3 text-right">
            <PageLink className={page == "library" ? "selected" : ""} to="/library">
              Music Library
            </PageLink>
          </span>
        </nav>
      </Col>
    </Container>
  </StyledHeader>
)

const StyledHeader = styled.header`
  ${tw``}
  .navigation .selected {
    font-weight: 600;
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
