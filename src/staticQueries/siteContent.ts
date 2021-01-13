import { graphql, useStaticQuery } from "gatsby"
import { FluidObject } from "gatsby-image"

export interface ContentShape {
  siteSeoTitle: string
  siteSeoDescription: string
  ogImage: FluidObject
  homeIntro: string
  aboutImage: FluidObject
  aboutBody: string
  aboutSeoDescription: string
  musicLibrarySeoDescription: string
}

const siteContent = (): ContentShape => {
  const query = useStaticQuery(
    graphql`
      query ContentQuery {
        query: allAirtable(filter: { table: { eq: "Content" } }) {
          edges {
            node {
              data {
                Site_SEO_Title
                Site_SEO_Description
                OG_Image {
                  localFiles {
                    childImageSharp {
                      fluid(maxWidth: 1200) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
                Home_Intro
                About_Image {
                  localFiles {
                    childImageSharp {
                      fluid(maxWidth: 2000) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
                About_Body
                About_SEO_Description
                Music_Library_SEO_Description
              }
            }
          }
        }
      }
    `
  )
  const {
    query: { edges: ContentData },
  } = query

  const data = ContentData[0].node.data
  return {
    siteSeoTitle: data.Site_SEO_Title,
    siteSeoDescription: data.Site_SEO_Description,
    ogImage: data.OG_Image.localFiles[0].childImageSharp.fluid,
    homeIntro: data.Home_Intro,
    aboutImage: data.About_Image.localFiles[0].childImageSharp.fluid,
    aboutBody: data.About_Body,
    aboutSeoDescription: data.About_SEO_Description,
    musicLibrarySeoDescription: data.Music_Library_SEO_Description,
  }
}

export default siteContent
