import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {MenuItem} from "@mui/material";
import NButtonGrey from "@/components/widgets/NButtonGrey";
import * as React from "react";
import {useEffect, useState} from "react";
import {useFormik} from "formik";
import {UpdateSchema} from "@/models/validations";
import NButtonPrimary from "@/components/widgets/NButtonPrimary";
import {useUser} from "@/helper/frontend/userProvider";
import {CAMPUSES} from "@/commons/Constants";
import axios from "axios";
import {signOut} from "next-auth/react";

export const AccountUpdate = () => {

    const {state: user, dispatch} = useUser();
    const [show, setShow] = useState({pass: false, confPass: false});
    const [error, setError] = useState('');
    const [waiting, setWaiting] = useState(false);

    const isCreatable = () => {
        if (Object.keys(formik.errors).length) {
            console.error(formik.errors);
            return false
        }
        return true;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isCreatable()) {
            console.log('submit')
            const username = user.username;
            axios.put(`/api/user/${username}`, formik.values)
                .then(res => res.data)
                .then(data => {
                    setWaiting(false);
                    if (user.email !== formik.values.email) {
                        // want to update email
                        signOut({
                            callbackUrl: '/account/login'
                        })
                    } else {
                        // normal update
                        dispatch({
                            type: 'UPDATE_USER',
                            payload: formik.values
                        })
                    }
                })
                .catch(err => {
                    console.error(err.response.data);
                    setError(err.response.data.error)
                })
        }
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            first: user ? user.first : "",
            last: user ? user.last : "",
            email: user ? user.email : "",
            school: user ? user.school : "",
            campus: user ? user.campus : "",
            company: user ? user.company : ""
        },
        validationSchema: UpdateSchema,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    useEffect(() => {
        formik.values = {...user}
    }, [user]);

    return <Box
        sx={{
            px: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflowY: 'auto'
        }}
    >
        <Typography component="h1" variant="h5">
            Account Update
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="First Name"
                        id={'first'}
                        value={formik.values.first}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.errors.first !== undefined && formik.touched.first
                        }
                        helperText={
                            formik.errors.first && formik.touched.first
                                ? formik.errors.first
                                : null
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        id="last"
                        label="Last Name"
                        value={formik.values.last}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.errors.last !== undefined && formik.touched.last
                        }
                        helperText={
                            formik.errors.last && formik.touched.last
                                ? formik.errors.last
                                : null
                        }
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="email"
                        label="Email Address"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.errors.email !== undefined && formik.touched.email
                        }
                        helperText={
                            formik.errors.email && formik.touched.email
                                ? formik.errors.email
                                : null
                        }
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography fontStyle={'italic'}>* You may have to login again if you change your email or
                        password</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        select
                        fullWidth
                        label="School"
                        id={'school'}
                        name={'school'}
                        value={formik.values.school ?? ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.errors.school !== undefined && formik.touched.school
                        }
                        helperText={
                            formik.errors.school && formik.touched.school
                                ? formik.errors.school
                                : null
                        }
                    >
                        <MenuItem key={""} value={""}>
                            No Selected
                        </MenuItem>
                        <MenuItem key={'Northeastern University'} value={'Northeastern University'}>Northeastern
                            University</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        select
                        id="campus"
                        label="Campus"
                        name="campus"
                        value={formik.values.campus ?? ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.errors.campus !== undefined && formik.touched.campus
                        }
                        helperText={
                            formik.errors.campus && formik.touched.campus
                                ? formik.errors.campus
                                : null
                        }
                    >
                        <MenuItem key={""} value={""}>
                            No Selected
                        </MenuItem>
                        {
                            CAMPUSES.map((campus, idx) => {
                                return <MenuItem key={campus}
                                                 value={campus}>
                                    {campus}</MenuItem>
                            })
                        }
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="company"
                        label="Company"
                        value={formik.values.company}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.errors.company !== undefined && formik.touched.company
                        }
                        helperText={
                            formik.errors.company && formik.touched.company
                                ? formik.errors.company
                                : null
                        }
                    />
                </Grid>
            </Grid>
            <Box width={'100%'} textAlign={'center'}>{error && <Typography color="error">{error}</Typography>}</Box>
            <NButtonPrimary
                type="submit"
                fullWidth
                variant="contained"
                disabled={waiting || !isCreatable()}
                sx={{mt: 3, mb: 1}}
            >
                Update
            </NButtonPrimary>
            <NButtonGrey
                fullWidth>
                Reset Password
            </NButtonGrey>
        </Box>
    </Box>
}