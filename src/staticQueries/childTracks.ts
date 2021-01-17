import { graphql, useStaticQuery } from "gatsby"
import slugify from "slugify"
import { TrackShape, QueryNodeShape } from "../models/tracks"

const childTracks = (): TrackShape[] => {
  const query = useStaticQuery(
    graphql`
      query ChildTracksQuery {
        query: allAirtable(filter: { table: { eq: "Tracks" }, data: { Has_Parent: { eq: 1 } } }) {
          edges {
            node {
              data {
                Track_Title
                Parent {
                  id
                }
                Has_Parent
                Genres {
                  data {
                    Genre_Name
                  }
                  id
                }
                Vibes {
                  data {
                    Vibe_Name
                  }
                  id
                }
                Energy {
                  data {
                    Energy_Name
                  }
                  id
                }
                Length
                Priority
                URL
              }
              id
            }
          }
        }
      }
    `
  )
  const {
    query: { edges: TracksData },
  } = query

  const Tracks = TracksData.map((track: QueryNodeShape) => ({
    id: track.node.id,
    title: track.node.data.Track_Title,
    length: track.node.data.Length,
    url: track.node.data.URL,
    energy: {
      id: track.node.data.Energy[0].id,
      name: track.node.data.Energy[0].data.Energy_Name,
      slug: slugify(track.node.data.Energy[0].data.Energy_Name, { lower: true, strict: true }),
    },
    parent: track.node.data.Parent[0].id,
    genres: [],
    vibes: [],
    priority: 0,
  }))

  return Tracks
}

export default childTracks
