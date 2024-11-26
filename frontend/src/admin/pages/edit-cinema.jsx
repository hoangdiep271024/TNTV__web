import { Helmet } from 'react-helmet-async';

import { EditCinemaView } from '../sections/cinema/view';

// ----------------------------------------------------------------------

export default function EditCinemaPage() {
    return (
        <>
            <Helmet>
                <title> {`Edit Cinema | NHTT Admin Panel`}</title>
            </Helmet>

            <EditCinemaPage />
        </>
    );
}