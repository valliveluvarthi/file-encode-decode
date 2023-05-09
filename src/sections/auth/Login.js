import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Alert, Tooltip, Stack, Typography, Link, Box } from '@mui/material';
// hooks
import { useAuthContext } from '../../auth/useAuthContext';
// routes
import { PATH_AUTH } from '../../routes/paths';
// layouts
import LoginLayout from '../../layouts/login';
//
import AuthLoginForm from './AuthLoginForm';


// ----------------------------------------------------------------------

export default function Login() {
  const { method } = useAuthContext();

  return (
    <LoginLayout>
      {/* <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4" sx={{textAlign : "center"}}>User Sign In</Typography>
      </Stack> */}
      <AuthLoginForm />
    </LoginLayout>
  );
}
