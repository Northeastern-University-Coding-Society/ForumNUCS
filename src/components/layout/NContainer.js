import {ThemeProvider} from "@mui/material/styles";
import {theme} from "@/commons/Styles";
import CssBaseline from "@mui/material/CssBaseline";
import '../../styles/font.css';
import {SessionProvider} from "next-auth/react";
import {UserProvider} from "@/helper/frontend/userProvider";

// To fit in the Next.js traditional Page router
const NContainer = ({children}) => {
    return <SessionProvider>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <UserProvider>
                {children}
            </UserProvider>
        </ThemeProvider>
    </SessionProvider>
}

export default NContainer;