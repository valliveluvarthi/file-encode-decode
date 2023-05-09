import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
// @mui
import { Container, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
// components
import { useSettingsContext } from '../../../../components/settings';
import TabContent from "./TabContent";
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { clearUser } from '../../../../redux/slices/users';

// ----------------------------------------------------------------------
export default function AddUserContent() {
    const { themeStretch } = useSettingsContext();
    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {
        if (location.pathname.includes("add")) {
            dispatch(clearUser({
                userId: "", userLogin: '',
                confirmPassword: "",
                password: "", email: '',
                firstName: "",
                lastName: "",
                role: "",
                title : "",
                username : "",
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
            }));
        }
    }, [location.pathname]);
    return (
        <>
            <Helmet>
                <title> Add User Content | Shapiro 360</title>
            </Helmet>

            <TabContent />
        </>
    );
}
