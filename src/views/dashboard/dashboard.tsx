import React from 'react';
import { makeStyles } from '@material-ui/core';
import Page from 'src/components/page'

const useStyles = makeStyles((theme) => ({
    root: {

    }
}));

const Dashboard = () => {
    const classes = useStyles();
    return (
        <Page  className={classes.root} title="Dashboard">
            
        </Page>
    );
};

export default Dashboard;