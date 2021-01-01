import React from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import { mQw, sizes } from "../utils/mediaQueries"

const gutter = tw`px-4  md:px-6  xl:px-8`
const outer = tw`-mx-4 md:-mx-6 xl:-mx-8`

export const Splash: React.FC = ({ children }) => {
  return <StyledSplash>{children}</StyledSplash>
}
const StyledSplash = styled.div`
  height: calc(100vh - 254px - 86px);
  max-width: 800px;
  margin: 0 auto;
  min-height: 380px;
  display: flex;
  align-items: center;
`

export const Section: React.FC = ({ children }) => {
  return <StyledSection className="section">{children}</StyledSection>
}

const StyledSection = styled.section`
  ${tw`py-8 sm:py-12 md:py-16 xl:py-20 xxl:py-32`}
`

export const Col: React.FC = ({ children }) => {
  return <StyledCol className="col">{children}</StyledCol>
}
const StyledCol = styled.div`
  ${gutter}
  width: 100%;
`

let queriesString = ""
mQw.forEach((value: string, key: string) => {
  queriesString = queriesString.concat(
    `
    @media (${value}) { 
      max-width: ${sizes.get(key)};
    }`
  )
})

const mediaQueries = (props: { full: boolean }) =>
  props.full
    ? `width: 100%;`
    : `
    max-width: 360px;
    ${queriesString} 
 `

export const Container: React.FC<{ full?: boolean }> = ({ children, full = false }) => {
  return (
    <StyledContainer className="container" full={full}>
      <div>{children}</div>
    </StyledContainer>
  )
}
const StyledContainer = styled.div`
  ${tw`m-auto px-4 md:px-8 xl:px-12`}
  > div {
    ${tw`flex flex-wrap`}
    ${outer}
  }
  ${mediaQueries}
`

export default Container
