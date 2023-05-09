// document type page
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Helmet } from 'react-helmet-async';
// @mui
import { useState, useEffect } from 'react';
import { Container, Grid, Stack, Button, Box, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { useNavigate } from 'react-router-dom';

// components
import { useSettingsContext } from '../../components/settings';
import Iconify from '../../components/iconify';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getUser, deleteUser, getUsersAPI, deleteUsersAPI } from '../../redux/slices/users';
import { uploadFile, downloadFile } from '../../redux/slices/uploadFile';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';

// ----------------------------------------------------------------------

export default function GeneralAppFilePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { themeStretch } = useSettingsContext();
    const { docTypeList } = useSelector((state) => state.docList);
    const [selectedParams, setSelectedParams] = useState(null);
    const [encript, setEncript] = useState(false);
    const [encryptedImageString, setEncryptedImageString] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [encryptedString, setEncryptedString] = useState("");
    const [decryptedString, setDecryptedString] = useState("");
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
    const encodeFileAsURL = (element) => {
        console.log(element.target.files);
        const formData = new FormData();
        formData.append("name", element.target.files[0].name);
        formData.append("file", element.target.files[0]);
        formData.append("type", element.target.files[0].type);
        const extension = element.target.files[0].type.split('/');
        formData.append("extension", extension[extension.length - 1]);
        formData.append("destination", "E:/shap-doc");
        dispatch(uploadFile(formData));
        const file = element.target.files[0];
        setSelectedFile(file);
        console.log(file);
        const reader = new FileReader();
        reader.onloadend = function () {
            console.log('RESULT', reader.result)
            setEncryptedImageString(window.btoa(reader.result));
        }
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
        reader.readAsDataURL(file);
    }
    const Base64ToImage = (base64img, callback) => {
        const img = new Image();
        img.onload = function () {
            callback(img);
        };
        img.src = base64img;
    }
    const base64ToFile = (base64FileString) => {
        const filename = `${selectedFile.name.split(".")[0]}.json`;
        dispatch(downloadFile(filename));
        // const linkSource = `${base64FileString}`;
        // console.log(linkSource);
        // const downloadLink = document.createElement('a');
        // document.body.appendChild(downloadLink);

        // downloadLink.href = linkSource;
        // downloadLink.target = '_self';
        // downloadLink.download = selectedFile?.name;
        // downloadLink.click();
        // snack bar
        const newState = {
            vertical: 'top',
            horizontal: 'center',
        };
        setState({ open: true, ...newState });
    }
    return (
        <>
            <Helmet>
                <title> File Dashboard | Shapiro 360</title>
            </Helmet>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Typography variant="h5">Encryption and Decryption of Files</Typography>
                <Box sx={{ mt: 1 }}>
                    <Typography variant='h6'>To Encode</Typography>
                    <input type="file" onChange={encodeFileAsURL} />
                    <Box sx={{ mt: 1, width: "100%", display: "flex", flexWrap: "wrap", alignItems: "center" }}>
                        <Box sx={{ mt: 1, width: "100%", overflowX: "auto" }}>
                        <TextField
                                id="outlined-multiline-static"
                                label="Encrypted File String"
                                multiline
                                rows={4}
                                fullWidth
                                value={encryptedImageString}
                                sx={{mt:1.5}}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ mt: 1 }}>
                    <Typography variant='h6'>To Decode</Typography>
                    {/* <Button onClick={() => Base64ToImage(encryptedImageString, (img) => {
                        document.getElementById('main').appendChild(img);
                    }
                    )
                    }>Decode encoded File</Button> */}
                    <Button onClick={() => base64ToFile(window.atob(encryptedImageString))}>Click Download encoded JSON</Button>
                    <Box id="main" sx={{ mt: 1 }} />
                </Box>
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
                    // message={alertMessage}
                    message={"Decrypted file is downloaded!"}
                    autoHideDuration={1500}
                    action={action}
                />
            </Container >
        </>
    );
}
