import { Helmet } from 'react-helmet-async';

import { RoomView } from '../sections/room/room-view';

// ----------------------------------------------------------------------

export default function RoomPage() {
    return (
        <>
            <Helmet>
                <title> {`Room | Trang quản trị website bán vé xem phim NHTT`}</title>
            </Helmet>

            <RoomView />
        </>
    );
}