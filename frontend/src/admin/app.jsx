import './global.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import theme from './theme/theme'

import { lazy } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import { DashboardLayout } from './layouts/dashboard';

const HomePage = lazy(() => import('./pages/home'));
const Page404 = lazy(() => import('./pages/page-not-found'));

// ----------------------------------------------------------------------
const router = createBrowserRouter([
    {
        path: '/admin',
        element: (
            <DashboardLayout>
                <Outlet />
            </DashboardLayout>
        ),
        children: [
            { element: <HomePage />, index: true },
        ],
    },
    {
        path: '404',
        element: <Page404 />
    },
    {
        path: '*',
        element: <Navigate to="404" replace />
    },     // Redirects undefined paths under /admin to /admin/404
]);

// ----------------------------------------------------------------------
export default function App() {
    return (
        <CssVarsProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={router} />
        </CssVarsProvider>
    );
}