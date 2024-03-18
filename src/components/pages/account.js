import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {IconButton, MenuItem, Modal, Stack} from "@mui/material";
import NButtonGrey from "@/components/widgets/NButtonGrey";
import * as React from "react";
import {useEffect, useState} from "react";
import {useFormik} from "formik";
import {resetPassSchema, UpdateSchema} from "@/models/validations";
import NButtonPrimary from "@/components/widgets/NButtonPrimary";
import {useUser} from "@/helper/frontend/userProvider";
import {CAMPUSES} from "@/commons/Constants";
import axios from "axios";
import {signOut} from "next-auth/react";
import {modal} from "@/commons/Styles";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";

export const AccountUpdate = () => {

    const {state: user, dispatch} = useUser();
    const [show, setShow] = useState({pass: false, confPass: false});
    const [error, setError] = useState('');
    const [modalError, setModalError] = useState('');
    const [waiting, setWaiting] = useState(false);

    const [controller, setController] = useState(false);

    const isCreatable = () => {
        if (Object.keys(formik.errors).length) {
            console.error(formik.errors);
            return false
        }
        return true;
    };

    const resetPass = (event) => {
        event.preventDefault();
        if (Object.keys(formikReset.errors).length) {
            console.error(formikReset.errors);
            return false
        }
        if (!Object.keys(formikReset.touched).length) {
            console.log(formikReset.touched);
            return false;
        }
        const username = user.username;
        axios.put(`/api/user/${username}`, formikReset.values)
            .then(res => res.data)
            .then(data => {
                setWaiting(false);
                signOut({
                    callbackUrl: '/account/login'
                })
            })
            .catch(err => {
                console.error(err.response.data);
                setModalError(err.response.data.error)
            })
    }

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
                    setError(err.response.data.error);
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

    const formikReset = useFormik({
        enableReinitialize: true,
        initialValues: {
            password: "",
            confPassword: "",
        },
        validationSchema: resetPassSchema,
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
                onClick={() => {
                    setController(true);
                }}
                fullWidth>
                Reset Password
            </NButtonGrey>
        </Box>
        <Modal open={controller} onClose={() => {
            setController(false)
        }}>
            <Stack sx={modal} spacing={1}>
                <Typography variant={'h2'}>Reset Password</Typography>
                <Typography>Note: You need to login again after you changed your pass</Typography>
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
                    value={formikReset.values.password}
                    onChange={formikReset.handleChange}
                    onBlur={formikReset.handleBlur}
                    error={
                        formikReset.errors.password !== undefined &&
                        formikReset.touched.password
                    }
                    helperText={
                        formikReset.errors.password && formikReset.touched.password
                            ? formikReset.errors.password
                            : null
                    }
                />
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
                    type={show.confPass === true ? "text" : "password"} value={formikReset.values.confPassword}
                    onChange={formikReset.handleChange}
                    onBlur={formikReset.handleBlur}
                    error={
                        formikReset.errors.confPassword !== undefined &&
                        formikReset.touched.confPassword
                    }
                    helperText={
                        formikReset.errors.confPassword && formikReset.touched.confPassword
                            ? formikReset.errors.confPassword
                            : null
                    }
                />
                {modalError && <Typography color={'error'}>{modalError}</Typography>}
                <NButtonPrimary type={'button'} onClick={resetPass}>Confirm</NButtonPrimary>
                <NButtonGrey type={'button'} onClick={() => {setController(false)}}>Cancel</NButtonGrey>
            </Stack>
        </Modal>
    </Box>
}