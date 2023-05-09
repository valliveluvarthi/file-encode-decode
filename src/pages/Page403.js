import { m } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Button, Typography, Box } from '@mui/material';

// assets
import { ForbiddenIllustration } from '../assets/illustrations';

// ----------------------------------------------------------------------

export default function Page403() {
  return (
    <>
      <Helmet>
        <title> 403 Forbidden | Shapiro 360</title>
      </Helmet>
      <Box>
        <Typography variant='h5' sx={{ textAlign: "center" }}>
          <Typography sx={{ color: 'text.secondary' }}>
            The page you're trying access has restricted access.
            <br />
            Please refer to your system administrator
          </Typography>
        </Typography>
      </Box>
    </>
  );
}
