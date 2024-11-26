import { Helmet } from 'react-helmet-async';

import { CinemaView } from '../sections/cinema/view';

// ----------------------------------------------------------------------

export default function CinemaPage() {
    return (
        <>
            <Helmet>
                <title> {`Cinema | Trang quản trị website bán vé xem phim NHTT`}</title>
            </Helmet>

            <CinemaView />
        </>
    );
}