import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import NContainer from "@/components/layout/NContainer";
import Copyright from "@/components/widgets/Copyright";
import NSideLayout from "@/components/layout/NSideLayout";
import NButtonPrimary from "@/components/widgets/NButtonPrimary";
import NButtonGrey from "@/components/widgets/NButtonGrey";
import {useFormik} from "formik";
import {LoginSchema, SignupSchema} from "@/models/validations";
import {IconButton} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {useEffect, useState} from "react";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/router";

const SignInSide = () => {

    const session = useSession();
    console.log(session);
    const [show, setShow] = useState({pass: false});
    const [error, setError] = useState('');
    const { query: urlParams } = useRouter();

    useEffect(() => {
        if (session && session.data?.user && session.status === 'authenticated') {
            // authed

        }
    }, [session]);

    useEffect(() => {
        if (urlParams) {
            const error = urlParams.error;
            if (error && error === 'CredentialsSignin') {
                setError('Your email or password is not correct');
            }
        }
    }, [urlParams]);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: LoginSchema,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        signIn('credentials', {
            email: formik.values.email,
            password: formik.values.password,
            callbackUrl: '/account/login'
        })
    };

    return (
        <NSideLayout>
            <Box
                sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                    <TextField
                        margin="normal"
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
                    {/*<FormControlLabel*/}
                    {/*    control={<Checkbox value="remember" color="primary"/>}*/}
                    {/*    label="Remember me"*/}
                    {/*/>*/}
                    <Box width={'100%'} textAlign={'center'}>{error && <Typography color="error">{error}</Typography>}</Box>
                    <NButtonPrimary type={'submit'} fullWidth sx={{
                        mt: 4, mb: 1
                    }}>
                        Sign In
                    </NButtonPrimary>
                    <NButtonGrey fullWidth sx={{
                        mb: 2
                    }} onClick={() => {
                        window.location.assign('/')
                    }}>
                        Back to Main
                    </NButtonGrey>
                    <Grid container>
                        {/*<Grid item xs>*/}
                        {/*    <Link href="#" variant="body2">*/}
                        {/*        Forgot password?*/}
                        {/*    </Link>*/}
                        {/*</Grid>*/}
                        <Grid item xs>
                            <Link href="./register" variant="body2">
                                {"Visit as a Guest"}
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="./register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                    <Copyright sx={{mt: 5}}/>
                </Box>
            </Box>
        </NSideLayout>
    );
}

export default function SignIn() {
    return <NContainer>
        <SignInSide/>
    </NContainer>
}