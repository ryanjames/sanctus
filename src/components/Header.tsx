import PageLink from "./PageLink"
import React from "react"
import Container, { Col } from "./Container"

type Props = {
  siteTitle: string
}

const Header: React.FC<Props> = ({ siteTitle }) => (
  <header>
    <Container>
      <Col>
        <h1 style={{ margin: 0 }}>
          <PageLink to="/">{siteTitle}</PageLink>
        </h1>
      </Col>
    </Container>
  </header>
)

export default Header
