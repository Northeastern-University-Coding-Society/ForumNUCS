import NContainer from "@/components/layout/NContainer";
import Markdown from 'react-markdown'
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import NHeader from "@/components/layout/NHeader";
import {useSession} from "next-auth/react";
import {useUser} from "@/helper/frontend/userProvider";
import axios from "axios";
import Box from "@mui/material/Box";
import {Divider, Fab, Stack} from "@mui/material";
import {useRouter} from "next/router";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import GradeIcon from '@mui/icons-material/Grade';
import {hasSession} from "@/helper/frontend/session-helper";

const Viewer = () => {

    const router = useRouter();
    const {id} = router.query;

    console.log(router);

    const session = useSession();
    const {state: user, dispatch} = useUser();
    const [markdown, setMarkdown] = useState('Type **anything** in the *Markdown* style:');
    const [content, setContent] = useState({});

    const [followed, setFollowed] = useState(false)
    const [liked, setLiked] = useState(false)
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        if (id) {
            axios.get(`/api/post/${id}`)
                .then(res => res.data)
                .then((data) => {
                    setContent(data);
                    setMarkdown(data.content);
                })
                .catch((err) => {
                    console.error(err);
                });
            axios.get(`/api/like/${id}`)
                .then(res => res.data)
                .then((data) => {
                    setLiked(data && data.by);
                })
                .catch((err) => {
                    console.error(err);
                });
            axios.get(`/api/save/${id}`)
                .then(res => res.data)
                .then((data) => {
                    setSaved(data && data.by);
                })
                .catch((err) => {
                    console.error(err);
                });
            axios.post(`/api/view/${id}`)
                .catch((err) => {
                    console.error(err);
                })
        }
    }, [id]);

    // useEffect(() => {
    //     if (id) {
    //         axios.get(`/api/author/${content.authorId}`)
    //             .then(res => res.data)
    //             .then((data) => {
    //                 setContent(data);
    //                 setMarkdown(data.content);
    //             }).catch((err) => {
    //             console.error(err);
    //         })
    //     }
    // }, [content]);

    useEffect(() => {
        if (user.username) {
            axios.post(`/api/follow/find`, {
                from: user.username,
                to: content.authorId
            })
                .then(res => res.data)
                .then((data) => {
                    console.log(data);
                    if (data.follower && data.follower === user.username) {
                        setFollowed(true);
                    } else {
                        setFollowed(false);
                    }
                }).catch((err) => {
                console.error(err);
            })
        }
    }, [content, user]);

    const follow = () => {
        if (content && user.username) {
            axios.post(`/api/follow/${content.authorId}`, {
                from: user.username,
                to: content.authorId
            })
                .then(res => res.data)
                .then((data) => {
                    console.log(data);
                    setFollowed(!followed);
                }).catch((err) => {
                console.error(err);
            })
        }
    }

    const like = () => {
        axios.post(`/api/like/${id}`)
            .then(() => {
                setLiked(!liked);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const save = () => {
        axios.post(`/api/save/${id}`)
            .then(() => {
                setSaved(!saved);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    return <Box width={'100%'} height={'100%'} px={8}>
        <Stack>
            <Typography variant={'h1'}>{content.title}</Typography>
            <Stack flexDirection={'row'} direction={'row'} p={1} pb={0} spacing={4}>
                <Stack flexDirection={'row'} direction={'row'} p={1} pb={0} spacing={4}>
                    <Typography sx={{
                        textDecoration: 'underline',
                        cursor: 'pointer'
                    }}>{`${content.author} ${content && user && content.authorId === user.username ? '(me)' : ''}`}</Typography>
                    <Typography>{new Date(content.date).toLocaleDateString()}</Typography>
                </Stack>
                {!hasSession(session) || (content && user && content.authorId === user.username) ? <></> :
                    followed
                        ? <Button onClick={follow} color={'grey'}>Unfollow</Button>
                        : <Button onClick={follow}>Follow</Button>}
            </Stack>
            <Divider></Divider>
            <Markdown>{markdown}</Markdown>
        </Stack>
        {
            hasSession(session) && (
                <Stack direction={'row'} spacing={2} mt={8}>
                    <Fab color={liked ? 'grey' : 'primary'} size={'large'}
                         aria-label="save"
                         onClick={like}
                    >
                        <ThumbUpIcon/>
                    </Fab>
                    <Fab color={saved ? 'grey' : 'secondary'} size={'large'}
                         aria-label="like"
                         onClick={save}
                    >
                        <GradeIcon/>
                    </Fab>
                    {
                        (content.author && content && user && content.authorId === user.username)
                        && (
                            <Fab color={'secondary'} size={'large'}
                                 aria-label="like"
                                 onClick={() => {
                                     window.location.assign(`/post/edit/${content.uuid}`)
                                 }}
                            >
                                <EditIcon/>
                            </Fab>
                        )
                    }
                </Stack>
            )
        }
    </Box>
}

export default function View() {
    return <NContainer>
        <NHeader/>
        <Viewer/>
    </NContainer>
}