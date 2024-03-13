import Grid from "@mui/material/Grid";
import {NUCS_LARGE, NUCS_LARGE_ABS} from "@/commons/Static";
import Paper from "@mui/material/Paper";
import * as React from "react";
import Image from "next/image";

const NSideLayout = ({children, props}) => {

    const lockScroll = props?.lockScroll ? {
        overflowY: 'hidden'
    } : {}

    return <Grid container component="main" sx={{
        height: '100vh',
        ...lockScroll
    }}>
        <Grid
            item
            xs={false}
            sm={4}
            md={7}
            // sx={{
            //     backgroundImage: NUCS_LARGE,
            //     backgroundRepeat: 'no-repeat',
            //     backgroundColor: (t) =>
            //         t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            //     backgroundSize: 'cover',
            //     backgroundPosition: 'center',
            // }}
        >
            <Image
                width={1024}
                height={1024}
                style={{
                    width: '100%',
                    height: 'auto',
                }}
                src={NUCS_LARGE_ABS}
                alt={''}/>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            {children}
        </Grid>
    </Grid>
}

export default NSideLayout;