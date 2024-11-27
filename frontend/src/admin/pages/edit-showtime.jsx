import { Helmet } from 'react-helmet-async';

import { EditShowtimeView } from '../sections/showtime/view';

// ----------------------------------------------------------------------

export default function EditShowtimePage() {
    return (
        <>
            <Helmet>
                <title> {`Edit Showtime | Trang quản trị website bán vé xem phim NHTT`}</title>
            </Helmet>

            <EditShowtimePage />
        </>
    );
}