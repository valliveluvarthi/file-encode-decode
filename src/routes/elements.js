import { Suspense, lazy } from 'react';
// components
import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

// AUTH
export const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));


// DASHBOARD: GENERAL
export const GeneralAppPage = Loadable(lazy(() => import('../pages/dashboard/GeneralAppPage')));
export const GeneralAppImagePage = Loadable(lazy(() => import('../pages/dashboard/GeneralAppImagePage')));
export const GeneralAppFilePage = Loadable(lazy(() => import('../pages/dashboard/GeneralAppFilePage')));
export const AddUserPage = Loadable(lazy(() => import('../pages/dashboard/AddUserPage')));
export const CurrentUsersPage = Loadable(lazy(() => import('../pages/dashboard/CurrentUsersPage')));
export const CurrentArticlesPage = Loadable(lazy(() => import('../pages/dashboard/CurrentArticlesPage')));
export const AddArticlesPage = Loadable(lazy(() => import('../pages/dashboard/AddArticlesPage')));

// MAIN
export const Page500 = Loadable(lazy(() => import('../pages/Page500')));
export const Page403 = Loadable(lazy(() => import('../pages/Page403')));
export const Page404 = Loadable(lazy(() => import('../pages/Page404')));