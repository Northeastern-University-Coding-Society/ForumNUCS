import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {signOut, useSession} from "next-auth/react";
import {hasSession} from "@/helper/frontend/session-helper";
import Image from "next/image";
import {NUCS_ABS} from "@/commons/Static";
import Box from "@mui/material/Box";
import {HEADER_TITLE, SECTIONS} from "@/commons/Constants";

const defaultProps = {sections: SECTIONS, title: HEADER_TITLE};

function Header() {
    const session = useSession();
    const {sections, title} = defaultProps;

    return (
        <React.Fragment>
            <Toolbar sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Box
                    sx={{cursor: 'pointer'}}
                    onClick={() => {
                        window.location.assign('/')
                    }}>
                    <Image src={NUCS_ABS} alt={''} width={64} height={64}/>
                </Box>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{flex: 1}}
                >
                    {title}
                </Typography>
                <IconButton>
                    <SearchIcon/>
                </IconButton>
                {
                    !hasSession(session) ? (
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => {
                                window.location.assign('/account/register')
                            }}>
                            Sign up
                        </Button>
                    ) : (
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => {
                                signOut({callbackUrl: "/account/login"});
                            }}>
                            Sign out
                        </Button>
                    )
                }
            </Toolbar>
            <Toolbar
                component="nav"
                variant="dense"
                sx={{justifyContent: 'space-between', overflowX: 'auto', borderBottom: 1, borderColor: 'divider'}}
            >
                {sections.map((section) => (
                    <Link
                        color="inherit"
                        noWrap
                        key={section.title}
                        variant="body2"
                        href={section.url}
                        sx={{p: 1, flexShrink: 0}}
                    >
                        {section.title}
                    </Link>
                ))}
            </Toolbar>
            <br/>
        </React.Fragment>
    );
}

export default Header;