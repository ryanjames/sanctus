import { graphql, useStaticQuery } from "gatsby"
import { FluidObject } from "gatsby-image"

export interface DefaultsShape {
  owner: string
  author: string
  title: string
  description: string
  ogImage: string
}

interface ContentShape {
  homeIntro: string
  aboutImage: FluidObject
  aboutBody: string
  aboutSeoDescription: string
  musicLibrarySeoDescription: string
  defaults: DefaultsShape
}

const siteContent = (): ContentShape => {
  const query = useStaticQuery(
    graphql`
      query ContentQuery {
        content: allAirtable(filter: { table: { eq: "Content" } }) {
          edges {
            node {
              data {
                Site_SEO_Title
                Site_SEO_Description
                OG_Image {
                  localFiles {
                    publicURL
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

  const data = query.content.edges[0].node.data
  return {
    homeIntro: data.Home_Intro,
    aboutImage: data.About_Image.localFiles[0].childImageSharp.fluid,
    aboutBody: data.About_Body,
    aboutSeoDescription: data.About_SEO_Description,
    musicLibrarySeoDescription: data.Music_Library_SEO_Description,
    defaults: {
      owner: "Sono Sanctus",
      author: "Ryan James",
      title: data.Site_SEO_Title,
      description: data.Site_SEO_Description,
      ogImage: data.OG_Image.localFiles[0].publicURL,
    },
  }
}

export default siteContent
