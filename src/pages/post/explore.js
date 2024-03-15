import NContainer from "@/components/layout/NContainer";
import NHeader from "@/components/layout/NHeader";
import Box from "@mui/material/Box";
import EditIcon from '@mui/icons-material/Edit';
import {useSession} from "next-auth/react";
import {hasSession} from "@/helper/frontend/session-helper";
import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import {Chip, Fab, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Paper from "@mui/material/Paper";

const ExplorePage = () => {

    const session = useSession();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('/api/post/all')
            .then(res => res.data)
            .then((data) => {
                setPosts(data);
            })
            .catch((err) => {
                console.error(err)
            })
    }, []);

    return <Box flexDirection={'column'} display={'flex'} alignItems={'center'}>
        <Box sx={{height: '70vh'}} flexDirection={'column'} display={'flex'}>
            <Grid container spacing={1} columnGap={1} rowGap={1}>
                {
                    posts.map((post, index) => {
                        return (
                            <Grid key={`post ${index}`} item xs={12} sm={2} minWidth={320}>
                                <Stack component={Paper}>
                                    <Stack p={2} spacing={1}
                                           onClick={() => {
                                               window.location.assign(`/post/${post.uuid}`);
                                           }}
                                           sx={{cursor: 'pointer'}}>
                                        <Typography variant={'h5'} fontWeight={'bold'}>{post.title}</Typography>
                                        <Typography>By: {post.author}</Typography>
                                        <Typography>Created at: {new Date(post.date).toLocaleDateString()}</Typography>
                                        <Typography>{(post.content.length / 200).toFixed(0) <= 1 ? 1 : (post.content.length / 800).toFixed(0)} minute(s)
                                            read</Typography>
                                        {
                                            post.tags && (
                                                <Grid container width={'100%'}>
                                                    {
                                                        post.tags.map((tag, index) => {
                                                            return (
                                                                <Grid item xs={4} width={'100%'}>
                                                                    <Chip label={`${tag}`} key={`chip ${index}`}/>
                                                                </Grid>
                                                            )
                                                        })
                                                    }
                                                </Grid>
                                            )
                                        }
                                    </Stack>
                                </Stack>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Box>
        {
            hasSession(session) && (
                // <Box sx={{width: '100%', display: 'flex', justifyContent: 'end', pr: 4}}>
                //     <NButtonPrimary sx={{pl: 4, pr: 4}} onClick={() => {
                //         window.location.assign('/post/edit');
                //     }}>New Post</NButtonPrimary>
                // </Box>
                <Fab color={'primary'} size={'large'}
                     aria-label="add new post"
                     onClick={() => {
                         window.location.assign('/post/edit');
                     }}
                >
                    <EditIcon/>
                </Fab>
            )
        }
    </Box>
}

export default function Explore() {
    return <NContainer>
        <NHeader/>
        <ExplorePage/>
    </NContainer>
}