// import * as React from 'react';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';
// import { Helmet } from 'react-helmet-async';
// // @mui
// import { useState, useEffect } from 'react';
// import { Container, Grid, Stack, Button, Box, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import { useNavigate } from 'react-router-dom';

// // components
// import { useSettingsContext } from '../../components/settings';
// import Iconify from '../../components/iconify';
// // redux
// import { useDispatch, useSelector } from '../../redux/store';
// import { getUser, deleteUser, getUsersAPI, deleteUsersAPI } from '../../redux/slices/users';
// // routes
// import { PATH_DASHBOARD } from '../../routes/paths';

// // ----------------------------------------------------------------------

// export default function CurrentUsersPage() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { themeStretch } = useSettingsContext();
//   const { usersList, usersAPIList, alertMessage } = useSelector((state) => state.user);
//   const [selectedParams, setSelectedParams] = useState(null);
//   const columns = [
//     { field: 'userId', headerName: 'User ID', width: 100 },
//     {
//       field: 'userLogin',
//       headerName: 'User Login',
//       width: 200,
//       editable: true,
//       align: 'left',
//     },
//     {
//       field: 'email',
//       headerName: 'User Email Address',
//       width: 200,
//       editable: true,
//       align: 'left',
//     },
//     {
//       field: 'programsToAccess',
//       headerName: 'Programs To Access',
//       width: 250,
//       editable: true,
//       align: 'left',
//       renderCell: (params) => {
//         const element = (
//           <Box title = {params?.row?.programsToAccess}>
//             {params?.row?.programsToAccess}
//           </Box>
//         );
//         return element;
//       },
//     },
//     {
//       field: 'pomRoles',
//       headerName: 'POM Roles',
//       width: 250,
//       editable: true,
//       align: 'left',
//       renderCell: (params) => {
//         const element = (
//           <Box title = {params?.row?.pomRoles}>
//             {params?.row?.pomRoles}
//           </Box>
//         );
//         return element;
//       },
//     },
//   ];
//   useEffect(() => {
//     dispatch(getUsersAPI());
//   }, []);

//   return (
//     <>
//       <Helmet>
//         <title> Dashboard | Shapiro 360</title>
//       </Helmet>

//       <Container maxWidth={themeStretch ? false : 'xl'}>
//         <Typography variant="h6"> Current Users </Typography>
//         <Box sx={{ height: 400, width: '100%' }}>
//           <DataGrid
//             rows={usersAPIList}
//             columns={columns}
//             initialState={{
//               pagination: {
//                 paginationModel: {
//                   pageSize: 5,
//                 },
//               },
//             }}
//             getRowId={(row) => row?.userId || row?.id}
//             pageSizeOptions={[5]}
//             disableRowSelectionOnClick
//           />
//         </Box>
//       </Container>
//     </>
//   );
// }


// document type page
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Helmet } from 'react-helmet-async';
// @mui
import { useState, useEffect } from 'react';
import { Container, Grid, Stack, Button, Box, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip, TextField, Accordion, AccordionDetails, AccordionSummary, } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// components
import { useSettingsContext } from '../../components/settings';
import Iconify from '../../components/iconify';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { uploadFile, downloadFile, decodeFile, clearInitialState } from '../../redux/slices/uploadFile';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';

// ----------------------------------------------------------------------

export default function GeneralAppImagePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { themeStretch } = useSettingsContext();
    const { docTypeList } = useSelector((state) => state.docList);
    const { base64str, ext, alertMessage } = useSelector((state) => state.uploadFile);
    const [selectedParams, setSelectedParams] = useState(null);
    const [encript, setEncript] = useState(false);
    const [encryptedImageString, setEncryptedImageString] = useState("");
    const [encryptedString, setEncryptedString] = useState("");
    const [decryptedString, setDecryptedString] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [decodebase64, setDecodebase64] = useState("");
    const [decodebase64Type, setDecodebase64Type] = useState("");
    const [decodebase64Path, setDecodebase64Path] = useState("E:/DecodedFiles");

    const columns = [
        { field: 'DocType', headerName: 'Doc Type', width: 100 },
        {
            field: 'Description',
            headerName: 'Description',
            width: 200,
            editable: true,
            align: 'left',
            pinnable: true,
        },
        {
            field: 'Category',
            headerName: 'Category',
            width: 100,
            editable: true,
            align: 'left',
        },
        {
            field: 'System',
            headerName: 'System',
            width: 100,
            editable: true,
            align: 'left',
        },
        {
            field: 'Active',
            headerName: 'Active',
            width: 100,
            editable: true,
            align: 'left',
        },
        {
            field: 'Published',
            headerName: 'Published',
            width: 100,
            editable: true,
            align: 'left',
        },
        {
            field: 'Update',
            headerName: 'Update',
            width: 100,
            editable: true,
            align: 'left',
        },
        {
            field: 'Latest',
            headerName: 'Latest',
            width: 100,
            editable: true,
            align: 'left',
        },
        {
            field: 'Company Specific',
            headerName: 'Company Specific',
            width: 100,
            editable: true,
            align: 'left',
        },
        {
            field: 'Branch',
            headerName: 'Branch',
            width: 100,
            editable: true,
            align: 'left',
        },
        {
            field: 'Department',
            headerName: 'Department',
            width: 100,
            editable: true,
            align: 'left',
        },
        {
            field: 'Created By',
            headerName: 'Created By',
            width: 100,
            editable: true,
            align: 'left',
        },
        {
            field: 'Created Time (UTC)',
            headerName: 'Created Time (UTC)',
            width: 200,
            editable: true,
            align: 'left',
        },
        {
            field: 'Last Edit',
            headerName: 'Last Edit',
            width: 100,
            editable: true,
            align: 'left',
        },
        {
            field: 'Last Edited Time (UTC)',
            headerName: 'Last Edited Time (UTC)',
            width: 200,
            editable: true,
            align: 'left',
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            align: 'left',
            pinnable: true,
            renderCell: (params) => {
                const element = (
                    <>
                        <Stack flexDirection={'row'} alignItems="center">
                            <>
                                <Tooltip title="Encrypt">
                                    <Iconify
                                        icon="mdi:encryption"
                                        sx={{ cursor: 'pointer', mr: 1 }}
                                        onClick={() => {
                                            setOpenDialog(true);
                                            setEncript(true);
                                            setSelectedParams(params);
                                            const encrypedStr = window.btoa(params.row.Description);
                                            console.log(encrypedStr);
                                            setEncryptedString(encrypedStr);
                                        }}
                                    />
                                </Tooltip>
                                <Tooltip title="Decrypt">
                                    <Iconify
                                        icon="mdi:decrypted"
                                        sx={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            setOpenDialog(true);
                                            setEncript(false);
                                            setSelectedParams(params);
                                            if (encryptedString) {
                                                const decrypedStr = window.atob(encryptedString);
                                                console.log(decrypedStr);
                                                setDecryptedString(decrypedStr);
                                            }
                                        }}
                                    />
                                </Tooltip>
                            </>
                        </Stack>
                    </>
                );
                return element;
            },
        },
    ];
    useEffect(() => {
    }, []);
    useEffect(() => {
        dispatch(clearInitialState())
    }, []);
    useEffect(() => {
        if (base64str) {
            setDecodebase64(base64str);
        }
    }, [base64str]);
    useEffect(() => {
        if (ext) {
            setDecodebase64Type(ext);
        }
    }, [ext]);
    useEffect(() => {
        if (alertMessage) {
            const newState = {
                vertical: 'top',
                horizontal: 'center',
            };
            setState({ open: true, ...newState });
            console.log(alertMessage);
        }
    }, [alertMessage]);
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
    // dialog details
    const [openDialog, setOpenDialog] = useState(false);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleCloseWithYesDialog = () => {
        const newState = {
            vertical: 'top',
            horizontal: 'center',
        };
        setState({ open: true, ...newState });
        setOpenDialog(false);
    };
    const encodeImageFileAsURL = (element) => {
        console.log(element.target.files);
        setSelectedFile(element.target.files[0]);
        const formData = new FormData();
        formData.append("name", element.target.files[0].name);
        formData.append("file", element.target.files[0]);
        formData.append("type", element.target.files[0].type);
        const extension = element.target.files[0].type.split('/');
        formData.append("extension", extension[extension.length - 1]);
        formData.append("destination", "E:/shap-doc");
        dispatch(uploadFile(formData));


        // const file = element.target.files[0];
        // const reader = new FileReader();
        // reader.onloadend = function () {
        //     console.log('RESULT', reader.result)
        //     setEncryptedImageString(window.btoa(reader.result));
        // }
        // reader.readAsDataURL(file);

        // const preview = document.querySelector('.preview');
        // while (preview.firstChild) {
        //     preview.removeChild(preview.firstChild);
        // }
    }
    // const Base64ToImage = (base64img, callback) => {
    const Base64ToImage = () => {
        const filename = `${selectedFile.name.split(".")[0]}.json`;
        dispatch(downloadFile(filename));
        // const img = new Image();
        // img.onload = function () {
        //     callback(img);
        // };
        // img.src = base64img;
    }
    const functionToDecode = () => {
        console.log("call for decode", decodebase64, decodebase64Type, decodebase64Path);

        const postobj = {
            decodebase64str: decodebase64,
            filetype: decodebase64Type,
            destinationpath: decodebase64Path,
        };
        dispatch(decodeFile(postobj));
    }
    // for accordions
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <>
            <Helmet>
                <title> Dashboard | Shapiro 360</title>
            </Helmet>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                {/* <Typography variant="h5" sx={{mb:2}}>Encryption and Decryption</Typography> */}
                {/* <Box sx={{ height: 400, width: '100%' }}>
          <DataGridPro
            rows={docTypeList}
            columns={columns}
            // initialState={{
            //   pagination: {
            //     paginationModel: {
            //       pageSize: 5,
            //     },
            //   },
            // }}
            getRowId={(row) => row?.DocType}
            // pageSizeOptions={[5]}
            pagination
            autoHeight
            disableRowSelectionOnClick
            initialState={{ pinnedColumns: { left: ['Description'], right: ['actions'] } }}
          />
        </Box> */}

                {/* accordions */}
                <div>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >

                            <Typography sx={{ color: 'text.secondary' }}>Encode</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ mt: 1 }}>
                                <Stack flexDirection="row" alignItems="center">
                                    <input type="file" onChange={encodeImageFileAsURL} />
                                    {/* <Box>
                            <Button onClick={() => Base64ToImage(window.atob(encryptedImageString), (img) => {
                                document.getElementById('main').appendChild(img);
                            }
                            )
                            }>Click Download encoded JSON</Button>
                            <Box id="main" class="preview" sx={{ mt: 1 }} />
                        </Box> */}
                                    <Box>
                                        <Button onClick={Base64ToImage}>Click to Download encoded JSON</Button>
                                        <Box id="main" className="preview" sx={{ mt: 1 }} />
                                    </Box>
                                </Stack>
                                {/* <Box sx={{ mt: 1, width: "100%", display: "flex", flexWrap: "wrap", alignItems: "center" }}>
                        <Box sx={{ mt: 1, width: "100%", overflowX: "auto" }}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Encrypted Image String"
                                multiline
                                rows={4}
                                fullWidth
                                value={encryptedImageString}
                                sx={{ mt: 1.5 }}
                            />
                        </Box>
                    </Box> */}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <Typography sx={{ color: 'text.secondary' }}>Decode</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ mt: 1 }}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Encrypted String"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    value={decodebase64}
                                    sx={{ mt: 1.5 }}
                                    onChange={(event) => setDecodebase64(event.target.value)}
                                />
                                <Stack flexDirection="row" alignItems="center">
                                    <TextField
                                        id="outlined-multiline-static"
                                        label="File type"
                                        fullWidth
                                        value={decodebase64Type}
                                        sx={{ mt: 1.5, mr: 1.5 }}
                                        onChange={(event) => setDecodebase64Type(event.target.value)}
                                    />
                                    <TextField
                                        id="outlined-multiline-static"
                                        label="Destination Path"
                                        fullWidth
                                        value={decodebase64Path}
                                        sx={{ mt: 1.5 }}
                                        onChange={(event) => setDecodebase64Path(event.target.value)}
                                    />
                                </Stack>

                                <Button onClick={functionToDecode} sx={{ mt: 1.5 }}>Click to Download decoded JSON</Button>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </div>
                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        <Box>
                            {(encript) ? "Encrypted String" : "Decrypted String"} of {(encript) ? selectedParams?.row?.Description : encryptedString}
                        </Box>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {(encript) ? encryptedString : decryptedString}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseWithYesDialog} autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>

                <Snackbar anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={handleClose}
                    key={vertical + horizontal}
                    message={alertMessage}
                    // message={(encript) ? "String Encrypted" : "String Decrypted"}
                    autoHideDuration={1500}
                    action={action}
                />
            </Container >
        </>
    );
}
