import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#424242",
    },
    info: {
      main: "#757575",
    },
  },
  typography: {
    fontFamily: "'Ysabeau Infant', serif", // Font used in the website
    h1: {
      fontSize: window.innerWidth < 830 ? "20px" : "3rem", // Font size for the website's headings
      fontWeight: 700,
      marginBottom: "2rem",
    },

    h2: {
      fontSize: window.innerWidth < 830 ? "20px" : "2rem", // Font size for the website's subheadings
      fontWeight: window.innerWidth < 830 ? 500 : 600,
      marginBottom: window.innerWidth < 830 ? "20px" : "1.5rem",
    },
    h3: {
      fontSize: window.innerWidth < 830 ? "20px" : "1.5rem", // Font size for smaller headings
      fontWeight: 500,
      marginBottom: "1.25rem",
    },
    p: {
      fontSize: "1.9rem", // Font size for smaller headings
      fontWeight: 500,
      marginBottom: "1.25rem",
    },
    body1: {
      fontSize: "1rem", // Font size for regular text content
      marginBottom: "1rem",
    },
    body2: {
      fontSize: window.innerWidth < 830 ? "17px" : "1.25rem", // Font size for regular text content
      marginBottom: "1rem",
    },
    button: {
      textTransform: "none",
      fontSize: "1.2rem", // Preserve original casing in buttons
    },
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: "30px", // Rounded button corners
      },
      containedPrimary: {
        color: "#fff", // White text color for primary buttons
      },
    },
    MuiInputBase: {
      input: {
        size: "1.4rem",
      },
      inputPlaceholder: {
        fontSize: "1.4rem",
      },
    },
  },
})

export default theme
