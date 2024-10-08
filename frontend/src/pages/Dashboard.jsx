import { Box, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

const AdminPanel = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer variant="permanent" sx={{ width: 240 }}>
                <List>
                    <ListItem>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Users" />
                    </ListItem>
                    {/* More links */}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <h1>Admin Dashboard</h1>
                {/* Admin panel content */}
            </Box>
        </Box>
    );
};

export default AdminPanel;
