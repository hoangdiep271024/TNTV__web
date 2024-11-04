import { Helmet } from 'react-helmet-async';

import { NotFoundView } from '../sections/error';

// ----------------------------------------------------- -----------------

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {`404 page not found! | Error`}</title>
            </Helmet>

            <NotFoundView />
        </>
    );
}