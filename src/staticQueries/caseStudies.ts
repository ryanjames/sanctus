import { graphql, useStaticQuery } from "gatsby"
import { CaseStudyShape } from "../models/case-study"

const caseStudies = (): CaseStudyShape => {
  const query = useStaticQuery(
    graphql`
      query {
        query: allContentfulCaseStudy {
          edges {
            node {
              id
              title
              slug
              feature
              overlayColor
              image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 2000) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              videoUrl
              client
              role
              studio
              body {
                raw
              }
              category {
                title
                slug
              }
            }
          }
        }
      }
    `
  )
  const {
    query: { edges: CaseStudiesData },
  } = query

  const CaseStudies = CaseStudiesData.map((study: any) => ({
    id: study.node.id,
    title: study.node.title,
    slug: study.node.slug,
    color: study.node.overlayColor,
    image: study.node.image.localFile.childImageSharp.fluid,
    video: study.node.videoUrl,
    body: study.node.body.raw,
    client: study.node.client,
    role: study.node.role,
    studio: study.node.studio,
    category: {
      title: study.node.category.title,
      slug: study.node.category.slug,
    },
    feature: study.node.feature,
  }))

  CaseStudies.push(CaseStudies.shift())

  return CaseStudies
}

export default caseStudies
