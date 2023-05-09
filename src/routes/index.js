import { Navigate, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import MainLayout from '../layouts/main';
import SimpleLayout from '../layouts/simple';
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config';
//
import {
  // Auth
  LoginPage,
  GeneralAppPage,
  GeneralAppImagePage,
  GeneralAppFilePage,
  Page500,
  Page403,
  Page404,
  //  user routes
  AddUserPage,
  CurrentUsersPage,
  // articles routes
  CurrentArticlesPage,
  AddArticlesPage,
} from './elements';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // Auth
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            // <GuestGuard>
              <LoginPage />
            // </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <LoginPage /> },
      ],
    },

    // Dashboard
    {
      path: 'dashboard',
      element: (
        // <AuthGuard>
          <DashboardLayout />
        // </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'app', element: <GeneralAppPage /> },
        { path: 'encode-decode', element: <GeneralAppImagePage /> },
        { path: 'file', element: <GeneralAppFilePage /> },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/current-users" replace />, index: true },
            { path: 'add-user', element: <AddUserPage /> },
            { path: 'edit-user', element: <AddUserPage /> },
            { path: 'current-users', element: <CurrentUsersPage /> },
          ],
        },
        {
          path: 'articles',
          children: [
            { element: <Navigate to="/dashboard/articles/current-articles" replace />, index: true },
            { path: 'current-articles', element: <CurrentArticlesPage /> },
            { path: 'add-articles', element: <AddArticlesPage /> },
            { path: 'edit-articles', element: <AddArticlesPage /> },
          ],
        },
      ],
    },

    // Main Routes
    {
      element: <MainLayout />,
      children: [
        // { element: <HomePage />, index: true },
        // { element: <Navigate to="/auth/login" replace />, index: true },
        { element: <Navigate to="/dashboard/encode-decode" replace />, index: true },
      ],
    },

    {
      element: <CompactLayout />,
      children: [
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
