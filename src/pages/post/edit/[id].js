import NContainer from "@/components/layout/NContainer";
import Markdown from 'react-markdown'
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import NHeader from "@/components/layout/NHeader";
import NButtonPrimary from "@/components/widgets/NButtonPrimary";
import {useSession} from "next-auth/react";
import NButtonGrey from "@/components/widgets/NButtonGrey";
import {useUser} from "@/helper/frontend/userProvider";
import axios from "axios";
import Box from "@mui/material/Box";
import {Chip, Modal, Stack} from "@mui/material";
import {modal} from "@/commons/Styles";
import {useRouter} from "next/router";

const Editor = () => {

    const session = useSession();
    const router = useRouter();
    const {id} = router.query;
    const {state: user, dispatch} = useUser();
    const [markdown, setMarkdown] = useState('Type **anything** in the *Markdown* style:');

    const [controller, setController] = useState(false);
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState([]);
    const [ctag, setCTag] = useState(''); // current tag to add

    const savePost = () => {
        setController(true);
    }

    const savePostToServer = () => {
        setController(false);
        axios.put(`/api/post/${id}`, {
            title,
            tags,
            content: markdown
        }).then(() => {
            window.location.assign('/post/explore');
        }).catch(() => {
            window.alert('save failed');
        })
    }

    useEffect(() => {
        if (id) {
            axios.get(`/api/post/${id}`)
                .then(res => res.data)
                .then((data) => {
                    // setContent(data);
                    setMarkdown(data.content);
                    setTitle(data.title);
                    setTags(data.tags);
                }).catch((err) => {
                console.error(err);
            })
        }
    }, [id]);

    return <Box>
        <Grid container spacing={1} pl={2} pr={2}>
            <Grid item xs={6}>
                <Typography variant={'h2'} mb={2}>Editor</Typography>
                <TextField multiline fullWidth variant={'outlined'} value={markdown} onChange={(e) => {
                    setMarkdown(e.target.value)
                }}/>
                <NButtonPrimary sx={{mt: 4}}
                                onClick={savePost}
                >Save</NButtonPrimary>
                <NButtonGrey sx={{ml: 2, mt: 4}}
                             onClick={() => {
                                 window.location.assign('/post/explore')
                             }}
                >Back</NButtonGrey>
            </Grid>
            <Grid item xs={6}>
                <Typography variant={'h2'} mb={2}>Preview</Typography>
                <Markdown>{markdown}</Markdown>
            </Grid>
        </Grid>
        <Modal open={controller} onClose={() => {
            setController(false)
        }}>
            <Stack sx={modal} spacing={1}>
                <Typography variant={'h2'}>Some more info...</Typography>
                <Typography>Give your post a title</Typography>
                <TextField maxLength={64} value={title} onChange={(e) => {
                    setTitle(e.target.value)
                }}/>
                <Typography>Tag your post</Typography>
                <Grid container display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                    <Grid item xs={8}>
                        <TextField maxLength={16} value={ctag} onChange={(e) => {
                            setCTag(e.target.value)
                        }}/>
                    </Grid>
                    <Grid item xs={4} pl={1} display={'flex'} alignItems={'center'}>
                        <NButtonPrimary fullWidth onClick={() => {
                            setTags((tags) => {
                                return [...tags, ctag]
                            })
                        }}>Add One</NButtonPrimary>
                    </Grid>
                </Grid>
                <Stack flaxWrap flexDirection={'row'}>
                    {
                        tags.map((tag, index) => {
                            return <Chip label={tag} key={`chip ${index}`} onDelete={() => {
                                setTags((tags) => {
                                    return tags.filter(thatTag => thatTag !== tag);
                                })
                            }}/>
                        })
                    }
                </Stack>
                <NButtonPrimary onClick={() => {
                    savePostToServer();
                }}>Save</NButtonPrimary>
                <NButtonGrey onClick={() => {
                    setController(false)
                }}>Cancel</NButtonGrey>
            </Stack>
        </Modal>
    </Box>
}

export default function Edit() {
    return <NContainer>
        <NHeader/>
        <Editor/>
    </NContainer>
}