import { graphql, useStaticQuery } from "gatsby"
import slugify from "slugify"

export interface MoodShape {
  id: string
  title: string
  slug: string
  map: Function
}

const moods = (): MoodShape => {
  const query = useStaticQuery(
    graphql`
      query MoodsQuery {
        query: allAirtable(filter: { table: { eq: "Moods" } }, sort: { fields: data___Mood_Name }) {
          edges {
            node {
              data {
                Mood_Name
              }
              id
            }
          }
        }
      }
    `
  )
  const {
    query: { edges: MoodsData },
  } = query

  interface QueryShape {
    node: {
      id: string
      data: {
        Mood_Name: string
      }
    }
  }

  const Moods = MoodsData.map((mood: QueryShape) => ({
    id: mood.node.id,
    title: mood.node.data.Mood_Name,
    slug: slugify(mood.node.data.Mood_Name, { lower: true, strict: true }),
  }))

  return Moods
}

export default moods
