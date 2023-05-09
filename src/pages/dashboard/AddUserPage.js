import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
// @mui
import { Container, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
// components
import { useSettingsContext } from '../../components/settings';
import { AddUserContent } from '../../sections/@dashboard/user/user-content';

// ----------------------------------------------------------------------
export default function AddUserPage() {
  const { themeStretch } = useSettingsContext();
  const location = useLocation();
  useEffect(() => {

  }, []);

  return (
    <>
      <Helmet>
        <title> {(location.pathname.includes("add-user")) ? "Add " : "Edit "} User | Shapiro 360</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h6"> {(location.pathname.includes("add-user")) ? "Add " : "Edit "} User </Typography>
        <AddUserContent />
      </Container>
    </>
  );
}
