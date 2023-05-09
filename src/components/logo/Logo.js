import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link } from '@mui/material';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR using local (public folder)
  // -------------------------------------------------------
  // const logo = (
  //   <Box
  //     component="img"
  //     src="/logo/logo_single.svg" => your path
  //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
  //   />
  // );

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        // width: 40,
        // height: 40,
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      {/* <svg xmlns="https://th.bing.com/th?id=AMMS_dd6dd9d5bdf01517ec66304ace6b1b5a&w=72&h=72&c=7&rs=1&qlt=80&o=6&cdv=1&dpr=1.5&pid=16.1" width="100%" height="100%" viewBox="0 0 512 512">
        <defs>
          <linearGradient id="BG1" x1="100%" x2="50%" y1="9.946%" y2="50%">
            <stop offset="0%" stopColor={PRIMARY_DARK} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>

          <linearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>

          <linearGradient id="BG3" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
        </defs>

        <g fill={PRIMARY_MAIN} fillRule="evenodd" stroke="none" strokeWidth="1">
          <path
            fill="url(#BG1)"
            d="M183.168 285.573l-2.918 5.298-2.973 5.363-2.846 5.095-2.274 4.043-2.186 3.857-2.506 4.383-1.6 2.774-2.294 3.939-1.099 1.869-1.416 2.388-1.025 1.713-1.317 2.18-.95 1.558-1.514 2.447-.866 1.38-.833 1.312-.802 1.246-.77 1.18-.739 1.111-.935 1.38-.664.956-.425.6-.41.572-.59.8-.376.497-.537.69-.171.214c-10.76 13.37-22.496 23.493-36.93 29.334-30.346 14.262-68.07 14.929-97.202-2.704l72.347-124.682 2.8-1.72c49.257-29.326 73.08 1.117 94.02 40.927z"
          />
          <path
            fill="url(#BG2)"
            d="M444.31 229.726c-46.27-80.956-94.1-157.228-149.043-45.344-7.516 14.384-12.995 42.337-25.267 42.337v-.142c-12.272 0-17.75-27.953-25.265-42.337C189.79 72.356 141.96 148.628 95.69 229.584c-3.483 6.106-6.828 11.932-9.69 16.996 106.038-67.127 97.11 135.667 184 137.278V384c86.891-1.611 77.962-204.405 184-137.28-2.86-5.062-6.206-10.888-9.69-16.994"
          />
          <path
            fill="url(#BG3)"
            d="M450 384c26.509 0 48-21.491 48-48s-21.491-48-48-48-48 21.491-48 48 21.491 48 48 48"
          />
        </g>
      </svg>
       */}
       <img
        // src={`https://th.bing.com/th?id=AMMS_dd6dd9d5bdf01517ec66304ace6b1b5a&w=72&h=72&c=7&rs=1&qlt=80&o=6&cdv=1&dpr=1.5&pid=16.1`}
        src={`data:image/png;base64,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`}
        alt={"Shapiro 360"}
        loading="lazy"
        // style={{borderRadius : "50%"}}
      />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
