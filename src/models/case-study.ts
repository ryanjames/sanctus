import { ISection } from "./section"
import { FluidObject } from "gatsby-image"

export interface IRelatedStudy {
  image: {
    localFile: {
      childImageSharp: {
        fluid: FluidObject
      }
    }
  }
  slug: string
  title: string
}

export default interface ICaseStudy {
  data: {
    caseStudy: {
      nodes: {
        id: string
        title: string
        client: string
        credit: string
        creditLabel: string
        credit2: string
        credit2Label: string
        role: string
        overlayColor: string
        slug: string
        videoUrl: string
        image: {
          localFile: {
            childImageSharp: {
              fluid: FluidObject
            }
          }
        }
        body: {
          raw: string
        }
        category: {
          slug: string
          categoryName: string
        }[]
        relatedStudies: IRelatedStudy[]
        sections: ISection[]
        detailedCredits1Title: string
        detailedCredits2Body: { 
          raw: string
        }
        detailedCredits2Title: string
        detailedCredits1Body: { 
          raw: string
        }
      }[]
    }
  }
}