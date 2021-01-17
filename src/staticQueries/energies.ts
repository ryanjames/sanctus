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
        query: allAirtable(filter: { table: { eq: "Energies" } }, sort: { fields: data___Energy_Name }) {
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

  const Energies = EnergiesData.map((vibe: any) => ({
    id: vibe.node.id,
    title: vibe.node.data.Energy_Name,
    slug: slugify(vibe.node.data.Energy_Name, { lower: true, strict: true }),
  }))

  Energies.push(Energies.shift())

  return Energies
}

export default energies
