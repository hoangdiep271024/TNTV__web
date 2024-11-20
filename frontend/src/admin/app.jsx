import './global.css';

import { lazy, Suspense } from 'react';
import { Outlet, Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

import { varAlpha } from './theme/styles';
import theme from './theme/theme'

import { DashboardLayout } from './layouts/dashboard';

const HomePage = lazy(() => import('./pages/home'));
const Page404 = lazy(() => import('./pages/page-not-found'));
const UserPage = lazy(() => import('./pages/user'));
const MoviePage = lazy(() => import('./pages/movie'));
const CinemaPage = lazy(() => import('./pages/cinema'));
const ShowtimePage = lazy(() => import('./pages/showtime'));
const OrderPage = lazy(() => import('./pages/order'));

const EditUserPage = lazy(() => import('./pages/edit-user'));


// ----------------------------------------------------------------------
const renderFallback = (
    <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
        <LinearProgress
            sx={{
                width: 1,
                maxWidth: 320,
                bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
                [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
            }}
        />
    </Box>
);
// ----------------------------------------------------------------------
const router = createBrowserRouter([
    {
        path: '/admin',
        element: (
            <DashboardLayout>
                <Suspense fallback={renderFallback}>
                    <Outlet />
                    {/* <HomePage /> */}
                </Suspense>
            </DashboardLayout>
        ),
        children: [
            { element: <HomePage />, index: true },
            { path: 'user', element: <UserPage /> },
            { path: 'user/:id', element: <EditUserPage /> },
            { path: 'movie', element: <MoviePage /> },
            { path: 'cinema', element: <CinemaPage /> },
            { path: '*', element: <Navigate to="/404" replace /> }
        ],
    },
    // {
    //     path: '/admin/user',
    //     element: (
    //         <DashboardLayout>
    //             <Suspense fallback={renderFallback}>
    //                 <Outlet />
    //                 <UserPage />
    //             </Suspense>
    //         </DashboardLayout>
    //     )
    // },
    {
        path: '/404',
        element: <Page404 />
    },

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