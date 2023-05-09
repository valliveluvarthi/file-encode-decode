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

// export default function GeneralAppPage() {
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
// routes
import { PATH_DASHBOARD } from '../../routes/paths';

// ----------------------------------------------------------------------

export default function GeneralAppPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { themeStretch } = useSettingsContext();
  const { docTypeList } = useSelector((state) => state.docList);
  const [selectedParams, setSelectedParams] = useState(null);
  const [encript, setEncript] = useState(false);
  const [encryptTextFieldString, setEncryptTextFieldString] = useState("");
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

  return (
    <>
      <Helmet>
        <title> Logs | Shapiro 360</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        
        <Typography variant="h5">Logs</Typography>
        

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <Box>
              {(encript) ? "Encrypted String" : "Decrypted String"} of {(encript) ? encryptTextFieldString : encryptedString}
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
          message={(encript) ? "String Encrypted" : "String Decrypted"}
          autoHideDuration={1500}
          action={action}
        />
      </Container>
    </>
  );
}
// export default function GeneralAppPage() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { themeStretch } = useSettingsContext();
//   const { docTypeList } = useSelector((state) => state.docList);
//   const [selectedParams, setSelectedParams] = useState(null);
//   const [encript, setEncript] = useState(false);
//   const [encryptTextFieldString, setEncryptTextFieldString] = useState("");
//   const [encryptedString, setEncryptedString] = useState("");
//   const [decryptedString, setDecryptedString] = useState("");
//   const columns = [
//     { field: 'DocType', headerName: 'Doc Type', width: 100 },
//     {
//       field: 'Description',
//       headerName: 'Description',
//       width: 200,
//       editable: true,
//       align: 'left',
//       pinnable: true,
//     },
//     {
//       field: 'Category',
//       headerName: 'Category',
//       width: 100,
//       editable: true,
//       align: 'left',
//     },
//     {
//       field: 'System',
//       headerName: 'System',
//       width: 100,
//       editable: true,
//       align: 'left',
//     },
//     {
//       field: 'Active',
//       headerName: 'Active',
//       width: 100,
//       editable: true,
//       align: 'left',
//     },
//     {
//       field: 'Published',
//       headerName: 'Published',
//       width: 100,
//       editable: true,
//       align: 'left',
//     },
//     {
//       field: 'Update',
//       headerName: 'Update',
//       width: 100,
//       editable: true,
//       align: 'left',
//     },
//     {
//       field: 'Latest',
//       headerName: 'Latest',
//       width: 100,
//       editable: true,
//       align: 'left',
//     },
//     {
//       field: 'Company Specific',
//       headerName: 'Company Specific',
//       width: 100,
//       editable: true,
//       align: 'left',
//     },
//     {
//       field: 'Branch',
//       headerName: 'Branch',
//       width: 100,
//       editable: true,
//       align: 'left',
//     },
//     {
//       field: 'Department',
//       headerName: 'Department',
//       width: 100,
//       editable: true,
//       align: 'left',
//     },
//     {
//       field: 'Created By',
//       headerName: 'Created By',
//       width: 100,
//       editable: true,
//       align: 'left',
//     },
//     {
//       field: 'Created Time (UTC)',
//       headerName: 'Created Time (UTC)',
//       width: 200,
//       editable: true,
//       align: 'left',
//     },
//     {
//       field: 'Last Edit',
//       headerName: 'Last Edit',
//       width: 100,
//       editable: true,
//       align: 'left',
//     },
//     {
//       field: 'Last Edited Time (UTC)',
//       headerName: 'Last Edited Time (UTC)',
//       width: 200,
//       editable: true,
//       align: 'left',
//     },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       width: 150,
//       align: 'left',
//       pinnable: true,
//       renderCell: (params) => {
//         const element = (
//           <>
//             <Stack flexDirection={'row'} alignItems="center">
//               <>
//                 <Tooltip title="Encrypt">
//                   <Iconify
//                     icon="mdi:encryption"
//                     sx={{ cursor: 'pointer', mr: 1 }}
//                     onClick={() => {
//                       setOpenDialog(true);
//                       setEncript(true);
//                       setSelectedParams(params);
//                       const encrypedStr = window.btoa(params.row.Description);
//                       console.log(encrypedStr);
//                       setEncryptedString(encrypedStr);
//                     }}
//                   />
//                 </Tooltip>
//                 <Tooltip title="Decrypt">
//                   <Iconify
//                     icon="mdi:decrypted"
//                     sx={{ cursor: 'pointer' }}
//                     onClick={() => {
//                       setOpenDialog(true);
//                       setEncript(false);
//                       setSelectedParams(params);
//                       if (encryptedString) {
//                         const decrypedStr = window.atob(encryptedString);
//                         console.log(decrypedStr);
//                         setDecryptedString(decrypedStr);
//                       }
//                     }}
//                   />
//                 </Tooltip>
//               </>
//             </Stack>
//           </>
//         );
//         return element;
//       },
//     },
//   ];
//   useEffect(() => {
//   }, []);
//   // snackbar
//   const [state, setState] = React.useState({
//     open: false,
//     vertical: 'top',
//     horizontal: 'center',
//   });
//   const { vertical, horizontal, open } = state;

//   const handleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }

//     setState({ ...state, open: false });
//   };
//   const action = (
//     <>
//       {/* <Button color="secondary" size="small" onClick={handleClose}>
//         UNDO
//       </Button> */}
//       <IconButton
//         size="small"
//         aria-label="close"
//         color="inherit"
//         onClick={handleClose}
//       >
//         <Iconify icon="eva:close-fill" />
//       </IconButton>
//     </>
//   );
//   // dialog details
//   const [openDialog, setOpenDialog] = useState(false);

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };
//   const handleCloseWithYesDialog = () => {
//     const newState = {
//       vertical: 'top',
//       horizontal: 'center',
//     };
//     setState({ open: true, ...newState });
//     setOpenDialog(false);
//   };

//   return (
//     <>
//       <Helmet>
//         <title> Dashboard | Shapiro 360</title>
//       </Helmet>

//       <Container maxWidth={themeStretch ? false : 'xl'}>
//         {/* <Typography variant="h6">Document Types</Typography> */}
//         {/* <Box sx={{ height: 400, width: '100%' }}>
//           <DataGridPro
//             rows={docTypeList}
//             columns={columns}
//             // initialState={{
//             //   pagination: {
//             //     paginationModel: {
//             //       pageSize: 5,
//             //     },
//             //   },
//             // }}
//             getRowId={(row) => row?.DocType}
//             // pageSizeOptions={[5]}
//             pagination
//             autoHeight
//             disableRowSelectionOnClick
//             initialState={{ pinnedColumns: { left: ['Description'], right: ['actions'] } }}
//           />
//         </Box> */}
//         <Typography variant="h5">Encryption and Decryption of Strings</Typography>
//         <Box sx={{ mt: 1 }}>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <TextField
//               id="outlined-multiline-static"
//               label="Encrypted Image String"
//               multiline
//               rows={4}
//               fullWidth
//               onChange={(event) => {
//                 setEncryptTextFieldString(event.target.value);
//                 if (event.target.value === "") {
//                   setEncryptedString("");
//                   setDecryptedString("");
//                 }
//               }}
//               sx={{ mt: 1.5 }}
//             />
//             <Stack flexDirection={'row'} alignItems="center">
//               <>
//                 <Tooltip title="Encrypt">
//                   <Iconify
//                     icon="mdi:encryption"
//                     sx={{ cursor: 'pointer', mr: 1, }}
//                     onClick={() => {
//                       if (encryptTextFieldString) {
//                         setOpenDialog(true);
//                         setEncript(true);
//                         setSelectedParams(encryptTextFieldString);
//                         const encrypedStr = window.btoa(encryptTextFieldString);
//                         console.log(encrypedStr);
//                         setEncryptedString(encrypedStr);
//                       }
//                     }}
//                   />
//                 </Tooltip>
//                 <Tooltip title="Decrypt">
//                   <Iconify
//                     icon="mdi:decrypted"
//                     sx={{ cursor: 'pointer' }}
//                     onClick={() => {
//                       if (encryptedString) {
//                         setOpenDialog(true);
//                         setEncript(false);
//                         setSelectedParams(encryptTextFieldString);
//                         const decrypedStr = window.atob(encryptedString);
//                         console.log(decrypedStr);
//                         setDecryptedString(decrypedStr);
//                       }
//                     }}
//                   />
//                 </Tooltip>
//               </>
//             </Stack>
//           </Box>
//         </Box>

//         <Dialog
//           open={openDialog}
//           onClose={handleCloseDialog}
//           aria-labelledby="alert-dialog-title"
//           aria-describedby="alert-dialog-description"
//         >
//           <DialogTitle id="alert-dialog-title">
//             <Box>
//               {(encript) ? "Encrypted String" : "Decrypted String"} of {(encript) ? encryptTextFieldString : encryptedString}
//             </Box>
//           </DialogTitle>
//           <DialogContent>
//             <DialogContentText id="alert-dialog-description">
//               {(encript) ? encryptedString : decryptedString}
//             </DialogContentText>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCloseWithYesDialog} autoFocus>
//               Yes
//             </Button>
//           </DialogActions>
//         </Dialog>

//         <Snackbar anchorOrigin={{ vertical, horizontal }}
//           open={open}
//           onClose={handleClose}
//           key={vertical + horizontal}
//           // message={alertMessage}
//           message={(encript) ? "String Encrypted" : "String Decrypted"}
//           autoHideDuration={1500}
//           action={action}
//         />
//       </Container>
//     </>
//   );
// }
