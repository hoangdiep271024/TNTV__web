import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import MovieTwoToneIcon from '@mui/icons-material/MovieTwoTone';
import EventNoteTwoToneIcon from '@mui/icons-material/EventNoteTwoTone';
import EditCalendarTwoToneIcon from '@mui/icons-material/EditCalendarTwoTone';
import EventSeatTwoToneIcon from '@mui/icons-material/EventSeatTwoTone';
import ReceiptTwoToneIcon from '@mui/icons-material/ReceiptTwoTone';
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone';
import ExitToAppTwoToneIcon from '@mui/icons-material/ExitToAppTwoTone';
import TheatersTwoToneIcon from '@mui/icons-material/TheatersTwoTone';

const DashboardIcon = DashboardTwoToneIcon;
const MovieIcon = MovieTwoToneIcon;
const ScheduleIcon = EventNoteTwoToneIcon;
const ShowtimeIcon = EditCalendarTwoToneIcon;
const RoomIcon = EventSeatTwoToneIcon;
const OrderIcon = ReceiptTwoToneIcon;
const UserIcon = PersonTwoToneIcon;
const ExitIcon = ExitToAppTwoToneIcon;
const CinemaIcon = TheatersTwoToneIcon;

// ----------------------------------------------------------------------

export const navData = [
    {
        title: 'Dashboard',
        path: '/admin',
        icon: <DashboardIcon />,
    },
    {
        title: 'Movie',
        path: '/admin/movie',
        icon: <MovieIcon />,
    },
    {
        title: 'Cinema',
        path: '/admin/cinema',
        icon: <CinemaIcon />,
    },
    {
        title: 'Schedule',
        path: '/admin/schedule',
        icon: <ScheduleIcon />,
    },
    {
        title: 'Showtime',
        path: '/admin/showtime',
        icon: <ShowtimeIcon />,
    },
    {
        title: 'Room',
        path: '/admin/room',
        icon: <RoomIcon />,
    },
    {
        title: 'Order',
        path: '/admin/order',
        icon: <OrderIcon />,
    },
    {
        title: 'User',
        path: '/admin/user',
        icon: <UserIcon />,
    },
    {
        title: 'Sign-out',
        path: '/admin',
        icon: <ExitIcon />,
    }
];
