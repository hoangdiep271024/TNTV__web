import { Helmet } from 'react-helmet-async';

import { RoomView } from '../sections/room/room-view';

// ----------------------------------------------------------------------

export default function RoomPage() {
    return (
        <>
            <Helmet>
                <title> {`Room | NHTT Admin Panel`}</title>
            </Helmet>

            <RoomView />
        </>
    );
}