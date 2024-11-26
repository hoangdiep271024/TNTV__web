import { Helmet } from 'react-helmet-async';

import { CreateMovieView } from '../sections/movie/view';

// ----------------------------------------------------------------------

export default function CreateMoviePage() {
    return (
        <>
            <Helmet>
                <title> {`Create Movie | Trang quản trị website bán vé xem phim NHTT`}</title>
            </Helmet>

            <CreateMoviePage />
        </>
    );
}