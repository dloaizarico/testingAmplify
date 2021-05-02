import React from 'react'
import { Box, Button, Container, makeStyles } from '@material-ui/core'
import Page from 'src/components/page'
import FindUsers from './list/findUsers'
import ActionBar from 'src/components/actionBar'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}))

const Users: React.FC = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const handleAdd = () => navigate('new')

    return (
        <Page className={classes.root} title="Users" >
            <Container maxWidth={false}>
                <ActionBar title="Users" buttons={
                    <Box display="flex" justifyContent="flex-end" >
                        <Button color="primary" variant="contained" onClick={handleAdd} >
                            New user
                        </Button>
                    </Box>
                } />
                <Box mt={3}>
                    <FindUsers className={''} />
                </Box>
            </Container>
        </Page>
    )
}

export default Users
