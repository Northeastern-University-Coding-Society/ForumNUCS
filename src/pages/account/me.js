import NContainer from "@/components/layout/NContainer";
import NHeader from "@/components/layout/NHeader";
import Grid from "@mui/material/Grid";
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarIcon from '@mui/icons-material/Star';
import ArticleIcon from '@mui/icons-material/Article';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HistoryIcon from '@mui/icons-material/History';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PeopleIcon from '@mui/icons-material/People';
import {useState} from "react";
import {AccountUpdate} from "@/components/pages/account";

const features = [
    {
        title: 'Account',
        label: 'account',
        icon: <AccountCircleIcon/>
    }, {
        title: 'Saved',
        label: 'save',
        icon: <BookmarkIcon/>
    }, {
        title: 'Liked',
        label: 'like',
        icon: <StarIcon/>
    }, {
        title: 'My Post',
        label: 'post',
        icon: <ArticleIcon/>
    }, {
        title: 'History',
        label: 'history',
        icon: <HistoryIcon/>
    }, {
        title: 'Followed',
        label: 'follow',
        icon: <PeopleIcon/>
    }, {
        title: 'Follower',
        label: 'follower',
        icon: <PeopleAltIcon/>
    },
];

const MePage = () => {

    const [feature, setFeature] = useState('account');

    const showPanel = () => {
        switch (feature) {
            default:
                return <AccountUpdate/>;
        }
    }

    return <Grid height={'100%'} container>
        <Grid height={'100%'} item sm={3}>
            <Typography ml={2}>Features</Typography>
            <List>
                {
                    features.map((feature, idx) => {
                        return <ListItem key={`feature ${idx}`}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {feature.icon}
                                </ListItemIcon>
                                <ListItemText>
                                    {feature.title}
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    })
                }
            </List>
        </Grid>
        <Grid item sm={9}>
            {showPanel()}
        </Grid>
    </Grid>
}

export default function Me() {
    return <NContainer>
        <NHeader/>
        <MePage/>
    </NContainer>
}