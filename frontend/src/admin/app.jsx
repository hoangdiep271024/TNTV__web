import './global.css';

import { lazy, Suspense } from 'react';
import { Outlet, Navigate, createBrowserRouter, RouterProvider, BrowserRouter, Routes, Route } from 'react-router-dom';

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
const RoomPage = lazy(() => import('./pages/room'));

const EditUserPage = lazy(() => import('./pages/edit-user'));
const OrderDetailsPage = lazy(() => import('./pages/order-details'));
const CreateMoviePage = lazy(() => import('./pages/create-movie'));
const EditMoviePage = lazy(() => import('./pages/edit-movie'));
const CreateCinemaPage = lazy(() => import('./pages/create-cinema'));
const EditCinemaPage = lazy(() => import('./pages/edit-cinema'));
const CreateShowtimePage = lazy(() => import('./pages/create-showtime'));
const EditShowtimePage = lazy(() => import('./pages/edit-showtime'))


const renderFallback = (
    <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
        <LinearProgress
            sx={{
                width: 1,
                maxWidth: 320,
                bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
                // [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
            }}
        />
    </Box>
);

function Layout() {
    return (
        <DashboardLayout>
            <Suspense fallback={renderFallback}>
                <Outlet />
                {/* <HomePage /> */}
            </Suspense>
        </DashboardLayout>
    );
}

// const router = createBrowserRouter([
//     {
//         path: '/admin/',
//         element: <Layout />,
//         errorElement: <Page404 />,
//         children: [
//             { element: <HomePage />, index: true },
//             { path: 'user', element: <UserPage /> },
//             { path: 'user/:id', element: <EditUserPage /> },
//             { path: 'movie', element: <MoviePage /> },
//             { path: 'cinema', element: <CinemaPage /> },
//             { path: 'showtime', element: <ShowtimePage /> },
//             { path: 'order', element: <OrderPage /> },
//             { path: 'order/:id', element: <OrderDetailsPage /> },
//             { path: 'room', element: <RoomPage /> },
//             { path: '*', element: <Page404 /> }
//         ],
//     },
// ]);

// ----------------------------------------------------------------------
export default function App() {
    return (
        <CssVarsProvider theme={theme}>
            <CssBaseline />
            {/* <RouterProvider router={router} /> */}
            <BrowserRouter>
                <Routes>
                    <Route path="/admin" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path='user' element={<UserPage />} />
                        <Route path='user/:id' element={<EditUserPage />} />
                        <Route path='movie' element={<MoviePage />} />
                        <Route path='cinema' element={<CinemaPage />} />
                        <Route path='showtime' element={<ShowtimePage />} />
                        <Route path='room' element={<RoomPage />} />
                        <Route path='order' element={<OrderPage />} />
                        <Route path='movie/create' element={<CreateMoviePage />} />
                        <Route path='movie/:id' element={<EditMoviePage />} />
                        <Route path='cinema/create' element={<CreateCinemaPage />} />
                        <Route path='cinema/:id' element={<EditCinemaPage />} />
                        <Route path='showtime/create' element={<CreateShowtimePage />} />
                        <Route path='showtime/:id' element={<EditShowtimePage />} />
                        <Route path='order/:id' element={<OrderDetailsPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </CssVarsProvider>
    );
}