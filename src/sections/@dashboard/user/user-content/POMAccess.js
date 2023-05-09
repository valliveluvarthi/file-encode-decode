import * as React from 'react';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography, Grid, Card, Stack, FormControlLabel, Checkbox, IconButton, Button } from '@mui/material';
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
import FormProvider from '../../../../components/hook-form';
import Iconify from '../../../../components/iconify';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { postUser, updateUser, putUsersAPI, getUsersAPI } from '../../../../redux/slices/users';



// ----------------------------------------------------------------------

const Alert = React.forwardRef((props, ref) => {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function POMAccess() {
    const { themeStretch } = useSettingsContext();
    const dispatch = useDispatch();
    const location = useLocation();
    const { user, usersList, usersAPIList, currentuserId, alertMessage } = useSelector((state) => state.user);
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
        const hasKey = 'pomRoles' in user;
        if (user && Object.keys(user)?.length > 0 && hasKey) {
            setValue("FDVAL", user?.pomRoles?.includes("FDVAL"));
            setValue("POACTION", user?.pomRoles?.includes("POACTION"));
            setValue("POASSIGN", user?.pomRoles?.includes("POASSIGN"));
            setValue("POBOOK", user?.pomRoles?.includes("POBOOK"));
            setValue("POCONSIG", user?.pomRoles?.includes("POCONSIG"));
            setValue("POCONSOL", user?.pomRoles?.includes("POCONSOL"));
            setValue("PODASH", user?.pomRoles?.includes("PODASH"));
            setValue("POINQUIRE", user?.pomRoles?.includes("POINQUIRE"));
            setValue("POINQUIRE_CN", user?.pomRoles?.includes("POINQUIRE_CN"));
            setValue("POTRACK", user?.pomRoles?.includes("POTRACK"));
            setValue("POTRANSIT", user?.pomRoles?.includes("POTRANSIT"));
            setValue("POVENDOR", user?.pomRoles?.includes("POVENDOR"));
        }
        if (user && Object.keys(user)?.length > 0 && !hasKey) {
            setValue("FDVAL", user?.FDVAL);
            setValue("POACTION", user?.POACTION);
            setValue("POASSIGN", user?.POASSIGN);
            setValue("POBOOK", user?.POBOOK);
            setValue("POCONSIG", user?.POCONSIG);
            setValue("POCONSOL", user?.POCONSOL);
            setValue("PODASH", user?.PODASH);
            setValue("POINQUIRE", user?.POINQUIRE);
            setValue("POINQUIRE_CN", user?.POINQUIRE_CN);
            setValue("POTRACK", user?.POTRACK);
            setValue("POTRANSIT", user?.POTRANSIT);
            setValue("POVENDOR", user?.POVENDOR);
        }
    }, [user]);
    useEffect(() => {
        dispatch(getUsersAPI());
    }, []);
    const POMAccessFormSchema = Yup.object().shape({
        FDVAL: Yup.bool(),
        POACTION: Yup.bool(),
        POASSIGN: Yup.bool(),
        POBOOK: Yup.bool(),
        POCONSIG: Yup.bool(),
        POCONSOL: Yup.bool(),
        PODASH: Yup.bool(),
        POINQUIRE: Yup.bool(),
        POINQUIRE_CN: Yup.bool(),
        POTRACK: Yup.bool(),
        POTRANSIT: Yup.bool(),
        POVENDOR: Yup.bool(),
    });
    const defaultValues = {
        FDVAL: false,
        POACTION: false,
        POASSIGN: false,
        POBOOK: false,
        POCONSIG: false,
        POCONSOL: false,
        PODASH: false,
        POINQUIRE: false,
        POINQUIRE_CN: false,
        POTRACK: false,
        POTRANSIT: false,
        POVENDOR: false,
    };
    const methods = useForm({
        resolver: yupResolver(POMAccessFormSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        setValue,
        handleSubmit,
        formState: { isSubmitting, isValid },
        getValues,
    } = methods;

    const values = watch();
    const onSubmit = async (data) => {
        try {
            if (currentuserId) {
                const index = usersAPIList?.findIndex((col) => col.id === currentuserId || col.userId === currentuserId);
                if (index > 0 || index === 0) {
                    const currentObj = { ...usersAPIList[index] };
                    currentObj.FDVAL = data.FDVAL;
                    currentObj.POACTION = data.POACTION;
                    currentObj.POASSIGN = data.POASSIGN;
                    currentObj.POBOOK = data.POBOOK;
                    currentObj.POCONSIG = data.POCONSIG;
                    currentObj.POCONSOL = data.POCONSOL;
                    currentObj.PODASH = data.PODASH;
                    currentObj.POINQUIRE = data.POINQUIRE;
                    currentObj.POINQUIRE_CN = data.POINQUIRE_CN;
                    currentObj.POTRACK = data.POTRACK;
                    currentObj.POTRANSIT = data.POTRANSIT;
                    currentObj.POVENDOR = data.POVENDOR;
                    console.log(currentObj);
                    const keys = Object.keys(data);

                    const filtered = keys.filter((key) => {
                        return data[key]
                    });
                    console.log(filtered);
                    const filteredString = filtered.join(",");
                    // dispatch(updateUser(currentObj));
                    const currentObjAPICopy = { ...usersAPIList[index] };
                    currentObjAPICopy.pomRoles = filteredString;
                    dispatch(updateUser(currentObjAPICopy));
                    dispatch(putUsersAPI(currentuserId, currentObjAPICopy));
                    const newState = {
                        vertical: 'top',
                        horizontal: 'center',
                    };
                    setState({ open: true, ...newState });
                    setTimeout(() => {
                        dispatch(getUsersAPI());
                    }, 3000);
                }
            } else {
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
                <title>POM Access Form Content | Shapiro 360</title>
            </Helmet>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Card sx={{ p: 2 }}>

                    <FormControlLabel control={<Checkbox name="FDVAL" checked={getValues("FDVAL")} onChange={(event) => setValue("FDVAL", event.target.checked)} />} label="Floor & Decor PO Validation" sx={{ display: "block" }} />
                    <FormControlLabel control={<Checkbox name="POACTION" checked={getValues("POACTION")} onChange={(event) => setValue("POACTION", event.target.checked)} />} label="POM PO Actions" sx={{ display: "block" }} />
                    <FormControlLabel control={<Checkbox name="POASSIGN" checked={getValues("POASSIGN")} onChange={(event) => setValue("POASSIGN", event.target.checked)} />} label="POM Track Assignment Rules" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="POBOOK" checked={getValues("POBOOK")} onChange={(event) => setValue("POBOOK", event.target.checked)} />} label="POM Booking" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="POCONSIG" checked={getValues("POCONSIG")} onChange={(event) => setValue("POCONSIG", event.target.checked)} />} label="POM Consignee Maintenance" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="POCONSOL" checked={getValues("POCONSOL")} onChange={(event) => setValue("POCONSOL", event.target.checked)} />} label="POM Consolidations" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="PODASH" checked={getValues("PODASH")} onChange={(event) => setValue("PODASH", event.target.checked)} />} label="POM PO Dashboards" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="POINQUIRE" checked={getValues("POINQUIRE")} onChange={(event) => setValue("POINQUIRE", event.target.checked)} />} label="POM Inquiry" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="POINQUIRE_CN" checked={getValues("POINQUIRE_CN")} onChange={(event) => setValue("POINQUIRE_CN", event.target.checked)} />} label="POM Inquiry CN" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="POTRACK" checked={getValues("POTRACK")} onChange={(event) => setValue("POTRACK", event.target.checked)} />} label="POM Track Maintenance" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="POTRANSIT" checked={getValues("POTRANSIT")} onChange={(event) => setValue("POTRANSIT", event.target.checked)} />} label="POM Transit Time Rules Maintenance" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="POVENDOR" checked={getValues("POVENDOR")} onChange={(event) => setValue("POVENDOR", event.target.checked)} />} label="POM Vendor Maintenance" sx={{ display: "block" }} />

                    <Stack flexDirection={"row"} alignItems={"center"} justifyContent="flex-end" sx={{ mt: 2, mr: "2%" }}>
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
