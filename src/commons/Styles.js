import {createTheme} from "@mui/material/styles";
import {grey} from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: "#8B4FFB", // A vibrant purple
            light: "#A982FF", // Lighter shade of primary color
            dark: "#6A00D7", // Darker shade of primary color
            contrastText: "#FFFFFF" // Text color for components using primary color
        },
        secondary: {
            main: "#F48FB1", // A soft pink
            light: "#FFC1E3", // Lighter shade of secondary color
            dark: "#BF5F82", // Darker shade of secondary color
            contrastText: "#000000" // Text color for components using secondary color
        },
        grey: {
          main: grey[700]
        },
        error: {
            main: "#f44336", // Red
        },
        warning: {
            main: "#ff9800", // Orange
        },
        info: {
            main: "#2196f3", // Blue
        },
        success: {
            main: "#4caf50", // Green
        },
        background: {
            default: "#121212", // Background color for pages
            paper: "#1A1A1A", // Background color for components, like Card
        },
        text: {
            primary: "#FFFFFF",
            secondary: "#A7A7A7",
            disabled: "#585858",
        },
    },
    typography: {
        fontSize: 14,
        h1: {
            fontSize: "2.25rem", // e.g., 36px
            fontWeight: 900,
            fontFamily: 'TiltNeon'
        },
        h2: {
            fontSize: "2rem", // e.g., 32px,
            fontWeight: 400,
            fontFamily: 'TiltNeon'
        },
        h3: {
            fontSize: "1.75rem", // e.g., 28px
            fontFamily: 'TiltNeon'
        },
        h4: {
            fontSize: "1.5rem", // e.g., 24px
            fontFamily: 'TiltNeon'
        },
        h5: {
            fontSize: "1.25rem", // e.g., 20px
            fontFamily: 'TiltNeon'
        },
        h6: {
            fontSize: "1rem", // e.g., 16px
            fontFamily: 'TiltNeon'
        },
        body1: {
            fontSize: "1rem", // e.g., 16px
            fontFamily: 'TiltNeon'
        },
        body2: {
            fontSize: ".875rem", // e.g., 14px
            fontFamily: 'TiltNeon'
        },
        button: {
            fontSize: ".875rem", // e.g., 14px
            fontFamily: 'TiltNeon',
            textTransform: "none", // Optional: if you want button texts to not be all uppercase by default
        },
    }
});