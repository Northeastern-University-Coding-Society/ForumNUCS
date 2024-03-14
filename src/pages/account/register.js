import * as React from 'react';
import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Typography from '@mui/material/Typography';
import NSideLayout from "@/components/layout/NSideLayout";
import Copyright from "@/components/widgets/Copyright";
import NContainer from "@/components/layout/NContainer";
import NButtonGrey from "@/components/widgets/NButtonGrey";
import {IconButton} from "@mui/material";
import {useFormik} from "formik";
import {SignupSchema} from "@/models/validations";
import axios from "axios";
import {signIn} from "next-auth/react";

const SignUp = () => {

    const [show, setShow] = useState({pass: false, confPass: false});
    const [error, setError] = useState('');
    const [waiting, setWaiting] = useState(false);

    const formik = useFormik({
        initialValues: {
            first: "",
            last: "",
            email: "",
            password: "",
            confPassword: "",
            school: "",
            campus: "",
            company: ""
        },
        validationSchema: SignupSchema,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const isCreatable = () => {
        if (Object.keys(formik.errors).length) {
            console.error(formik.errors);
            return false
        }
        if (!Object.keys(formik.touched).length) {
            console.log(formik.touched);
            return false;
        }
        return true;
    };

    const handleCreateAccountWithCredentials = async () => {
        return new Promise((resolve, reject) => {
            if (error) setError(null);
            const email = formik.values.email;
            axios.post(`/api/user/${email}`, formik.values)
                .then(res => res.data)
                .then(data => {
                    if (data.hasError) {
                        reject({message: data.error, ...data})
                    } else {
                        resolve({email: formik.values.email, password: formik.values.password});
                    }
                })
                .catch(err => {
                    console.error(err.response.data);
                    reject({...err.response.data});
                })
        })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isCreatable()) {
            handleCreateAccountWithCredentials()
                .then((data) => {
                    // console.log(data);
                    setWaiting(false);
                    signIn('credentials', {
                        email: data.email, password: data.password
                    })
                })
                .catch((err) => {
                    console.error(err);
                    setError(err.message ?? 'error');
                    setWaiting(false);
                })
            setWaiting(true);
        }
    };

    return (
        <NSideLayout props={
            {lockScroll: true}
        }>
            <Box
                sx={{
                    py: 8,
                    px: 4,
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    overflowY: 'auto'
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                required
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
                                required
                                fullWidth
                                id="last"
                                label="Last Name"
                                autoComplete="family-name"
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
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                autoComplete="email"
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
                            <TextField
                                required
                                fullWidth
                                label="Password"
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            size="small"
                                            onClick={() => {
                                                console.log("Toggle Show Pass");
                                                let tempShow = {...show};
                                                tempShow.pass = !show.pass;
                                                setShow(tempShow);
                                            }}
                                        >
                                            {show.pass ? (
                                                <VisibilityOffIcon color="error"/>
                                            ) : (
                                                <VisibilityIcon/>
                                            )}
                                        </IconButton>
                                    ),
                                }}
                                id="password"
                                type={show.pass === true ? "text" : "password"}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.errors.password !== undefined &&
                                    formik.touched.password
                                }
                                helperText={
                                    formik.errors.password && formik.touched.password
                                        ? formik.errors.password
                                        : null
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Confirm Password"
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            size="small"
                                            onClick={() => {
                                                console.log("Toggle Show Pass");
                                                let tempShow = {...show};
                                                tempShow.confPass = !show.confPass;
                                                setShow(tempShow);
                                            }}
                                        >
                                            {show.confPass ? (
                                                <VisibilityOffIcon color="error"/>
                                            ) : (
                                                <VisibilityIcon/>
                                            )}
                                        </IconButton>
                                    ),
                                }}
                                id={'confPassword'}
                                type={show.confPass === true ? "text" : "password"} value={formik.values.confPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.errors.confPassword !== undefined &&
                                    formik.touched.confPassword
                                }
                                helperText={
                                    formik.errors.confPassword && formik.touched.confPassword
                                        ? formik.errors.confPassword
                                        : null
                                }
                            />
                        </Grid>
                        {/*<Grid item xs={12}>*/}
                        {/*    <FormControlLabel*/}
                        {/*        control={<Checkbox value="allowExtraEmails" color="primary"/>}*/}
                        {/*        label="I want to receive inspiration, marketing promotions and updates via email."*/}
                        {/*    />*/}
                        {/*</Grid>*/}
                    </Grid>
                    <Box width={'100%'} textAlign={'center'}>{error && <Typography color="error">{error}</Typography>}</Box>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={waiting || !isCreatable()}
                        sx={{mt: 3, mb: 1}}
                    >
                        Sign Up
                    </Button>
                    <NButtonGrey
                        fullWidth
                        disabled={waiting}
                        sx={{
                            mb: 2
                        }} onClick={() => {
                        window.location.assign('/')
                    }}>
                        Back to Main
                    </NButtonGrey>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/account/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{mt: 5}}/>
        </NSideLayout>
    );
}

export default function Register() {
    return <NContainer>
        <SignUp/>
    </NContainer>
}