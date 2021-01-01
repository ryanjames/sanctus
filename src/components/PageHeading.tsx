import React from "react"
import Container, { Col } from "../components/Container"
import styled from "@emotion/styled"
import tw from "twin.macro"
import PageLink from "../components/PageLink"

interface Props {
  title: string
  to?: string
}

const PageHeading: React.FC<Props> = ({ title, to = null }) => {
  return (
    <StyledPageHeading>
      <Col>
        <div>
          {to ? (
            <h1>
              <PageLink to={to}>{title}</PageLink>
            </h1>
          ) : (
            <h1>{title}</h1>
          )}
        </div>
      </Col>
    </StyledPageHeading>
  )
}

const StyledPageHeading = styled(Container)`
  ${tw`pt-8 md:pt-16 border-0 border-b border-solid border-gray-400`}
`

export default PageHeading
