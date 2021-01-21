import React from "react"
import PageLink from "./PageLink"
import styled from "@emotion/styled"
import tw from "twin.macro"
import { Col } from "./Container"
import Logo from "../graphics/logo.svg"
import Composer from "../graphics/composer.svg"

type Props = {
  page?: string
}

const Header: React.FC<Props> = ({ page }) => (
  <StyledHeader>
    <Col tw="w-full">
      <nav className="navigation" tw="flex items-center py-5 sm:py-8">
        <span tw="hidden sm:block sm:w-1/3 text-sm md:text-base">
          <PageLink className={page == "about-and-contact" ? "selected" : ""} tw="mr-5 md:mr-6" to="/about-and-contact">
            About &amp; Contact
          </PageLink>
          <PageLink className={page == "features" ? "selected" : ""} to="/features">
            Featured Work
          </PageLink>
        </span>
        <div tw="sm:w-1/3 flex justify-center items-center">
          <PageLink tw="flex flex-col sm:items-center" to="/">
            <Logo className="logo" tw="mb-2" />
            <Composer className="composer" />
          </PageLink>
        </div>
        <span tw="hidden sm:block sm:w-1/3 text-sm md:text-base text-right">
          <PageLink className={page == "library" ? "selected" : ""} to="/library">
            Music Library
          </PageLink>
        </span>
      </nav>
    </Col>
  </StyledHeader>
)

const StyledHeader = styled.header`
  ${tw``}
  position: fixed;
  width: 100%;
  top: 0;
  background: #fff;
  ${tw`z-20`}
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  .navigation .selected {
    font-weight: 600;
  }
  .logo {
    width: 95px;
    height: auto;
  }
  .composer {
    width: 70px;
    height: auto;
  }
`
export default Header
