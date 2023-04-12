import React, { useContext } from 'react'
// Context manager
import { AuthContext } from 'src/Components/Contexts/AuthContext';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const AccountButton = (props) => {

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const authContext = useContext(AuthContext);
    
    const settings = authContext.authState.status ? ['Change Password', 'Statistics', 'Logout'] : ['Login', 'Register'];

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };   

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Account">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <AccountCircleIcon sx={{ fill: '#056aa8', fontSize: 40 }} />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {settings.map((setting, index) => (
                    <MenuItem key={index} onClick={(event) => { props.handleDialogAction(setting); handleCloseUserMenu(); }}>
                        <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    )
}

export default AccountButton