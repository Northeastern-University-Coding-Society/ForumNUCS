'use client'

import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import '../styles/font.css'
import NSideLayout from "@/components/layout/NSideLayout";
import Copyright from "@/components/widgets/Copyright";
import Box from "@mui/material/Box";
import NButtonPrimary from "@/components/widgets/NButtonPrimary";

export default function Home() {
    return (
        <NSideLayout>
            <Stack height={'80%'} spacing={2} mt={6} display={'flex'} alignItems={'center'}>
                <Box sx={{flexGrow: 1}}/>
                <Typography variant={'h1'}>Welcome to NUCS!</Typography>
                <Typography variant={'h2'}>Northeastern University Coding Society</Typography>
                <Typography variant={'h5'} fontStyle={'italic'}>We help you open the door of programming</Typography>
                <NButtonPrimary fullWidth sx={{width: '80%'}} onClick={() => {window.location.assign('/account/login')}}>Get Started</NButtonPrimary>
                <Typography>to explore!</Typography>
                <Box sx={{flexGrow: 1}}/>
                <Copyright sx={{mt: 5}}/>
            </Stack>
        </NSideLayout>
    )
}
