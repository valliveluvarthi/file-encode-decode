import * as React from 'react';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography, Grid, Card, Stack, InputAdornment, IconButton, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import { useLocation } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// components
import { useSettingsContext } from '../../../../components/settings';
import FormProvider, {
    RHFTextField,
} from '../../../../components/hook-form';
import Iconify from '../../../../components/iconify';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { postUser, updateUser, postUsersAPI, putUsersAPI, getUsersAPI } from '../../../../redux/slices/users';

// ----------------------------------------------------------------------

const Alert = React.forwardRef((props, ref) => {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function General() {
    const { themeStretch } = useSettingsContext();
    const dispatch = useDispatch();
    const { user, usersList, usersAPIList, currentuserId, alertMessage } = useSelector((state) => state.user);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const location = useLocation();
    const [newPassword, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // snackbar
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setState({ ...state, open: false });
    };

    const action = (
        <>
            {/* <Button color="secondary" size="small" onClick={handleClose}>
            UNDO
          </Button> */}
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <Iconify icon="eva:close-fill" />
            </IconButton>
        </>
    );
    useEffect(() => {
        if (user && Object.keys(user)?.length > 0) {
            setValue("userId", user.userId);
            setValue("email", user.email);
            setValue("password", user.password);
            setValue("confirmPassword", user.confirmPassword);
            setValue("firstName", user.firstName);
            setValue("lastName", user.lastName);
            setValue("role", user.role);
            setValue("userLogin", user.userLogin);
            setValue("title", user.title);
            setValue("username", user.username);
        }
    }, [user]);
    useEffect(() => {
        dispatch(getUsersAPI());
    }, []);
    useEffect(() => {
        if (alertMessage) {
            console.log(alertMessage);
            // const newState = {
            //     vertical: 'top',
            //     horizontal: 'center',
            // };
            // setState({ open: true, ...newState });
        }
    }, [alertMessage]);
    const [showPassswordAlertText, setShowPasswordAlertText] = useState('Please enter a password');
    const WebLoginFormSchema = Yup.object().shape({
        userId: Yup.string().required(),
        email: Yup.string().required(),
        // password: Yup.string(),
        // confirmPassword: Yup.string(),
        password: Yup.string()
            .required('')
            .min(12, '')
            .test('', '', (value, context) => {
                if (
                    /[A-Z]/.test(value) &&
                    /[a-z]/.test(value) &&
                    /[0-9]/.test(value) &&
                    /[!@#%&]/.test(value) &&
                    !/\s/.test(value)
                ) {
                    return true;
                }
                return false;
            }),
        confirmPassword: Yup.string()
            .required('')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        firstName: Yup.string().required(),
        lastName: Yup.string().required(),
        role: Yup.string().required(),
        userLogin: Yup.string().required(),
        title: Yup.string().required(),
        username: Yup.string().required(),
    });

    const defaultValues = {
        userId: "",
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        role: "",
        userLogin: "",
        title: "",
        username: "",
    };
    const methods = useForm({
        resolver: yupResolver(WebLoginFormSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        setValue,
        getValues,
        handleSubmit,
        formState: { isSubmitting, isValid, errors },
        setError,
        clearErrors,
    } = methods;

    const values = watch();
    const onSubmit = async () => {
        try {
            if (currentuserId && location.pathname.includes("edit")) {
                const index = usersAPIList?.findIndex((col) => col.id === currentuserId || col.userId === currentuserId);
                if (index > 0 || index === 0) {
                    const currentObj = { ...usersAPIList[index] };
                    // currentObj.userId = data.userId;
                    // currentObj.email = data.email;
                    // currentObj.firstName = data.firstName;
                    // currentObj.lastName = data.lastName;
                    // currentObj.role = data.role;
                    // currentObj.userLogin = data.userLogin;
                    // currentObj.title = data.title;
                    // currentObj.username = data.username;
                    currentObj.userId = getValues("userId");
                    currentObj.email = getValues("email");
                    currentObj.firstName = getValues("firstName");
                    currentObj.lastName = getValues("lastName");
                    currentObj.role = getValues("role");
                    currentObj.userLogin = getValues("userLogin");
                    currentObj.title = getValues("title");
                    currentObj.username = getValues("username");
                    if (currentObj?.custNoAllowed === null) {
                        currentObj.custNoAllowed = "FDSALES";
                    }
                    if (currentObj?.chargeCustAllowed === null) {
                        currentObj.chargeCustAllowed = "FDSALES";
                    }
                    if (currentObj?.pomRoles === null) {
                        currentObj.pomRoles = "FDVAL";
                    }
                    if (currentObj?.programsToAccess === null) {
                        currentObj.programsToAccess = "AGENTBOOK";
                    }

                    dispatch(updateUser(currentObj));
                    dispatch(putUsersAPI(currentuserId, currentObj));
                    const newState = {
                        vertical: 'top',
                        horizontal: 'center',
                    };
                    setState({ open: true, ...newState });
                    setTimeout(() => {
                        dispatch(getUsersAPI());
                    }, 3000);
                }
            } else if (getValues("password") === getValues("confirmPassword")) {
                clearErrors("confirmPassword");
                clearErrors("password");
                dispatch(postUser({
                    // userId: data.userId,
                    // email: data.email,
                    // password: data.password,
                    // confirmPassword: data.confirmPassword,
                    // firstName: data.firstName,
                    // lastName: data.lastName,
                    // role: data.role,
                    // userLogin: data.userLogin,
                    // title: data.title,
                    // username: data.username,
                    userId: getValues("userId"),
                    email: getValues("email"),
                    password: getValues("password"),
                    confirmPassword: getValues("confirmPassword"),
                    firstName: getValues("firstName"),
                    lastName: getValues("lastName"),
                    role: getValues("role"),
                    userLogin: getValues("userLogin"),
                    title: getValues("title"),
                    username: getValues("username"),
                }));

                dispatch(postUsersAPI({
                    // userId: data.userId,
                    // email: data.email,
                    // password: data.password,
                    // confirmPassword: data.confirmPassword,
                    // firstName: data.firstName,
                    // lastName: data.lastName,
                    // role: data.role,
                    // userLogin: data.userLogin,
                    // title: data.title,
                    // username: data.username,
                    userId: getValues("userId"),
                    email: getValues("email"),
                    password: getValues("password"),
                    confirmPassword: getValues("confirmPassword"),
                    firstName: getValues("firstName"),
                    lastName: getValues("lastName"),
                    role: getValues("role"),
                    userLogin: getValues("userLogin"),
                    title: getValues("title"),
                    username: getValues("username"),
                }))
                const newState = {
                    vertical: 'top',
                    horizontal: 'center',
                };
                setState({ open: true, ...newState });
                setTimeout(() => {
                    dispatch(getUsersAPI());
                }, 3000);
                // if (location.pathname.includes("add")) {
                //     reset();
                // }
            }
            else if (getValues("password") !== getValues("confirmPassword")) {
                setError("confirmPassword", "Password and Confirm Password should match");
                setError("password", "Password and Confirm Password should match");
            }
        } catch (error) {
            setError('afterSubmit', {
                ...error,
                message: error.message,
            });
        }
    };
    const verifyPassword = (pass) => {
        console.log(pass);
        let count = 0;
        count += pass.length >= 12 ? 1 : 0;
        // count += pass.length > 15 ? 0 : 1;
        count += /[a-z]/.test(pass) ? 1 : 0;
        count += /[A-Z]/.test(pass) ? 1 : 0;
        count += /\d/.test(pass) ? 1 : 0;
        count += /[^\w\d\s]/.test(pass) ? 1 : 0;
        count += !/[\s]+/.test(pass) ? 1 : 0;
        count += !/\s/.test(pass) ? 1 : 0;
        if (count === 7) {
            setShowPasswordAlertText('');
            clearErrors('password');
        }
        else if (count !== 7) {
            setShowPasswordAlertText('Please enter a valid password');
        }
    };
    return (
        <>
            <Helmet>
                <title> General Form Content | Shapiro 360</title>
            </Helmet>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Card sx={{ p: 2 }}>
                    {/* {!!errors.confirmPassword && <Alert severity="error">{errors.confirmPassword}</Alert>} */}
                    <Stack flexDirection={"row"} alignItems={"center"}>
                        <Typography variant='normal' sx={{ width: "33.333333%" }}> User ID </Typography>
                        <RHFTextField name="userId" label=""
                            variant="outlined"
                            sx={{
                                borderRadius: '10px',
                                marginBottom: "5px",
                                width: "50%",
                                '& .MuiOutlinedInput-input': {
                                    padding: 1,
                                },
                            }} />
                    </Stack>
                    <Stack flexDirection={"row"} alignItems={"center"}>
                        <Typography variant='normal' sx={{ width: "33.333333%" }}> Username </Typography>
                        <RHFTextField name="username" label=""
                            variant="outlined"
                            sx={{
                                borderRadius: '10px',
                                marginBottom: "5px",
                                width: "50%",
                                '& .MuiOutlinedInput-input': {
                                    padding: 1,
                                },
                            }} />
                    </Stack>
                    <Stack flexDirection={"row"} alignItems={"center"}>
                        <Typography variant='normal' sx={{ width: "33.333333%" }}> Email </Typography>
                        <RHFTextField name="email" label=""
                            variant="outlined"
                            sx={{
                                borderRadius: '10px',
                                marginBottom: "5px",
                                width: "50%",
                                '& .MuiOutlinedInput-input': {
                                    padding: 1,
                                },
                            }} />
                    </Stack>
                    {location.pathname.includes("add") && <>
                        <Stack flexDirection={"row"} alignItems={"center"}>
                            <Typography variant='normal' sx={{ width: "33.333333%" }}> Password </Typography>

                            <RHFTextField
                                name="password"
                                label=""
                                type={showPassword ? 'text' : 'password'}
                                onChange={(event) => {
                                    setValue('password', event.target.value);
                                    setPassword(event.target.value);
                                    verifyPassword(event.target.value);
                                    if (confirmPassword === event.target.value) {
                                        clearErrors('confirmPassword');
                                        clearErrors('password');
                                    }
                                }}
                                sx={{
                                    borderRadius: '10px',
                                    marginBottom: "5px",
                                    width: "50%",
                                    '& .MuiOutlinedInput-input': {
                                        padding: 1,
                                    },
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Stack>
                        <Stack flexDirection={"row"} alignItems={"center"}>
                            <Typography variant='normal' sx={{ width: "33.333333%" }}> Confirm Password </Typography>

                            <RHFTextField
                                name="confirmPassword"
                                label=""
                                type={showConfirmPassword ? 'text' : 'password'}
                                sx={{
                                    borderRadius: '10px',
                                    marginBottom: "5px",
                                    width: "50%",
                                    '& .MuiOutlinedInput-input': {
                                        padding: 1,
                                    },
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                                                <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(event) => {
                                    setConfirmPassword(event.target.value);
                                    setValue('confirmPassword', event.target.value);
                                    if (newPassword === event.target.value) {
                                        clearErrors('confirmPassword');
                                        clearErrors('password');
                                    }
                                }}
                            />
                        </Stack>
                    </>}
                    <Stack flexDirection={"row"} alignItems={"center"}>
                        <Typography variant='normal' sx={{ width: "33.333333%" }}> First Name </Typography>
                        <RHFTextField name="firstName" label=""
                            variant="outlined"
                            sx={{
                                borderRadius: '10px',
                                marginBottom: "5px",
                                width: "50%",
                                '& .MuiOutlinedInput-input': {
                                    padding: 1,
                                },
                            }} />
                    </Stack>
                    <Stack flexDirection={"row"} alignItems={"center"}>
                        <Typography variant='normal' sx={{ width: "33.333333%" }}> Last Name </Typography>
                        <RHFTextField name="lastName" label=""
                            variant="outlined"
                            sx={{
                                borderRadius: '10px',
                                marginBottom: "5px",
                                width: "50%",
                                '& .MuiOutlinedInput-input': {
                                    padding: 1,
                                },
                            }} />
                    </Stack>
                    <Stack flexDirection={"row"} alignItems={"center"}>
                        <Typography variant='normal' sx={{ width: "33.333333%" }}> Role </Typography>
                        <RHFTextField name="role" label=""
                            variant="outlined"
                            sx={{
                                borderRadius: '10px',
                                marginBottom: "5px",
                                width: "50%",
                                '& .MuiOutlinedInput-input': {
                                    padding: 1,
                                },
                            }} />
                    </Stack>
                    <Stack flexDirection={"row"} alignItems={"center"}>
                        <Typography variant='normal' sx={{ width: "33.333333%" }}> User LogIn </Typography>
                        <RHFTextField name="userLogin" label=""
                            variant="outlined"
                            sx={{
                                borderRadius: '10px',
                                marginBottom: "5px",
                                width: "50%",
                                '& .MuiOutlinedInput-input': {
                                    padding: 1,
                                },
                            }} />
                    </Stack>
                    <Stack flexDirection={"row"} alignItems={"center"}>
                        <Typography variant='normal' sx={{ width: "33.333333%" }}> Title </Typography>
                        <RHFTextField name="title" label=""
                            variant="outlined"
                            sx={{
                                borderRadius: '10px',
                                marginBottom: "5px",
                                width: "50%",
                                '& .MuiOutlinedInput-input': {
                                    padding: 1,
                                },
                            }} />
                    </Stack>


                    <Stack flexDirection={"row"} alignItems={"center"} justifyContent="flex-end" sx={{ mt: 2, mr: "16%" }}>
                        <LoadingButton onClick={onSubmit} variant="contained" loading={isSubmitting}>
                            Save
                        </LoadingButton>
                    </Stack>
                </Card>
            </FormProvider>
            <Snackbar anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                key={vertical + horizontal}
                // message={alertMessage}
                message={(location.pathname.includes("edit")) ? "User Updated" : "User Created"}
                autoHideDuration={3500}
                action={action}
            />
        </>
    );
}
