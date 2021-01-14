import Typography from "typography"
import colors from "./colors"

const typography = new Typography({
  baseFontSize: "14px",
  baseLineHeight: 1.666,
  boldWeight: 700,
  headerWeight: 700,
  bodyWeight: 400,
  scaleRatio: 2.5,
  headerFontFamily: ["Inter", "Helvetica Neue", "Segoe UI", "Helvetica", "Arial", "sans-serif"],
  bodyFontFamily: ["Inter", "Helvetica Neue", "Segoe UI", "Helvetica", "Arial", "sans-serif"],
  overrideStyles: () => ({
    body: {
      color: colors["off-black"],
    },
    figCaption: {
      marginTop: `-${rhythm(1)}`,
      fontStyle: "italic",
      fontSize: "0.85rem",
    },
    h1: {
      lineHeight: `${rhythm(1.75)}`,
      marginBottom: `${rhythm(1.75)}`,
    },
    "h2, h3, h4": {
      lineHeight: `${rhythm(1.5)}`,
      marginBottom: `${rhythm(0.666)}`,
    },
    "h2, h4": {
      fontWeight: 400,
    },
    h3: {
      fontWeight: 600,
    },
    a: {
      textDecoration: "none",
      color: colors["off-black"],
    },
    "h2 a": {
      fontWeight: 600,
      color: colors["dk-green"],
    },
    "p a": {
      textDecoration: "underline",
      color: colors["gray-dark"],
    },
    small: {
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.2rem",
      marginBottom: `0.25rem`,
      display: "block",
    },
    /*
    "a:not([class]), a:not([class]):visited": {
      color: colors["off-black"],
    },
    'a[class=""], a:[class=""]:visited': {
      color: colors["off-black"],
    },
    */
  }),
})

export const { scale, rhythm, options } = typography
export default typography
