import PropTypes from 'prop-types';
// @mui
import { Typography, Stack, Box } from '@mui/material';
// components
import Logo from '../../components/logo';
//
import { StyledRoot, StyledSectionBg, StyledSection, StyledContent } from './styles';

// ----------------------------------------------------------------------

LoginLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  illustration: PropTypes.string,
};

export default function LoginLayout({ children, illustration, title }) {
  return (
    <StyledRoot>
      <StyledSection>
        <StyledSectionBg />
      </StyledSection>

      <StyledContent>
      <Box
          component="div"
          sx={{
            width: 330,
            height: 80,
            display: 'inline-flex',
          }}
        >
          <img
            src={`https://shapiro360.shapiro.com/templates/rt_metamorph/images/shapiro/Shapiro_360_Logo.png`}
            alt={"Shapiro 360"}
            loading="lazy"
          />
        </Box>
        <Typography variant="h4" sx={{ ml:"-20%" ,mb: 10, maxWidth: 480, textAlign: 'center' }}>
          {title || 'Tech Zombies'}
        </Typography>
        <Stack sx={{ width: 1 }}> {children} </Stack>
      </StyledContent>
    </StyledRoot>
  );
}
