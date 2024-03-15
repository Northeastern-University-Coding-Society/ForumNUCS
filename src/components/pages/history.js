import {Divider, Stack} from "@mui/material";
import {useEffect, useState} from "react";
import {useUser} from "@/helper/frontend/userProvider";
import axios from "axios";
import Typography from "@mui/material/Typography";

const History = ({props}) => {

    const user = useUser();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get(`/api/view/mine?target=by`)
            .then(res => res.data)
            .then(data => {
                // Use an object to keep track of seen IDs
                let seen = {};
                // Filter the array to remove duplicates
                let uniqueItems = data.filter((item) => {
                    if (!item.extra || seen.hasOwnProperty(item.uuid)) {
                        return false; // If id is seen, filter out this item
                    } else {
                        seen[item.uuid] = true; // Mark this id as seen
                        return true; // Keep this item in the array
                    }
                });
                setPosts(uniqueItems);
            })
            .catch(() => {

            })
    }, [user]);

    if (!user) return <></>

    return <Stack dirction={'column'} spacing={2}>
        <Typography variant={'h2'}>List</Typography>
        {
            posts && posts.map((post, idx) => {
                if (!post.extra) {
                    return <></>
                }
                return <>
                    <Stack
                        sx={{
                            cursor: 'pointer'
                        }}
                        onClick={() => {
                            window.location.assign(`/post/${post.uuid}`);
                        }}
                        direction={'row'} alignItems={'center'} spacing={2}>
                        <Typography>{post.extra.title}</Typography>
                    </Stack>
                    <Divider></Divider>
                </>
            })
        }
    </Stack>
}

export default History;