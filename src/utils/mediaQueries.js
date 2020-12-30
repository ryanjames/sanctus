const tailwind = require("../../tailwind.config")
const screens = tailwind.theme.screens

let sizesObj = {}
Object.entries(screens)
  .filter(([key]) => !["v", "base"].some(item => key.includes(item)))
  .map(([key, value]) => {
    sizesObj[key] = value
  })
export const sizes = sizesObj

let widthsObj = {}
Object.entries(screens)
  .filter(([key]) => !["v", "base"].some(item => key.includes(item)))
  .map(([key, value]) => {
    widthsObj[key] = `min-width: ${value}`
  })
export const mQw = widthsObj

let heightsObj = {}
Object.entries(screens)
  .filter(([key]) => !["v", "base"].some(item => key.includes(item)))
  .map(([key, value]) => {
    heightsObj[key] = `min-height: ${value}`
  })
export const mQh = heightsObj
