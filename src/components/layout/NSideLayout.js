import Grid from "@mui/material/Grid";
import {NUCS_LARGE} from "@/commons/Static";
import Paper from "@mui/material/Paper";
import * as React from "react";

const NSideLayout = ({children}) => {
    return <Grid container component="main" sx={{height: '100vh'}}>
        <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
                backgroundImage: NUCS_LARGE,
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            {children}
        </Grid>
    </Grid>
}

export default NSideLayout;