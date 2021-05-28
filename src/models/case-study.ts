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
  project: string
  projectLabel: string
  feature: boolean
  priority: string
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
    project: node.project,
    projectLabel: node.projectLabel,
    category: {
      title: node.category.title,
      slug: node.category.slug,
    },
    feature: node.feature,
    priority: node.priority,
    map: Function,
    sort: Function,
    filter: Function,
  }
}
