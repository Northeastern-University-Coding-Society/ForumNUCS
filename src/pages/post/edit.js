import NContainer from "@/components/layout/NContainer";
import Markdown from 'react-markdown'
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {useState} from "react";
import Typography from "@mui/material/Typography";
import NHeader from "@/components/layout/NHeader";
import NButtonPrimary from "@/components/widgets/NButtonPrimary";
import {useSession} from "next-auth/react";

const Editor = () => {

    const session = useSession();
    const [markdown, setMarkdown] = useState('Type **anything** in the *Markdown* style:');

    return <Grid container spacing={1} pl={2} pr={2}>
        <Grid item xs={6}>
            <Typography variant={'h2'} mb={2}>Editor</Typography>
            <TextField multiline fullWidth variant={'outlined'} value={markdown} onChange={(e) => {setMarkdown(e.target.value)}}/>
            <NButtonPrimary sx={{mt: 4}}>Save</NButtonPrimary>
        </Grid>
        <Grid item xs={6}>
            <Typography variant={'h2'} mb={2}>Preview</Typography>
            <Markdown>{markdown}</Markdown>
        </Grid>
    </Grid>
}

export default function Edit() {
    return <NContainer>
        <NHeader/>
        <Editor/>
    </NContainer>
}