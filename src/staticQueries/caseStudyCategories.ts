import { graphql, useStaticQuery } from "gatsby"
import { CaseStudyShape } from "../models/case-study"

export interface CaseStudyCategoryShape {
  id: string
  categoryName: string
  slug: string
  forEach: Function
  map: Function
  caseStudies: CaseStudyShape[]
}

const caseStudyCategories = (): CaseStudyCategoryShape => {
  const query = useStaticQuery(
    graphql`
      query {
        query: allContentfulCaseStudyCategory {
          edges {
            node {
              id
              categoryName
              slug
              caseStudies {
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
              }
            }
          }
        }
      }
    `
  )
  const {
    query: { edges: CaseStudyCategoriesData },
  } = query

  const CaseStudyCategories = CaseStudyCategoriesData.map((category: any) => ({
    id: category.node.id,
    slug: category.node.slug,
    categoryName: category.node.categoryName,
    caseStudies: category.node.caseStudies.map((study: any, index: number) => ({
      order: index,
      category: category.node.slug,
      id: study.id,
      title: study.title,
      slug: study.slug,
      priority: study.priority,
      feature: study.feature,
      color: study.overlayColor,
      image: study.image.localFile ? study.image.localFile.childImageSharp.fluid : null,
    })),
  }))

  CaseStudyCategories.push(CaseStudyCategories.shift())

  return CaseStudyCategories
}

export default caseStudyCategories
