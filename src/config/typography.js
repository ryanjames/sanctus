const tailwind = require("../../tailwind.config")
import tw, { css } from "twin.macro"

const screens = tailwind.theme.screens

const typography = () => {
  const styles = {
    base: {
      //h1: tw`text-4xl mb-10`,
      //h2: tw`text-4xl leading-10`,
      p: tw`text-sm leading-6 mb-4`,
      small: tw`text-xs`,
    },
    xs: {
      //h1: tw`text-4xl mb-10`,
      //h2: tw`text-4xl leading-10`,
    },
    sm: {
      //h1: tw`text-4xl mb-10`,
      //h2: tw`text-4xl leading-10`,
      p: tw`text-base leading-7`,
      small: tw`text-sm`,
    },
    md: {
      //h1: tw`text-4xl mb-10`,
      //h2: tw`text-4xl leading-10`,
    },
    lg: {
      //h1: tw`text-4xl mb-10`,
      //h2: tw`text-4xl leading-10`,
    },
    xl: {
      h1: tw`text-4xl mb-10`,
      h2: tw`text-4xl leading-tight`,
      h3: tw`text-4xl leading-tight`,
      h4: tw`text-xl mb-0 font-bold`,
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
