import PageLink from "./PageLink"
import React from "react"
import Container, { Col } from "./Container"

type Props = {
  page?: string
}

const Header: React.FC<Props> = ({ page }) => (
  <header>
    <Container>
      <Col>
        <h1 style={{ margin: 0 }}>Dan Koch Logo</h1>
        Current Page: {page}
      </Col>
    </Container>
  </header>
)

export default Header
