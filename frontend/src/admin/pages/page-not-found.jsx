import { Helmet } from 'react-helmet-async';

import { NotFoundView } from '../sections/error';
// ----------------------------------------------------- -----------------

export default function ErrorPage() {

    return (
        <>
            <Helmet>
                <title> {`404 page not found! | Error Page | Trang quản trị website bán vé xem phim NHTT`}</title>
            </Helmet>

            <NotFoundView />
        </>
    );
}