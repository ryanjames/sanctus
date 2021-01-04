import { Link } from "gatsby"
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
          <Link to="/">{siteTitle}</Link>
        </h1>
      </Col>
    </Container>
  </header>
)

export default Header
