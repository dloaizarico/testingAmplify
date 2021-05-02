import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { AppBar, Box, Hidden, IconButton, Toolbar, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';

const useStyles = makeStyles(() => ({
    root: {},
    avatar: {
        width: 60,
        height: 60
    }
}));

const TopBar: React.FC<{ className?: string, onMobileNavOpen(): any }> = ({ className, onMobileNavOpen, ...rest }) => {

    const classes = useStyles();
    const navigate = useNavigate()

    const handleLogout = React.useCallback(() => {
        navigate('/login')

    }, [navigate])

    return (
        <AppBar className={clsx(classes.root, className)} elevation={0} {...rest} >
            <Toolbar>
                <Box flexGrow={1} />
                <Hidden mdDown>
                    <IconButton color="inherit" onClick={handleLogout}>
                        <InputIcon />
                    </IconButton>
                </Hidden>
                <Hidden lgUp>
                    <IconButton color="inherit" onClick={onMobileNavOpen} >
                        <MenuIcon />
                    </IconButton>
                </Hidden>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
