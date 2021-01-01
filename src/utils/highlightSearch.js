const highlightResults = (query, filteredData, keys) => {
  const highlight = string => {
    const _query = query.toLowerCase()
    const chunks = string.split(new RegExp("(" + query + ")", "ig"))
    return chunks
      .map(chunk => {
        return chunk.toLowerCase() === _query ? `<span>${chunk}</span>` : chunk
      })
      .join("")
  }

  let results = []
  filteredData.map((result, index) => {
    results[index] = {}
    for (let key of Object.keys(result)) {
      results[index][key] = keys.includes(key) ? highlight(result[key]) : result[key]
    }
  })
  return results
}

export default highlightResults
