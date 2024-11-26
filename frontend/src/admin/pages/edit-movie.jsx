import { Helmet } from 'react-helmet-async';

import { EditMovieView } from '../sections/movie/view';

// ----------------------------------------------------------------------

export default function EditMoviePage() {
    return (
        <>
            <Helmet>
                <title> {`Edit Movie | Trang quản trị website bán vé xem phim NHTT`}</title>
            </Helmet>

            <EditMoviePage />
        </>
    );
}