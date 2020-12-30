import React from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import PropTypes from "prop-types"
import { mQw, sizes } from "../utils/mediaQueries"

const gutter = tw`px-4  md:px-6  xl:px-8`
const outer = tw`-mx-4 md:-mx-6 xl:-mx-8`

const SplashComponent = ({ children, className }) => {
  return <div className={className}>{children}</div>
}

SplashComponent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
}

export const Splash = styled(SplashComponent)`
  height: calc(100vh - 254px - 86px);
  max-width: 800px;
  margin: 0 auto;
  min-height: 380px;
  display: flex;
  align-items: center;
`

const SectionComponent = ({ children, className }) => {
  return <section className={className}>{children}</section>
}

SectionComponent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
}

export const Section = styled(SectionComponent)`
  ${tw`py-8 sm:py-12 md:py-16 xl:py-20 xxl:py-32`}
`

const ColComponent = ({ children, className }) => {
  return <div className={className}>{children}</div>
}

ColComponent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
}

export const Col = styled(ColComponent)`
  ${gutter}
  width: 100%;
`

const ContainerComponent = ({ children, className }) => {
  return (
    <div className={className}>
      <div>{children}</div>
    </div>
  )
}

ContainerComponent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  full: PropTypes.bool,
}

let queriesString = ""
Object.entries(mQw).map(([key, value]) => {
  queriesString = queriesString.concat(
    `
    @media (${value}) { 
      max-width: ${sizes[key]};
    }`
  )
})

const mediaQueries = props =>
  props.full
    ? `width: 100%;`
    : `
    max-width: 360px;
    ${queriesString} 
 `
const Container = styled(ContainerComponent)`
  ${tw`m-auto px-4 md:px-8 xl:px-12`}
  > div {
    ${tw`flex flex-wrap`}
    ${outer}
  }
  ${mediaQueries}
`
export default Container
