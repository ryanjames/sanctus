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
              priority
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
              project
              projectLabel
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
    image: study.node.image.localFile ? study.node.image.localFile.childImageSharp.fluid : null,
    video: study.node.videoUrl,
    body: study.node.body.raw,
    client: study.node.client,
    role: study.node.role,
    project: study.node.project,
    projectLabel: study.node.projectLabel,
    category: {
      title: study.node.category.title,
      slug: study.node.category.slug,
    },
    feature: study.node.feature,
    priority: study.node.priority,
  }))

  CaseStudies.push(CaseStudies.shift())

  return CaseStudies
}

export default caseStudies
