import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Helmet } from 'react-helmet-async';
// @mui
import { useState, useEffect } from 'react';
import { Container, Grid, Stack, Button, Box, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
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

export default function CurrentUsersPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { themeStretch } = useSettingsContext();
  const { usersList, usersAPIList, alertMessage } = useSelector((state) => state.user);
  const [selectedParams, setSelectedParams] = useState(null);
  const columns = [
    { field: 'userId', headerName: 'User ID', width: 100 },
    {
      field: 'userLogin',
      headerName: 'User Login',
      width: 200,
      editable: true,
      align: 'left',
    },
    {
      field: 'email',
      headerName: 'User Email Address',
      width: 200,
      editable: true,
      align: 'left',
    },
    {
      field: 'programsToAccess',
      headerName: 'Programs To Access',
      width: 250,
      editable: true,
      align: 'left',
      renderCell: (params) => {
        const element = (
          <Box title={params?.row?.programsToAccess}>
            {params?.row?.programsToAccess}
          </Box>
        );
        return element;
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      align: 'left',
      renderCell: (params) => {
        const element = (
          <>
            <Stack flexDirection={'row'} alignItems="center">
              <>
                <Iconify
                  icon="material-symbols:edit-square-outline"
                  sx={{ cursor: 'pointer', mr: 1 }}
                  onClick={() => {
                    dispatch(getUser(params?.row));
                    navigate(PATH_DASHBOARD.user.editUser);
                  }}
                />
                <Iconify
                  icon="ic:baseline-delete"
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                    setOpenDialog(true);
                    setSelectedParams(params);
                  }}
                />
              </>
            </Stack>
          </>
        );
        return element;
      },
    },
  ];
  useEffect(() => {
    dispatch(getUsersAPI());
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
  useEffect(() => {
    if (alertMessage) {
      // const newState = {
      //   vertical: 'top',
      //   horizontal: 'center',
      // };
      // setState({ open: true, ...newState });
      console.log(alertMessage);
    }
  }, [alertMessage]);
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
    dispatch(deleteUser(selectedParams?.row?.id))
    dispatch(deleteUsersAPI(selectedParams?.row?.id, selectedParams?.row?.auth0Id));
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
        <title> Current Users | Shapiro 360</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h6"> Current Users </Typography>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={usersAPIList}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            getRowId={(row) => row?.userId || row?.id}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </Box>
      </Container>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure, you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
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
        message="User Deleted"
        autoHideDuration={3500}
        action={action}
      />
    </>
  );
}
