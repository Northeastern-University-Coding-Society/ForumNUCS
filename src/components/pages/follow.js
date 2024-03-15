import {Divider, Stack} from "@mui/material";
import {useEffect, useState} from "react";
import {useUser} from "@/helper/frontend/userProvider";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Follower = ({props}) => {

    const user = useUser();
    const target = props.target; // from or to
    const [follows, setFollows] = useState([]);

    useEffect(() => {
        axios.get(`/api/follow/mine?target=${target}`)
            .then(res => res.data)
            .then(data => {
                setFollows(data);
            })
            .catch(() => {

            })
    }, [user, target]);

    if (!user) return <></>

    return <Stack dirction={'column'} spacing={2}>
        <Typography variant={'h2'}>List</Typography>
        {
            follows && follows.map((follow, idx) => {
                return <>
                    <Stack direction={'row'} alignItems={'center'} spacing={2}>
                        <Typography>{follow.name}</Typography>
                        {props.target === 'from' && (
                            <Button color={'grey'}>Unfollow</Button>
                        )}
                    </Stack>
                    <Divider></Divider>
                </>
            })
        }
    </Stack>
}

export default Follower;

// export const Followee = () => {
//
//     const user = useUser();
//
//     useEffect(() => {
//
//     }, []);
//
//     if (!user) return <></>
//
//     return <Stack>
//
//     </Stack>
// }