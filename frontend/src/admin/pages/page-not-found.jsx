import { Helmet } from 'react-helmet-async';

import { NotFoundView } from '../sections/error';
// ----------------------------------------------------- -----------------

export default function ErrorPage() {

    return (
        <>
            <Helmet>
                <title> {`404 page not found! | Error Page | NHTT Admin Panel`}</title>
            </Helmet>

            <NotFoundView />
        </>
    );
}