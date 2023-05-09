import { m } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Button, Typography } from '@mui/material';

// assets
import { SeverErrorIllustration } from '../assets/illustrations';

// ----------------------------------------------------------------------

export default function Page500() {
  return (
    <>
      <Helmet>
        <title> 500 Internal Server Error | Shapiro 360</title>
      </Helmet>

      <Typography sx={{ color: 'text.secondary' }} sx={{textAlign : "center"}}>
            There was an error, please try again later.
          </Typography>
    </>
  );
}
