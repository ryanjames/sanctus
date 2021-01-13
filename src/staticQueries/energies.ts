import { graphql, useStaticQuery } from "gatsby"
import slugify from "slugify"

export interface EnergyShape {
  id: string
  title: string
  slug: string
  map: Function
}

const energies = (): EnergyShape => {
  const query = useStaticQuery(
    graphql`
      query EnergiesQuery {
        query: allAirtable(filter: { table: { eq: "Energies" } }) {
          edges {
            node {
              data {
                Energy_Name
              }
              id
            }
          }
        }
      }
    `
  )
  const {
    query: { edges: EnergiesData },
  } = query

  interface QueryShape {
    node: {
      id: string
      data: {
        Energy_Name: string
      }
    }
  }

  const Energies = EnergiesData.map((vibe: QueryShape) => ({
    id: vibe.node.id,
    title: vibe.node.data.Energy_Name,
    slug: slugify(vibe.node.data.Energy_Name, { lower: true, strict: true }),
  }))

  return Energies
}

export default energies
