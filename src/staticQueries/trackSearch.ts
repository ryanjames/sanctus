import { graphql, useStaticQuery } from "gatsby"
import { TrackSearchShape } from "../models/track-search"

const trackSearchContent = (): TrackSearchShape[] => {
  const query = useStaticQuery(
    graphql`
      query {
        query: allAirtable(filter: {data: {Track_Title: {ne: null}, Published: {eq: true}}}) {
          nodes {
            id
            data {
              Track_Title
            }
          }
        }
      }
    `
  )
  const {
    query: { nodes: TrackData },
  } = query


  return TrackData.map((track: any, index: number) => ({
    id: track.id,
    value: track.data.Track_Title,
    label: track.data.Track_Title
  })).sort((a: TrackSearchShape, b: TrackSearchShape) => {
    if (a.value < b.value)
        return -1 
    if (a.value > b.value)
        return 1
    return 0
  })

}

export default trackSearchContent
