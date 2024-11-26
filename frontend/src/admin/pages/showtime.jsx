import { Helmet } from 'react-helmet-async';

import { ShowtimeView } from '../sections/showtime/view';

// ----------------------------------------------------------------------

export default function ShowtimePage() {
    return (
        <>
            <Helmet>
                <title> {`Showtime | Trang quản trị website bán vé xem phim NHTT`}</title>
            </Helmet>

            <ShowtimeView />
        </>
    );
}