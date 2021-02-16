import { FluidObject } from "gatsby-image"

export interface CaseStudyShape {
  id: string
  title: string
  slug: string
  color: string
  image: FluidObject
  video: string
  body: string
  client: string
  role: string
  studio: string
  feature: boolean
  category: {
    title: string
    slug: string
  }
  map: Function
  sort: Function
  filter: Function
}

export const getCaseStudy = (query: any): CaseStudyShape => {
  const node = query.node
  return {
    id: node.id,
    title: node.title,
    slug: node.slug,
    color: node.overlayColor,
    image: node.image.localFile.childImageSharp.fluid,
    video: node.videoUrl,
    body: node.body.raw,
    client: node.client,
    role: node.role,
    studio: node.studio,
    category: {
      title: node.category.title,
      slug: node.category.slug,
    },
    feature: node.feature,
    map: Function,
    sort: Function,
    filter: Function,
  }
}
