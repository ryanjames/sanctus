import { graphql, useStaticQuery } from "gatsby"
import slugify from "slugify"

export interface VibeShape {
  id: string
  title: string
  slug: string
  map: Function
}

const vibes = (): VibeShape => {
  const query = useStaticQuery(
    graphql`
      query VibesQuery {
        query: allAirtable(filter: { table: { eq: "Vibes" } }) {
          edges {
            node {
              data {
                Vibe_Name
              }
              id
            }
          }
        }
      }
    `
  )
  const {
    query: { edges: VibesData },
  } = query

  interface QueryShape {
    node: {
      id: string
      data: {
        Vibe_Name: string
      }
    }
  }

  const Vibes = VibesData.map((vibe: QueryShape) => ({
    id: vibe.node.id,
    title: vibe.node.data.Vibe_Name,
    slug: slugify(vibe.node.data.Vibe_Name, { lower: true, strict: true }),
  }))

  return Vibes
}

export default vibes
