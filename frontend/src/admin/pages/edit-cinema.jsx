import { Helmet } from 'react-helmet-async';

import { EditCinemaView } from '../sections/cinema/view';

// ----------------------------------------------------------------------

export default function EditCinemaPage() {
    return (
        <>
            <Helmet>
                <title> {`Chỉnh sửa thông tin rạp chiếu phim | NHTT Admin Panel`}</title>
            </Helmet>

            <EditCinemaPage />
        </>
    );
}