import { Helmet } from 'react-helmet-async';

import { OrderView } from '../sections/order/view';

// ----------------------------------------------------------------------

export default function OrderPage() {
    return (
        <>
            <Helmet>
                <title> {`Order | Trang quản trị website bán vé xem phim NHTT`}</title>
            </Helmet>

            <OrderView />
        </>
    );
}