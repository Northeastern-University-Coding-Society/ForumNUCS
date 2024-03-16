import NHeader from "@/components/layout/NHeader";
import NContainer from "@/components/layout/NContainer";
import {Table, TableCell, TableRow} from "@mui/material";
import Box from "@mui/material/Box";
import {useUser} from "@/helper/frontend/userProvider";
import {useEffect, useState} from "react";
import axios from "axios";
import Button from "@mui/material/Button";

const AllPage = () => {

    const {state: user, dispatch} = useUser();
    const [all, setAll] = useState([]);

    useEffect(() => {
        axios.get('/api/user/all')
            .then(res => res.data)
            .then(data => {
                setAll(data);
            })
            .catch((err) => {

            })
    }, []);

    if (!user || user.username !== 'admin') {
        return <></>
    }

    return <Box px={4}>
        <Table>
            <TableRow>
                <TableCell>First</TableCell>
                <TableCell>Last</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>School</TableCell>
                <TableCell>Campus</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Action</TableCell>
            </TableRow>
            {
                all.map((one, index) => {
                    return <TableRow key={`usr ${index}`}>
                        <TableCell>{one.first}</TableCell>
                        <TableCell>{one.last}</TableCell>
                        <TableCell>{one.email}</TableCell>
                        <TableCell>{one.school ? one.school : 'N/A'}</TableCell>
                        <TableCell>{one.campus ? one.campus : 'N/A'}</TableCell>
                        <TableCell>{one.company ? one.company : 'N/A'}</TableCell>
                        <TableCell><Button onClick={() => {
                            window.location.assign(`/account/adminEdit?username=${one.username}`)
                        }}>Edit</Button></TableCell>
                    </TableRow>
                })
            }
        </Table>
    </Box>
}

export default function All() {
    return <NContainer>
        <NHeader></NHeader>
        <AllPage/>
    </NContainer>
}