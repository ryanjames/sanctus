import { FluidObject } from "gatsby-image"
import { ISection} from "./section"

export interface IHome {
  data: {
    home: {
      nodes: {
        agencies: {
          localFile: {
            publicURL: string
          }
          description: string
        }[]
        clients: {
          localFile: {
            publicURL: string
          }
        }[]
        demoReel: string
        demoReelPoster: {
          localFile: {
            childImageSharp: {
              fluid: FluidObject
            }
          }
        }
        sections: ISection[]
      }[]
    }
  }
}