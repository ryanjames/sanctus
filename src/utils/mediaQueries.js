const tailwind = require("../../tailwind.config")

const screens = tailwind.theme.screens

const gutters = tailwind.theme.gutters

const sizes = new Map()
Object.entries(screens)
  .filter(([key]) => !["v", "base"].some(item => key.includes(item)))
  .map(([key, value]) => {
    sizes.set(key, value)
  })

const mQw = new Map()
Object.entries(screens)
  .filter(([key]) => !["v", "base"].some(item => key.includes(item)))
  .map(([key, value]) => {
    mQw.set(key, `min-width: ${value}`)
  })

const mQh = new Map()
Object.entries(screens)
  .filter(([key]) => !["v", "base"].some(item => key.includes(item)))
  .map(([key, value]) => {
    mQh.set(key, `min-height: ${value}`)
  })

export { mQw, mQh, sizes, gutters }
