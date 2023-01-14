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
        query: allContentfulCaseStudyCategory(filter: {categoryName: {ne: "Hidden"}}) {
          edges {
            node {
              id
              categoryName
              slug
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
  }))

  CaseStudyCategories.push(CaseStudyCategories.shift())

  return CaseStudyCategories
}

export default caseStudyCategories
