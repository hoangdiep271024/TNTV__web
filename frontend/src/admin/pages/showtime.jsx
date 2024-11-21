import { Helmet } from 'react-helmet-async';

import { ShowtimeView } from '../sections/showtime/view';

// ----------------------------------------------------------------------

export default function ShowtimePage() {
    return (
        <>
            <Helmet>
                <title> {`Showtime | NHTT Admin Panel`}</title>
            </Helmet>

            <ShowtimeView />
        </>
    );
}