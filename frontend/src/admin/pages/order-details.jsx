import { Helmet } from 'react-helmet-async';

import { OrderDetailsView } from '../sections/order/view';
import { useParams } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function OrderPage() {

    const { id } = useParams();
    return (
        <>
            <Helmet>
                <title> {`Order Details | NHTT Admin Panel`}</title>
            </Helmet>

            <OrderDetailsView orderId={id} />
        </>
    );
}