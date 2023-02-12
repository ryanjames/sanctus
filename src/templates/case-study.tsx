import React from "react"
import slugify from "slugify"
import { graphql } from "gatsby"
import Container, { Col } from "../components/Container"
import Section from "../components/Section"
import RelatedCaseStudies from "../components/RelatedCaseStudies"
import DetailedCredits from "../components/DetailedCredits"
import { ISection } from "../models/section"
import Layout from "../components/Layout"
import Video from "../components/Video"
import styled from "@emotion/styled"
import ActiveTrackProvider from "../contexts/ActiveTrackContext"
import PageLink from "../components/PageLink"
import tw from "twin.macro"
import { getCaseStudy } from "../models/case-study"
import { Helmet } from "react-helmet"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import formattingOptions from "../utils/formattingOptions"
import assets from "../staticQueries/assets"

type Props = {
  data: {
    caseStudy: {
      edges: string[]
    }
  }
  search?: {
    play: string
  }
}


const CaseStudyPage: React.FC<Props> = ({ data }) => {
  const caseStudy = getCaseStudy(data.caseStudy.edges[0])
  const caseStudyAssets = assets()

  const content = JSON.parse(caseStudy.body)

  console.log(caseStudy)

  return (
    <ActiveTrackProvider>
      <StyledLayout title={`Case Study: ${caseStudy.title}`}>
        <Helmet>
          <script src="https://unpkg.com/wavesurfer.js"></script>
        </Helmet>
        {caseStudy.video ? (
          <div tw="lg:-mt-32 relative z-10">
            <Video
              nativeControls={false}
              autoplay={false}
              src={caseStudy.video}
              poster={caseStudy.image}
              color={caseStudy.color}
            />
          </div>
        ) : (
          <div
            tw="lg:-mt-32 mb-24 h-40vh relative z-10 bg-cover bg-center"
            style={{
              backgroundImage: `url(${caseStudy.image.src})`,
            }}
          />
        )}
        <Container className="caseStudy-content" style={caseStudy.sections ? {} : { paddingBottom: "8rem" }}>
          <Col tw="md:w-1/4 flex flex-wrap md:block pb-12 md:pb-0 text-gray-500">
            {caseStudy.client && (
              <div tw="sm:w-1/2 md:w-full pr-8">
                <label tw="text-xs pt-9 uppercase tracking-widest mb-4">Client</label>
                <p>{caseStudy.client}</p>
              </div>
            )}
            {caseStudy.credit && (
              <div tw="sm:w-1/2 md:w-full pr-8">
                <label tw="text-xs pt-9 uppercase tracking-widest mb-4">{caseStudy.creditLabel ?? "Studio"}</label>
                <p>{caseStudy.credit}</p>
              </div>
            )}
            {caseStudy.credit2 && (
              <div tw="sm:w-1/2 md:w-full pr-8">
                <label tw="text-xs pt-9 uppercase tracking-widest mb-4">{caseStudy.credit2Label ?? "Studio"}</label>
                <p>{caseStudy.credit2}</p>
              </div>
            )}
            <div tw="sm:w-1/2 md:w-full pr-8">
              <label tw="text-xs pt-9 uppercase tracking-widest mb-4">Role</label>
              <p>{caseStudy.role}</p>
            </div>
            {caseStudy.category?.slug && caseStudy.category?.categoryName && (
              <div tw="sm:w-1/2 md:w-full pr-8">
                <label tw="text-xs pt-9 uppercase tracking-widest mb-4">Category</label>
                <p>
                  <PageLink
                    tw="text-gray-500 hover:text-white"
                    to={`/work/?category=${caseStudy.category?.slug}`}
                  >
                    {caseStudy.category?.categoryName}
                  </PageLink>
                </p>
              </div>
            )}
          </Col>
          <Col tw="md:w-3/4">
            <h1 tw="text-3xl font-normal mb-12">{caseStudy.title}</h1>
            <div className="description" tw="pb-12">
                {documentToReactComponents(content, formattingOptions(caseStudyAssets))}
            </div>
          </Col>
        </Container>
        {/*
        {caseStudy.sections.map((section: SectionShape, i: number) => <Section key={i} section={section} />)}
        */}
        {caseStudy.relatedStudies && (
          <RelatedCaseStudies heading="Related Case Studies" studies={caseStudy.relatedStudies} />
        )}
        {((caseStudy.detailedCredits1Title && caseStudy.detailedCredits1Body) 
          ||
          (caseStudy.detailedCredits2Title && caseStudy.detailedCredits2Body)) && (
          <Container>
            <Col tw="md:flex pt-24">
              {caseStudy.detailedCredits1Title && caseStudy.detailedCredits1Body && (
                <DetailedCredits heading={caseStudy.detailedCredits1Title} body={caseStudy.detailedCredits1Body} />
              )}
              {caseStudy.detailedCredits2Title && caseStudy.detailedCredits2Body && (
                <DetailedCredits heading={caseStudy.detailedCredits2Title} body={caseStudy.detailedCredits2Body} />
              )}
            </Col>
          </Container>
        )}
      </StyledLayout>
    </ActiveTrackProvider>
  )
}

const StyledLayout = styled(Layout)`
  ${tw``}
  .client-badge svg path {
    fill: #111;
  }
  .video-gradient {
    background: linear-gradient(rgba(28, 30, 40, 0.8), rgba(28, 30, 40, 0));
  }
  .caseStudy-content {
    .description {
      hr {
        ${tw`border-0 border-t border-solid border-gray-500 mt-12 mb-12`}
      }
      p {
        ${tw`text-base leading-relaxed`}
      }
      h3 {
        ${tw`text-xl py-8 font-normal`}
      }
    }
  }
`
export default CaseStudyPage

export const pageQuery = graphql`
  query CaseStudyQuery($id: String!) {
    caseStudy: allContentfulCaseStudy(filter: { id: { eq: $id } }) {
      edges {
        node {
          id
          title
          client
          credit
          creditLabel
          credit2
          credit2Label
          role
          overlayColor
          category {
            slug
            categoryName
          }
          relatedStudies {
            image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 2400) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            slug
            title
          }
          image {
            localFile {
              childImageSharp {
                fluid(maxWidth: 2400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          videoUrl
          body {
            raw
          }
          slug
          section1Media {
            localFile {
              childImageSharp {
                fluid(maxWidth: 2400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            file { 
              url 
              fileName
              contentType
            }
          }
          section1Body { raw }
          section1Stacked
          section2Stacked
          section3Stacked
          section4Stacked
          section5Stacked
          section6Stacked
          section7Stacked
          section8Stacked
          section9Stacked
          section10Stacked
          section2Media {
            localFile {
              childImageSharp {
                fluid(maxWidth: 2400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            file { 
              url 
              fileName
              contentType
            }
          }
          section2Body { raw }
          section3Media {
            localFile {
              childImageSharp {
                fluid(maxWidth: 2400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            file { 
              url 
              fileName
              contentType
            }
          }
          section3Body { raw }
          section4Media {
            localFile {
              childImageSharp {
                fluid(maxWidth: 2400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            file { 
              url 
              fileName
              contentType
            }
          }
          section4Body { raw }
          section5Media {
            localFile {
              childImageSharp {
                fluid(maxWidth: 2400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            file { 
              url 
              fileName
              contentType
            }
          }
          section5Body { raw }
          section6Media {
            localFile {
              childImageSharp {
                fluid(maxWidth: 2400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            file { 
              url 
              fileName
              contentType
            }
          }
          section6Body { raw }
          section7Media {
            localFile {
              childImageSharp {
                fluid(maxWidth: 2400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            file { 
              url 
              fileName
              contentType
            }
          }
          section7Body { raw }
          section8Media {
            localFile {
              childImageSharp {
                fluid(maxWidth: 2400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            file { 
              url 
              fileName
              contentType
            }
          }
          section8Body { raw }
          section9Media {
            localFile {
              childImageSharp {
                fluid(maxWidth: 2400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            file { 
              url 
              fileName
              contentType
            }
          }
          section9Body { raw }
          section10Media {
            localFile {
              childImageSharp {
                fluid(maxWidth: 2400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            file { 
              url 
              fileName
              contentType
            }
          }
          section10Body { raw }
          detailedCredits1Title
          detailedCredits2Body { raw }
          detailedCredits2Title
          detailedCredits1Body { raw }
        }
      }
    }
  }
`
