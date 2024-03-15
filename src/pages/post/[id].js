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
import {Chip, Divider, Modal, Stack} from "@mui/material";
import {modal} from "@/commons/Styles";
import {useRouter} from "next/router";

const Viewer = () => {

    const router = useRouter();
    const {id} = router.query;

    console.log(router);

    const session = useSession();
    const {state: user, dispatch} = useUser();
    const [markdown, setMarkdown] = useState('Type **anything** in the *Markdown* style:');
    const [content, setContent] = useState({});

    useEffect(() => {
        if (id) {
            axios.get(`/api/post/${id}`)
                .then(res => res.data)
                .then((data) => {
                    setContent(data);
                    setMarkdown(data.content);
                }).catch((err) => {
                console.error(err);
            })
        }
    }, [id]);

    return <Box width={'100%'} height={'100%'} px={8}>
        <Stack>
            <Typography variant={'h1'}>{content.title}</Typography>
            <Divider></Divider>
            <Markdown>{markdown}</Markdown>
        </Stack>
    </Box>
}

export default function View() {
    return <NContainer>
        <NHeader/>
        <Viewer/>
    </NContainer>
}