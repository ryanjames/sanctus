export const lastUrlSegment = string =>
  string
    .split("/")
    .filter(e => e)
    .pop()

export const toTitle = str => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}
