import { Helmet } from 'react-helmet-async';

import { MovieView } from '../sections/movie/view';

// ----------------------------------------------------------------------

export default function MoviePage() {
    return (
        <>
            <Helmet>
                <title> {`Movie | Trang quản trị website bán vé xem phim NHTT`}</title>
            </Helmet>

            <MovieView />
        </>
    );
}