import { Helmet } from 'react-helmet-async';

import { MovieView } from '../sections/movie/view';

// ----------------------------------------------------------------------

export default function MoviePage() {
    return (
        <>
            <Helmet>
                <title> {`Movie | NHTT Admin Panel`}</title>
            </Helmet>

            <MovieView />
        </>
    );
}