import {ThemeProvider} from "@mui/material/styles";
import {theme} from "@/commons/Styles";
import CssBaseline from "@mui/material/CssBaseline";
import '../../styles/font.css';

// To fit in the Next.js traditional Page router
const NContainer = ({children}) => {
    return <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
}

export default NContainer;