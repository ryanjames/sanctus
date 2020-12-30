import React from 'react'
// import { Link } from 'gatsby'
import Container, { Col } from '../components/Container'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import tw from 'twin.macro'
import PageLink from '../components/PageLink'

const PageHeadingComponent = ({ className, title, to }) => {
  return (
    <Container>
      <Col>
        <div className={className}>
          {to ?
            <h1>
              <PageLink to={to}>{title}</PageLink>
            </h1>
            :
            <h1>{title}</h1>
          }
        </div>
      </Col>
    </Container>
  )
}

PageHeadingComponent.propTypes = {
  className: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string,
}
PageHeadingComponent.defaultProps = {
  to: null,
}

const PageHeading = styled(PageHeadingComponent)`
  ${tw`pt-8 md:pt-16 border-0 border-b border-solid border-gray-400`}
`

export default PageHeading
