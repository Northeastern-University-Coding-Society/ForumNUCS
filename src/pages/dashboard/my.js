import NContainer from "@/components/layout/NContainer";
import NHeader from "@/components/layout/NHeader";
import {Stack} from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import axios from "axios";
import {useUser} from "@/helper/frontend/userProvider";

const DashboardCard = ({props}) => {
    return <Stack component={Paper} p={2} spacing={4} textAlign={'center'}>
        <Typography variant={'h3'}>{props.title}</Typography>
        <Typography variant={'h3'} fontWeight={'bold'}>{props.value}</Typography>
    </Stack>
}

const Dashboard = () => {

    const [posts, setPosts] = useState();
    const [follows, setFollows] = useState();
    const [views, setViews] = useState();
    const [likes, setLikes] = useState();
    const [saves, setSaves] = useState();

    const user = useUser();

    // useEffect(() => {
    // }, [user]);

    useEffect(() => {
        axios.get(`/api/follow/mine?target=to`)
            .then(res => res.data)
            .then(data => {
                setFollows(data);
            })
            .catch(() => {

            })
        axios.get(`/api/view/mine`)
            .then(res => res.data)
            .then(data => {
                setViews(data);
            })
            .catch(() => {

            })
        axios.get(`/api/save/mine`)
            .then(res => res.data)
            .then(data => {
                setSaves(data);
            })
            .catch(() => {

            })
        axios.get(`/api/like/mine`)
            .then(res => res.data)
            .then(data => {
                setLikes(data);
            })
            .catch(() => {

            })
        axios.get(`/api/post/search?filter=mine`)
            .then(res => res.data)
            .then((data) => {
                setPosts(data);
            })
            .catch((err) => {
                console.error(err)
            });
    }, []);

    return <Grid container p={4} rowGap={2} columnGap={2} flexDirection={'row'}>
        {
            posts && (
                <Grid item xs={'auto'}>
                    <DashboardCard props={{title: 'Num of Posts', value: posts.length}}/>
                </Grid>
            )
        }
        {!!views && (
            <Grid item xs={'auto'}>
                <DashboardCard props={{title: 'Posts Viewed', value: views.count}}/>
            </Grid>
        )}
        {
            likes && (
                <Grid item xs={'auto'}>
                    <DashboardCard props={{title: 'Posts Liked', value: likes.count}}/>
                </Grid>
            )
        }
        {
            saves && (
                <Grid item xs={'auto'}>
                    <DashboardCard props={{title: 'Posts Saved', value: saves.count}}/>
                </Grid>
            )
        }
        {
            follows && (
                <Grid item xs={'auto'}>
                    <DashboardCard props={{title: 'Followers', value: follows.length}}/>
                </Grid>
            )
        }
    </Grid>
}

export default function MyDashboard() {
    return <NContainer>
        <NHeader/>
        <Dashboard/>
    </NContainer>
}