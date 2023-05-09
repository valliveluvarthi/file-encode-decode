import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Button } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_AUTH } from '../../../routes/paths';
// auth
import { useAuthContext } from '../../../auth/useAuthContext';
// components
import { CustomAvatar } from '../../../components/custom-avatar';
import SettingsDrawer from '../../../components/settings/drawer/SettingsDrawer';
import MenuPopover from '../../../components/menu-popover';

// ----------------------------------------------------------------------

const OPTIONS = [
  {
    label: 'Home',
    linkTo: '/',
  },
  {
    label: 'Profile',
    linkTo: PATH_DASHBOARD.user.profile,
  },
  {
    label: 'Settings',
    linkTo: PATH_DASHBOARD.user.account,
  },
];
const StyledRoot = styled('div')(({ theme }) => ({

  display: 'flex',

  alignItems: 'center',

  padding: theme.spacing(2, 2.5),

  borderRadius: Number(theme.shape.borderRadius) * 1.5,

  backgroundColor: alpha(theme.palette.grey[500], 0.12),

}));

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();

  const { user, logout } = useAuthContext();



  const [openPopover, setOpenPopover] = useState(false);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleLogout = async () => {
    try {
      logout();
      navigate(PATH_AUTH.login, { replace: true });
      handleClosePopover();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickItem = (path) => {
    handleClosePopover();
    navigate(path);
  };

  return (
    <>
      <StyledRoot

        onClick={handleOpenPopover}

        sx={{

          p: 0,

          bgcolor: "transparent",



          ...(openPopover && {

            '&:before': {

              zIndex: 1,

              content: "''",

              width: '100%',

              height: '100%',

              borderRadius: '50%',

              position: 'absolute',

            },

          }),

        }}

      >
        <CustomAvatar src={user?.photoURL} alt={user?.displayName} name={user?.displayName} />
      </StyledRoot>
      <SettingsDrawer user={user?.displayName} email={user?.email}  open={openPopover} onClose={handleClosePopover} handleLogout={handleLogout} />
    </>
  );
}
