import NContainer from "@/components/layout/NContainer";
import NHeader from "@/components/layout/NHeader";
import Grid from "@mui/material/Grid";
import {
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Select,
    Stack
} from "@mui/material";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarIcon from '@mui/icons-material/Star';
import ArticleIcon from '@mui/icons-material/Article';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HistoryIcon from '@mui/icons-material/History';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PeopleIcon from '@mui/icons-material/People';
import {useEffect, useState} from "react";
import {AccountUpdate} from "@/components/pages/account";
import Follower from "@/components/pages/follow";
import MyPost from "@/components/pages/mypost";
import TextField from "@mui/material/TextField";
import axios from "axios";
import NButtonPrimary from "@/components/widgets/NButtonPrimary";
import NButtonGrey from "@/components/widgets/NButtonGrey";

const SearchPage = () => {

    const [filter, setFilter] = useState('title');
    const [search, setSearch] = useState('');
    const [posts, setPosts] = useState('');

    useEffect(() => {
        if (!search) {
            axios.get('/api/post/all')
                .then(res => res.data)
                .then((data) => {
                    setPosts(data);
                })
                .catch((err) => {
                    console.error(err)
                })
        }
    }, [filter, search]);

    const lookForPosts = () => {
        if (!search) {
            if (filter === 'mine') {
                axios.get(`/api/post/search?filter=${filter}`)
                    .then(res => res.data)
                    .then((data) => {
                        setPosts(data);
                    })
                    .catch((err) => {
                        console.error(err)
                    });
            } else {
                axios.get('/api/post/all')
                    .then(res => res.data)
                    .then((data) => {
                        setPosts(data);
                    })
                    .catch((err) => {
                        console.error(err)
                    })
            }
        } else {
            if (filter === 'mine') {
                axios.get(`/api/post/search?filter=${filter}`)
                    .then(res => res.data)
                    .then((data) => {
                        setPosts(data);
                    })
                    .catch((err) => {
                        console.error(err)
                    });
            } else {
                axios.get(`/api/post/search?filter=${filter}&search=${search}`)
                    .then(res => res.data)
                    .then((data) => {
                        setPosts(data);
                    })
                    .catch((err) => {
                        console.error(err)
                    });
            }
        }
    }

    return <Grid height={'100%'} container px={2}>
        <Grid height={'100%'} item sm={3}>
            <Stack spacing={1} pr={4}>
                <Typography variant={'h2'} ml={2}>Search Terms</Typography>
                <Select value={filter}
                        onChange={(e) => {
                            setFilter(e.target.value);
                        }}>
                    <MenuItem key={'title'} value={'title'}>Title</MenuItem>
                    <MenuItem key={'author'} value={'author'}>Author</MenuItem>
                    <MenuItem key={'tags'} value={'tags'}>Tags</MenuItem>
                    <MenuItem key={'mine'} value={'mine'}>My Post</MenuItem>
                </Select>
                <TextField value={search} onChange={e => {
                    setSearch(e.target.value)
                }}/>
                <NButtonPrimary onClick={lookForPosts}>Search</NButtonPrimary>
                <NButtonGrey onClick={() => {
                    setFilter('title');
                    setSearch('');
                }}>Clear</NButtonGrey>
            </Stack>
        </Grid>
        <Grid item sm={9}>
            <Typography variant={'h2'}>Result</Typography>
            <Stack direction={'column'} spacing={2} mt={4}>
                {
                    posts && posts.map((post, idx) => {
                        return <>
                            <Stack
                                sx={{
                                    cursor: 'pointer'
                                }}
                                onClick={() => {
                                    window.location.assign(`/post/${post.uuid}`);
                                }}
                                direction={'row'}
                                alignItems={'center'}
                                justifyContent={'space-between'}
                                spacing={2}>
                                <Typography>{`${post.title}`}</Typography>
                                <Typography>{post.author}</Typography>
                            </Stack>
                            <Divider></Divider>
                        </>
                    })
                }
            </Stack>
        </Grid>
    </Grid>
}

export default function Me() {
    return <NContainer>
        <NHeader/>
        <SearchPage/>
    </NContainer>
}