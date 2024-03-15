import {Divider, Stack} from "@mui/material";
import {useEffect, useState} from "react";
import {useUser} from "@/helper/frontend/userProvider";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const MyPost = ({props}) => {

    const user = useUser();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get(`/api/post/search?filter=mine`)
            .then(res => res.data)
            .then(data => {
                setPosts(data);
            })
            .catch(() => {

            })
    }, [user]);

    if (!user) return <></>

    return <Stack dirction={'column'} spacing={2}>
        <Typography variant={'h2'}>List</Typography>
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
                        direction={'row'} alignItems={'center'} spacing={2}>
                        <Typography>{post.title}</Typography>
                    </Stack>
                    <Divider></Divider>
                </>
            })
        }
    </Stack>
}

export default MyPost;