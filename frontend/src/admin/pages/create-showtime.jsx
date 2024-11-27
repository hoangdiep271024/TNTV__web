import { Helmet } from 'react-helmet-async';

import { CreateShowtimeView } from '../sections/showtime/view';

// ----------------------------------------------------------------------

export default function CreateShowtimePage() {
    return (
        <>
            <Helmet>
                <title> {`Create Showtime | Trang quản trị website bán vé xem phim NHTT`}</title>
            </Helmet>

            <CreateShowtimePage />
        </>
    );
}