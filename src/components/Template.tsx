import React from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
// import PageLink from "./PageLink"
//import Container, { Col } from "./Container"

type Props = {
  className?: string
}

const Component: React.FC<Props> = ({ className }) => {
  return (
    <StyledComponent className={`container ${className}`}>
      <>Component Name</>
    </StyledComponent>
  )
}

const StyledComponent = styled.div`
  ${tw``}
`
export default Component
