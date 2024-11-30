import { Helmet } from 'react-helmet-async';

import { EditMovieView } from '../sections/movie/view';

// ----------------------------------------------------------------------

export default function EditMoviePage() {
    return (
        <>
            <Helmet>
                <title> {`Chỉnh sửa thông tin phim | Trang quản trị website bán vé xem phim NHTT`}</title>
            </Helmet>

            <EditMoviePage />
        </>
    );
}