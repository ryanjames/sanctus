const tailwind = require("../../tailwind.config")
import tw, { css } from "twin.macro"

const screens = tailwind.theme.screens

const typography = () => {
  const styles = {
    base: {
      h1: tw`text-xl leading-8 mb-5`,
      h2: tw`text-lg leading-7 mb-5`,
      h3: tw`text-base leading-7 mb-5`,
      p: tw`text-sm leading-6 mb-4`,
      small: tw`text-xs`,
    },
    xs: {
      h1: tw`text-2xl`,
      h2: tw`text-xl`,
    },
    sm: {
      h1: tw`mb-6`,
      h3: tw`text-lg`,
      p: tw`text-base leading-7`,
      small: tw`text-sm`,
    },
    md: {
      h1: tw`text-3xl mb-10`,
      h2: tw`text-2xl leading-8`,
    },
    lg: {
      h3: tw`text-xl leading-10`,
    },
    xl: {
      h1: tw`text-4xl mb-10`,
    },
    xxl: {},
  }
  const generatedStyles = Object.entries(styles).map(([key, value]) => ({
    [`@media (min-width: ${screens[key]})`]: value,
  }))
  return css`
    ${generatedStyles}
  `
}

export default typography
