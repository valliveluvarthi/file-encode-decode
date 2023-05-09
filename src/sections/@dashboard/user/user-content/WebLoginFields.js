import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography, Grid, Card, Stack, IconButton, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import { useLocation } from 'react-router-dom';
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
import { postUser, updateUser, putUsersAPI, getUsersAPI } from '../../../../redux/slices/users';


// ----------------------------------------------------------------------

const Alert = React.forwardRef((props, ref) => {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function WebLoginFields() {
    const { themeStretch } = useSettingsContext();
    const dispatch = useDispatch();
    const { user, usersList, usersAPIList, currentuserId, alertMessage } = useSelector((state) => state.user);
    const location = useLocation();
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
    useEffect(() => {
        if (alertMessage) {
            // const newState = {
            //     vertical: 'top',
            //     horizontal: 'center',
            // };
            // setState({ open: true, ...newState });
            console.log(alertMessage);
        }
    }, [alertMessage]);
    useEffect(() => {
        if (user && Object.keys(user)?.length > 0) {
            setValue("custNoAllowed", user.custNoAllowed);
            setValue("chargeCustAllowed", user.chargeCustAllowed);
            // setValue("usStatsCustAllowed", user.usStatsCustAllowed);
            // setValue("chargeCust", user.chargeCust);
            // setValue("usExceptionCodes", user.usExceptionCodes);
            // setValue("usPartsCustNo", user.usPartsCustNo);
            // setValue("accountTeamMail", user.accountTeamMail);
            // setValue("usScannedDocsCustNo", user.usScannedDocsCustNo);
            // setValue("exportStatsCustNoAllowed", user.exportStatsCustNoAllowed);
            // setValue("exportBookingTemplateCustNo", user.exportBookingTemplateCustNo);
            // setValue("exportBookingNotifyEmailAddress", user.exportBookingNotifyEmailAddress);
            // setValue("ISFCustNo", user.ISFCustNo);
            // setValue("ISFBranch", user.ISFBranch);
            // setValue("ISFDepartment", user.ISFDepartment);
        }
    }, [user]);
    useEffect(() => {
        dispatch(getUsersAPI());
    }, []);
    const WebLoginFormSchema = Yup.object().shape({
        // usStatsCustAllowed: Yup.string(),
        custNoAllowed: Yup.string(),
        // chargeCust: Yup.string(),
        chargeCustAllowed: Yup.string(),

        // usExceptionCodes: Yup.string(),
        // usPartsCustNo: Yup.string(),
        // accountTeamMail: Yup.string(),
        // usScannedDocsCustNo: Yup.string(),
        // exportStatsCustNoAllowed: Yup.string(),
        // exportBookingTemplateCustNo: Yup.string(),
        // exportBookingNotifyEmailAddress: Yup.string(),
        // ISFCustNo: Yup.string(),
        // ISFBranch: Yup.string(),
        // ISFDepartment: Yup.string(),
    });

    const defaultValues = {
        custNoAllowed: "",
        chargeCustAllowed: "",
        // usStatsCustAllowed: "",
        // chargeCust: "",
        // usExceptionCodes: "",
        // usPartsCustNo: "",
        // accountTeamMail: "",
        // usScannedDocsCustNo: "",
        // exportStatsCustNoAllowed: "",
        // exportBookingTemplateCustNo: "",
        // exportBookingNotifyEmailAddress: "",
        // ISFCustNo: "",
        // ISFBranch: "",
        // ISFDepartment: "",
    };
    const methods = useForm({
        resolver: yupResolver(WebLoginFormSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        setValue,
        handleSubmit,
        formState: { isSubmitting, isValid },
    } = methods;

    const values = watch();
    const onSubmit = async (data) => {
        try {
            if (currentuserId) {
                const index = usersAPIList?.findIndex((col) => col.id === currentuserId || col.userId === currentuserId);
                if (index > 0 || index === 0) {
                    const currentObj = { ...usersAPIList[index] };
                    currentObj.custNoAllowed = data.custNoAllowed;
                    currentObj.chargeCustAllowed = data.chargeCustAllowed;
                    // currentObj.usStatsCustAllowed = data.usStatsCustAllowed;
                    // currentObj.chargeCust = data.chargeCust;
                    // currentObj.usExceptionCodes = data.usExceptionCodes;
                    // currentObj.usPartsCustNo = data.usPartsCustNo;
                    // currentObj.accountTeamMail = data.accountTeamMail;
                    // currentObj.usScannedDocsCustNo = data.usScannedDocsCustNo;
                    // currentObj.exportStatsCustNoAllowed = data.exportStatsCustNoAllowed;
                    // currentObj.exportBookingTemplateCustNo = data.exportBookingTemplateCustNo;
                    // currentObj.exportBookingNotifyEmailAddress = data.exportBookingNotifyEmailAddress;
                    // currentObj.ISFCustNo = data.ISFCustNo;
                    // currentObj.ISFBranch = data.ISFBranch;
                    // currentObj.ISFDepartment = data.ISFDepartment;
                    if (currentObj?.pomRoles === null) {
                        currentObj.pomRoles = "FDVAL";
                    }
                    if (currentObj?.programsToAccess === null) {
                        currentObj.programsToAccess = "AGENTBOOK";
                    }
                    console.log(currentObj);
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
            }
            else {
                alert("Add General Tab Data");
            }
            if (location.pathname.includes("add")) {
                reset();
            }
        } catch (error) {
            console.error(error);
        }
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
    return (
        <>
            <Helmet>
                <title>Web Login Fields Form Content | Shapiro 360</title>
            </Helmet>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Card sx={{ p: 2 }}>
                    <Stack flexDirection={"row"} alignItems={"center"}>
                        <Typography variant='normal' sx={{ width: "33.333333%" }}> US Stats Cust Allowed </Typography>
                        <RHFTextField name="custNoAllowed" label=""
                            variant="outlined"
                            sx={{
                                borderRadius: '10px',
                                marginBottom: "5px",
                                width: "50%",
                                '& .MuiOutlinedInput-input': {
                                    padding: 1,
                                },
                            }}
                        />
                    </Stack>
                    <Stack flexDirection={"row"} alignItems={"center"}>
                        <Typography variant='normal' sx={{ width: "33.333333%" }}> Charge Cust </Typography>
                        <RHFTextField name="chargeCustAllowed" label=""
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
                    {/* <Stack flexDirection={"row"} alignItems={"center"}>
                        <Typography variant='normal' sx={{ width: "33.333333%" }}> US Exception Codes </Typography>
                        <RHFTextField name="usExceptionCodes" label=""
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
                        <Typography variant='normal' sx={{ width: "33.333333%" }}> US Parts Cust No </Typography>
                        <RHFTextField name="usPartsCustNo" label=""
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
                        <Typography variant='normal' sx={{ width: "33.333333%" }}> Account Team Mail </Typography>
                        <RHFTextField name="accountTeamMail" label=""
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
                        <Typography variant='normal' sx={{ width: "33.333333%" }}>  US Scanned Docs Cust No </Typography>
                        <RHFTextField name="usScannedDocsCustNo" label=""
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
                        <Typography variant='normal' sx={{ width: "33.333333%" }}> Export Stats Cust No Allowed </Typography>
                        <RHFTextField name="exportStatsCustNoAllowed" label=""
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
                        <Typography variant='normal' sx={{ width: "33.333333%" }}> Export Booking Template Cust No </Typography>
                        <RHFTextField name="exportBookingTemplateCustNo" label=""
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
                        <Typography variant='normal' sx={{ width: "33.333333%" }}> Export Booking Notify Email Address </Typography>
                        <RHFTextField name="exportBookingNotifyEmailAddress" label=""
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
                        <Typography variant='normal' sx={{ width: "33.333333%" }}> ISF Cust No </Typography>
                        <RHFTextField name="ISFCustNo" label=""
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
                        <Typography variant='normal' sx={{ width: "33.333333%" }}> ISF Branch </Typography>
                        <RHFTextField name="ISFBranch" label=""
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
                        <Typography variant='normal' sx={{ width: "33.333333%" }}> ISF Department </Typography>
                        <RHFTextField name="ISFDepartment" label=""
                            variant="outlined"
                            sx={{
                                borderRadius: '10px',
                                marginBottom: "5px",
                                width: "50%",
                                '& .MuiOutlinedInput-input': {
                                    padding: 1,
                                },
                            }} />
                    </Stack> */}

                    <Stack flexDirection={"row"} alignItems={"center"} justifyContent="flex-end" sx={{ mt: 2, mr: "16%" }}>
                        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
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
                message={(currentuserId) ? "User Updated" : "Try Again"}
                autoHideDuration={3500}
                action={action}
            />
        </>
    );
}
