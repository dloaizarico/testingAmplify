import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import NavBar from './navBar/navBar';
import TopBar from './topBar';
import MomentUtils from '@date-io/moment';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        height: '100%',
        overflow: 'hidden',
        width: '100%'
    },
    wrapper: {
        display: 'flex',
        flex: '1 1 auto',
        overflow: 'hidden',
        paddingTop: 64,
        [theme.breakpoints.up('lg')]: {
            paddingLeft: 256
        }
    },
    contentContainer: {
        display: 'flex',
        flex: '1 1 auto',
        overflow: 'hidden'
    },
    content: {
        flex: '1 1 auto',
        height: '100%',
        overflow: 'auto'
    }
}));

const DashboardLayout = () => {

    const classes = useStyles();
    const [isMobileNavOpen, setMobileNavOpen] = useState(false);
    const navigate = useNavigate()

    React.useEffect(() => {
        if (!localStorage.getItem('token')) navigate('/login')
    }, [navigate])

    return (
        <div className={classes.root}>
            <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
            <NavBar
                onMobileClose={() => setMobileNavOpen(false)}
                openMobile={isMobileNavOpen}
            />
            <div className={classes.wrapper}>
                <div className={classes.contentContainer}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <div className={classes.content}>
                            <Outlet />
                        </div>
                    </MuiPickersUtilsProvider>
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout;