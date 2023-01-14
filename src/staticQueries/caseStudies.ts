import { graphql, useStaticQuery } from "gatsby"
import { CaseStudyShape } from "../models/case-study"

const caseStudies = (): CaseStudyShape => {
  const query = useStaticQuery(
    graphql`
      query {
        query: allContentfulCaseStudy(filter: {category: {elemMatch: {categoryName: {ne: "Hidden"}}}}) {
          edges {
            node {
              id
              title
              category {
                slug
                categoryName
              }
              slug
              priority
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
            }
          }
        }
      }
    `
  )
  const {
    query: { edges: CaseStudyData },
  } = query


  const CaseStudies = CaseStudyData.map((study: any, index: number) => ({
    order: index,
    category: study.node.category ? study.node.category[0] : null,
    id: study.node.id,
    title: study.node.title,
    slug: study.node.slug,
    priority: study.node.priority,
    color: study.node.overlayColor,
    image: study.node.image.localFile ? study.node.image.localFile.childImageSharp.fluid : null,
  }))

  CaseStudies.push(CaseStudies.shift())

  return CaseStudies
}

export default caseStudies
