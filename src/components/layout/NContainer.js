import {ThemeProvider} from "@mui/material/styles";
import {theme} from "@/commons/Styles";
import CssBaseline from "@mui/material/CssBaseline";
import '../../styles/font.css';
import {SessionProvider} from "next-auth/react";
import {UserProvider} from "@/helper/frontend/userProvider";
import Box from "@mui/material/Box";

// To fit in the Next.js traditional Page router
const NContainer = ({children}) => {
    return <SessionProvider>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <UserProvider>
                <Box sx={{width: '100%', height: '100%'}}>
                    {children}
                </Box>
            </UserProvider>
        </ThemeProvider>
    </SessionProvider>
}

export default NContainer;