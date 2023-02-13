import { FluidObject } from "gatsby-image"
import { ISection} from "./section"

export interface IPartner {
  localFile: {
    publicURL: string
  }
}

export interface IHome {
  data: {
    home: {
      nodes: {
        agencies: IPartner[]
        clients: IPartner[]
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