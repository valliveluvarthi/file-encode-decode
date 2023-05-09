import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
// components
import { useSettingsContext } from '../../components/settings';
import { AddArticleContent } from '../../sections/@dashboard/articles';
// ----------------------------------------------------------------------
export default function AddArticlesPage() {
  const { themeStretch } = useSettingsContext();
  const location = useLocation();
  return (
    <>
      <Helmet>
        <title> {(location.pathname.includes("add-articles")) ? "Add " : "Edit "} Article | Shapiro 360</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h6"> {(location.pathname.includes("add-articles")) ? "Add " : "Edit "} Article </Typography>
      </Container>
      <AddArticleContent />
    </>
  );
}
