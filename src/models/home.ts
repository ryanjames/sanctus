import { FluidObject } from "gatsby-image"
import { getSections, SectionShape } from "./sections"

export type Media = {
    object: FluidObject | string,
    type: string
}

export type Partner = {
    image: string,
    link: string,
}

export interface HomeShape {
  demoReel: string
  demoReelPoster: FluidObject
  sections: SectionShape[]
  agencies: Partner[]
  clients: Partner[]
  map: Function
  sort: Function
  filter: Function
}

const getPartners = (partners: { file: { url: string}, description: string }[] ) => {
  return partners.map(partner => {
    return {
      image: "https:" + partner.file.url,
      link: partner.description
    }
  })
}

export const getHome = (query: any): HomeShape => {
  const node = query.node
  return {
    agencies: getPartners(node.agencies),
    clients: getPartners(node.clients),
    demoReel: node.demoReel,
    demoReelPoster: node.demoReelPoster?.localFile.childImageSharp.fluid || undefined,
    sections: getSections(node),
    map: Function,
    sort: Function,
    filter: Function,
  }
}
