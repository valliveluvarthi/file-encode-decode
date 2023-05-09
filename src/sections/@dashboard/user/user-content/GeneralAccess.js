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

export default function GeneralAccess() {
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
        const hasKey = 'programsToAccess' in user;
        if (user && Object.keys(user)?.length > 0 && hasKey) {
            setValue("AGENTBOOK", user?.programsToAccess?.includes("AGENTBOOK"));
            setValue("AGENTTEMP", user?.programsToAccess?.includes("AGENTTEMP"));
            setValue("AMAZFBA", user?.programsToAccess?.includes("AMAZFBA"));
            setValue("ARSTMT", user?.programsToAccess?.includes("ARSTMT"));
            setValue("BKAPPCN", user?.programsToAccess?.includes("BKAPPCN"));
            setValue("BMM_NEW", user?.programsToAccess?.includes("BMM_NEW"));
            setValue("BOOKACTION", user?.programsToAccess?.includes("BOOKACTION"));
            setValue("BOOKAPP", user?.programsToAccess?.includes("BOOKAPP"));
            setValue("CAM_BULK", user?.programsToAccess?.includes("CAM_BULK"));
            setValue("CLASSAD", user?.programsToAccess?.includes("CLASSAD"));
            setValue("CUSTPROF", user?.programsToAccess?.includes("CUSTPROF"));
            setValue("DASHCNFR", user?.programsToAccess?.includes("DASHCNFR"));
            setValue("DASHCONT", user?.programsToAccess?.includes("DASHCONT"));
            setValue("DASHDOAU", user?.programsToAccess?.includes("DASHDOAU"));
            setValue("DASHMQC", user?.programsToAccess?.includes("DASHMQC"));
            setValue("DASHORDT", user?.programsToAccess?.includes("DASHORDT"));
            setValue("DASHPOM", user?.programsToAccess?.includes("DASHPOM"));
            setValue("DASHSHIP", user?.programsToAccess?.includes("DASHSHIP"));
            setValue("DASHTEST", user?.programsToAccess?.includes("DASHTEST"));
            setValue("DASHTRAN", user?.programsToAccess?.includes("DASHTRAN"));
            setValue("EDASH", user?.programsToAccess?.includes("EDASH"));
            setValue("EXPBOOK", user?.programsToAccess?.includes("EXPBOOK"));
            setValue("EXPLIC", user?.programsToAccess?.includes("EXPLIC"));
            setValue("EXPTEMPL", user?.programsToAccess?.includes("EXPTEMPL"));
            setValue("EXPTRACK", user?.programsToAccess?.includes("EXPTRACK"));
            setValue("IMPPER", user?.programsToAccess?.includes("IMPPER"));
            setValue("ISFPORTAL", user?.programsToAccess?.includes("ISFPORTAL"));
            setValue("ISFTEMPL", user?.programsToAccess?.includes("ISFTEMPL"));
            setValue("IT", user?.programsToAccess?.includes("IT"));
            setValue("IT_CN", user?.programsToAccess?.includes("IT_CN"));
            setValue("LANDCOST", user?.programsToAccess?.includes("LANDCOST"));
            setValue("ONLINEPAY", user?.programsToAccess?.includes("ONLINEPAY"));
            setValue("PARTS", user?.programsToAccess?.includes("PARTS"));
            setValue("QUOTE", user?.programsToAccess?.includes("QUOTE"));
            setValue("REPORT", user?.programsToAccess?.includes("REPORT"));
            setValue("SAILADMIN", user?.programsToAccess?.includes("SAILADMIN"));
            setValue("SELECTSAIL", user?.programsToAccess?.includes("SELECTSAIL"));
            setValue("SHIPTRACK", user?.programsToAccess?.includes("SHIPTRACK"));
            setValue("SNAPSHOT", user?.programsToAccess?.includes("SNAPSHOT"));
            setValue("TRANDASH", user?.programsToAccess?.includes("TRANDASH"));
            setValue("TRUCKPORT", user?.programsToAccess?.includes("TRUCKPORT"));
            setValue("USP", user?.programsToAccess?.includes("USP"));
            setValue("WAREWITH", user?.programsToAccess?.includes("WAREWITH"));
        }
        if (user && Object.keys(user)?.length > 0 && !hasKey) {
            setValue("AGENTBOOK", user?.AGENTBOOK);
            setValue("AGENTTEMP", user?.AGENTTEMP);
            setValue("AMAZFBA", user?.AMAZFBA);
            setValue("ARSTMT", user?.ARSTMT);
            setValue("BKAPPCN", user?.BKAPPCN);
            setValue("BMM_NEW", user?.BMM_NEW);
            setValue("BOOKACTION", user?.BOOKACTION);
            setValue("BOOKAPP", user?.BOOKAPP);
            setValue("CAM_BULK", user?.CAM_BULK);
            setValue("CLASSAD", user?.CLASSAD);
            setValue("CUSTPROF", user?.CUSTPROF);
            setValue("DASHCNFR", user?.DASHCNFR);
            setValue("DASHCONT", user?.DASHCONT);
            setValue("DASHDOAU", user?.DASHDOAU);
            setValue("DASHMQC", user?.DASHMQC);
            setValue("DASHORDT", user?.DASHORDT);
            setValue("DASHPOM", user?.DASHPOM);
            setValue("DASHSHIP", user?.DASHSHIP);
            setValue("DASHTEST", user?.DASHTEST);
            setValue("DASHTRAN", user?.DASHTRAN);
            setValue("EDASH", user?.EDASH);
            setValue("EXPBOOK", user?.EXPBOOK);
            setValue("EXPLIC", user?.EXPLIC);
            setValue("EXPTEMPL", user?.EXPTEMPL);
            setValue("EXPTRACK", user?.EXPTRACK);
            setValue("IMPPER", user?.IMPPER);
            setValue("ISFPORTAL", user?.ISFPORTAL);
            setValue("ISFTEMPL", user?.ISFTEMPL);
            setValue("IT", user?.IT);
            setValue("IT_CN", user?.IT_CN);
            setValue("LANDCOST", user?.LANDCOST);
            setValue("ONLINEPAY", user?.ONLINEPAY);
            setValue("PARTS", user?.PARTS);
            setValue("QUOTE", user?.QUOTE);
            setValue("REPORT", user?.REPORT);
            setValue("SAILADMIN", user?.SAILADMIN);
            setValue("SELECTSAIL", user?.SELECTSAIL);
            setValue("SHIPTRACK", user?.SHIPTRACK);
            setValue("SNAPSHOT", user?.SNAPSHOT);
            setValue("TRANDASH", user?.TRANDASH);
            setValue("TRUCKPORT", user?.TRUCKPORT);
            setValue("USP", user?.USP);
            setValue("WAREWITH", user?.WAREWITH);
        }
    }, [user]);
    useEffect(() => {
        dispatch(getUsersAPI());
    }, []);
    const GeneralAccessFormSchema = Yup.object().shape({
        AGENTBOOK: Yup.bool(),
        AGENTTEMP: Yup.bool(),
        AMAZFBA: Yup.bool(),
        ARSTMT: Yup.bool(),
        BKAPPCN: Yup.bool(),
        BMM_NEW: Yup.bool(),
        BOOKACTION: Yup.bool(),
        BOOKAPP: Yup.bool(),
        CAM_BULK: Yup.bool(),
        CLASSAD: Yup.bool(),
        CUSTPROF: Yup.bool(),
        DASHCNFR: Yup.bool(),
        DASHCONT: Yup.bool(),
        DASHDOAU: Yup.bool(),
        DASHMQC: Yup.bool(),
        DASHORDT: Yup.bool(),
        DASHPOM: Yup.bool(),
        DASHSHIP: Yup.bool(),
        DASHTEST: Yup.bool(),
        DASHTRAN: Yup.bool(),
        EDASH: Yup.bool(),
        EXPBOOK: Yup.bool(),
        EXPLIC: Yup.bool(),
        EXPTEMPL: Yup.bool(),
        EXPTRACK: Yup.bool(),
        IMPPER: Yup.bool(),
        ISFPORTAL: Yup.bool(),
        ISFTEMPL: Yup.bool(),
        IT: Yup.bool(),
        IT_CN: Yup.bool(),
        LANDCOST: Yup.bool(),
        ONLINEPAY: Yup.bool(),
        PARTS: Yup.bool(),
        QUOTE: Yup.bool(),
        REPORT: Yup.bool(),
        SAILADMIN: Yup.bool(),
        SELECTSAIL: Yup.bool(),
        SHIPTRACK: Yup.bool(),
        SNAPSHOT: Yup.bool(),
        TRANDASH: Yup.bool(),
        TRUCKPORT: Yup.bool(),
        USP: Yup.bool(),
        WAREWITH: Yup.bool(),
    });
    const defaultValues = {
        AGENTBOOK: false,
        AGENTTEMP: false,
        AMAZFBA: false,
        ARSTMT: false,
        BKAPPCN: false,
        BMM_NEW: false,
        BOOKACTION: false,
        BOOKAPP: false,
        CAM_BULK: false,
        CLASSAD: false,
        CUSTPROF: false,
        DASHCNFR: false,
        DASHCONT: false,
        DASHDOAU: false,
        DASHMQC: false,
        DASHORDT: false,
        DASHPOM: false,
        DASHSHIP: false,
        DASHTEST: false,
        DASHTRAN: false,
        EDASH: false,
        EXPBOOK: false,
        EXPLIC: false,
        EXPTEMPL: false,
        EXPTRACK: false,
        IMPPER: false,
        ISFPORTAL: false,
        ISFTEMPL: false,
        IT: false,
        IT_CN: false,
        LANDCOST: false,
        ONLINEPAY: false,
        PARTS: false,
        QUOTE: false,
        REPORT: false,
        SAILADMIN: false,
        SELECTSAIL: false,
        SHIPTRACK: false,
        SNAPSHOT: false,
        TRANDASH: false,
        TRUCKPORT: false,
        USP: false,
        WAREWITH: false,
    };
    const methods = useForm({
        resolver: yupResolver(GeneralAccessFormSchema),
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
                    currentObj.AGENTBOOK = data.AGENTBOOK;
                    currentObj.AGENTTEMP = data.AGENTTEMP;
                    currentObj.AMAZFBA = data.AMAZFBA;
                    currentObj.ARSTMT = data.ARSTMT;
                    currentObj.BKAPPCN = data.BKAPPCN;
                    currentObj.BMM_NEW = data.BMM_NEW;
                    currentObj.BOOKACTION = data.BOOKACTION;
                    currentObj.BOOKAPP = data.BOOKAPP;
                    currentObj.CAM_BULK = data.CAM_BULK;
                    currentObj.CLASSAD = data.CLASSAD;
                    currentObj.CUSTPROF = data.CUSTPROF;
                    currentObj.DASHCNFR = data.DASHCNFR;
                    currentObj.DASHCONT = data.DASHCONT;
                    currentObj.DASHDOAU = data.DASHDOAU;
                    currentObj.DASHMQC = data.DASHMQC;
                    currentObj.DASHORDT = data.DASHORDT;
                    currentObj.DASHPOM = data.DASHPOM;
                    currentObj.DASHSHIP = data.DASHSHIP;
                    currentObj.DASHTEST = data.DASHTEST;
                    currentObj.DASHTRAN = data.DASHTRAN;
                    currentObj.EDASH = data.EDASH;
                    currentObj.EXPBOOK = data.EXPBOOK;
                    currentObj.EXPLIC = data.EXPLIC;
                    currentObj.EXPTEMPL = data.EXPTEMPL;
                    currentObj.EXPTRACK = data.EXPTRACK;
                    currentObj.IMPPER = data.IMPPER;
                    currentObj.ISFPORTAL = data.ISFPORTAL;
                    currentObj.ISFTEMPL = data.ISFTEMPL;
                    currentObj.IT = data.IT;
                    currentObj.IT_CN = data.IT_CN;
                    currentObj.LANDCOST = data.LANDCOST;
                    currentObj.ONLINEPAY = data.ONLINEPAY;
                    currentObj.PARTS = data.PARTS;
                    currentObj.QUOTE = data.QUOTE;
                    currentObj.REPORT = data.REPORT;
                    currentObj.SAILADMIN = data.SAILADMIN;
                    currentObj.SELECTSAIL = data.SELECTSAIL;
                    currentObj.SHIPTRACK = data.SHIPTRACK;
                    currentObj.SNAPSHOT = data.SNAPSHOT;
                    currentObj.TRANDASH = data.TRANDASH;
                    currentObj.TRUCKPORT = data.TRUCKPORT;
                    currentObj.USP = data.USP;
                    currentObj.WAREWITH = data.WAREWITH;
                    console.log(currentObj);
                    const keys = Object.keys(data);

                    const filtered = keys.filter((key) => {
                        return data[key]
                    });
                    console.log(filtered);
                    const filteredString = filtered.join(",");

                    const currentObjAPICopy = { ...usersAPIList[index] };
                    currentObjAPICopy.programsToAccess = filteredString;
                    if (currentObjAPICopy === null) {
                        currentObjAPICopy.pomRoles = "FDVAL";
                    }
                    // dispatch(updateUser(currentObj));
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
                <title> General Access Form Content | Shapiro 360</title>
            </Helmet>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Card sx={{ p: 2 }}>

                    <FormControlLabel control={<Checkbox name="AGENTBOOK" checked={getValues("AGENTBOOK")} onChange={(event) => setValue("AGENTBOOK", event.target.checked)} />} label="Agent Booking" sx={{ display: "block" }} />
                    <FormControlLabel control={<Checkbox name="AGENTTEMP" checked={getValues("AGENTTEMP")} onChange={(event) => setValue("AGENTTEMP", event.target.checked)} />} label="Agent Booking Templates" sx={{ display: "block" }} />
                    <FormControlLabel control={<Checkbox name="AMAZFBA" checked={getValues("AMAZFBA")} onChange={(event) => setValue("AMAZFBA", event.target.checked)} />} label="Amazon FBA Tracking" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="ARSTMT" checked={getValues("ARSTMT")} onChange={(event) => setValue("ARSTMT", event.target.checked)} />} label=" A/R Statements " sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="BKAPPCN" checked={getValues("BKAPPCN")} onChange={(event) => setValue("BKAPPCN", event.target.checked)} />} label=" Booking Managment China " sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="BMM_NEW" checked={getValues("BMM_NEW")} onChange={(event) => setValue("BMM_NEW", event.target.checked)} />} label=" Booking Management " sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="BOOKACTION" checked={getValues("BOOKACTION")} onChange={(event) => setValue("BOOKACTION", event.target.checked)} />} label=" POM Booking Actions " sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="BOOKAPP" checked={getValues("BOOKAPP")} onChange={(event) => setValue("BOOKAPP", event.target.checked)} />} label=" Booking Managment " sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="CAM_BULK" checked={getValues("CAM_BULK")} onChange={(event) => setValue("CAM_BULK", event.target.checked)} />} label=" Bulk CAM Request Uploader " sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="CLASSAD" checked={getValues("CLASSAD")} onChange={(event) => setValue("CLASSAD", event.target.checked)} />} label=" Classification Advisory " sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="CUSTPROF" checked={getValues("CUSTPROF")} onChange={(event) => setValue("CUSTPROF", event.target.checked)} />} label=" Customer Profile " sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="DASHCNFR" checked={getValues("DASHCNFR")} onChange={(event) => setValue("DASHCNFR", event.target.checked)} />} label=" Dashboard - Container Forecast " sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="DASHCONT" checked={getValues("DASHCONT")} onChange={(event) => setValue("DASHCONT", event.target.checked)} />} label=" Dashboard Container" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="DASHDOAU" checked={getValues("DASHDOAU")} onChange={(event) => setValue("DASHDOAU", event.target.checked)} />} label=" Dashboard - Document Audit" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="DASHMQC" checked={getValues("DASHMQC")} onChange={(event) => setValue("DASHMQC", event.target.checked)} />} label=" Dashboard - MQC" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="DASHORDT" checked={getValues("DASHORDT")} onChange={(event) => setValue("DASHORDT", event.target.checked)} />} label=" Dashboard - Origin/Destination" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="DASHPOM" checked={getValues("DASHPOM")} onChange={(event) => setValue("DASHPOM", event.target.checked)} />} label=" Dashboard - POM" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="DASHSHIP" checked={getValues("DASHSHIP")} onChange={(event) => setValue("DASHSHIP", event.target.checked)} />} label=" Shipment Dashboards" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="DASHTEST" checked={getValues("DASHTEST")} onChange={(event) => setValue("DASHTEST", event.target.checked)} />} label=" Dashboard Test" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="DASHTRAN" checked={getValues("DASHTRAN")} onChange={(event) => setValue("DASHTRAN", event.target.checked)} />} label=" Transit Time Dashboard" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="EDASH" checked={getValues("EDASH")} onChange={(event) => setValue("EDASH", event.target.checked)} />} label=" Entry Dashboards" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="EXPBOOK" checked={getValues("EXPBOOK")} onChange={(event) => setValue("EXPBOOK", event.target.checked)} />} label=" Export Booking" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="EXPLIC" checked={getValues("EXPLIC")} onChange={(event) => setValue("EXPLIC", event.target.checked)} />} label=" Export License Tracking" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="EXPTEMPL" checked={getValues("EXPTEMPL")} onChange={(event) => setValue("EXPTEMPL", event.target.checked)} />} label=" Export Templates" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="EXPTRACK" checked={getValues("EXPTRACK")} onChange={(event) => setValue("EXPTRACK", event.target.checked)} />} label=" Export Tracking" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="IMPPER" checked={getValues("IMPPER")} onChange={(event) => setValue("IMPPER", event.target.checked)} />} label=" Import Permit Tracking" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="ISFPORTAL" checked={getValues("ISFPORTAL")} onChange={(event) => setValue("ISFPORTAL", event.target.checked)} />} label=" ISF Filing Portal" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="ISFTEMPL" checked={getValues("ISFTEMPL")} onChange={(event) => setValue("ISFTEMPL", event.target.checked)} />} label=" ISF Templates" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="IT" checked={getValues("IT")} onChange={(event) => setValue("IT", event.target.checked)} />} label=" Import Tracking" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="IT_CN" checked={getValues("IT_CN")} onChange={(event) => setValue("IT_CN", event.target.checked)} />} label=" Import Tracking CN" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="LANDCOST" checked={getValues("LANDCOST")} onChange={(event) => setValue("LANDCOST", event.target.checked)} />} label=" Landed Cost" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="ONLINEPAY" checked={getValues("ONLINEPAY")} onChange={(event) => setValue("ONLINEPAY", event.target.checked)} />} label=" On-Line Payment" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="PARTS" checked={getValues("PARTS")} onChange={(event) => setValue("PARTS", event.target.checked)} />} label=" Parts Table" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="QUOTE" checked={getValues("QUOTE")} onChange={(event) => setValue("QUOTE", event.target.checked)} />} label=" Quote Book" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="REPORT" checked={getValues("REPORT")} onChange={(event) => setValue("REPORT", event.target.checked)} />} label=" Reports" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="SAILADMIN" checked={getValues("SAILADMIN")} onChange={(event) => setValue("SAILADMIN", event.target.checked)} />} label=" Sailing Schedule Maintenace" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="SELECTSAIL" checked={getValues("SELECTSAIL")} onChange={(event) => setValue("SELECTSAIL", event.target.checked)} />} label=" Select Sail Schedule " sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="SHIPTRACK" checked={getValues("SHIPTRACK")} onChange={(event) => setValue("SHIPTRACK", event.target.checked)} />} label=" Shipment Tracking" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="SNAPSHOT" checked={getValues("SNAPSHOT")} onChange={(event) => setValue("SNAPSHOT", event.target.checked)} />} label=" Snapshot" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="TRANDASH" checked={getValues("TRANDASH")} onChange={(event) => setValue("TRANDASH", event.target.checked)} />} label=" Transportation Dashboards" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="TRUCKPORT" checked={getValues("TRUCKPORT")} onChange={(event) => setValue("TRUCKPORT", event.target.checked)} />} label=" Trucker Portal" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="USP" checked={getValues("USP")} onChange={(event) => setValue("USP", event.target.checked)} />} label=" Parts Table" sx={{ display: "block" }} />

                    <FormControlLabel control={<Checkbox name="WAREWITH" checked={getValues("WAREWITH")} onChange={(event) => setValue("WAREWITH", event.target.checked)} />} label=" Warehouse Withdrawals" sx={{ display: "block" }} />



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
                // message = {alertMessage}
                message={(currentuserId) ? "User Updated" : "Try Again"}
                autoHideDuration={3500}
                action={action}
            />
        </>
    );
}
