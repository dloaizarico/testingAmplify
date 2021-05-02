
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik } from 'formik';
import { Box, Button, Container, Typography, makeStyles } from '@material-ui/core';
import Page from 'src/components/page';
import InputText from 'src/components/inputText';
import { AuthInitialValue } from 'src/types/auth';
import { API, graphqlOperation } from 'aws-amplify';
import { createUser } from 'src/graphql/mutations';

// amplify
import { Auth } from 'aws-amplify';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#fff',
        height: '100%'
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    }
}));

const ConfirmEmailContainer = () => {
    const classes = useStyles()

    const navigate = useNavigate()
    const params = useParams()

    const handleSubmit = (values: any) => {
        const { code } = values;

        Auth.confirmSignUp(params.username, code)
            .then(async () => {
                alert("your account has been confirmed, please Sign In")
                navigate('/ordering/dashboard', { replace: true })
            })
            .catch(err => {
                alert(err.message)
            });
    };

    return (
        <Page className={classes.root} title="Confirm your account" >
            <Box display="flex" flexDirection="column" height="100%" justifyContent="center" >
                <Container maxWidth="sm" className={classes.container}>
                    <Box mt={3} mb={1} >
                        <Typography color="primary" variant="h3" > Ordering System </Typography>
                    </Box>

                    <Formik initialValues={AuthInitialValue} onSubmit={handleSubmit} >
                        {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                            <form onSubmit={handleSubmit}>
                                <Box mt={3} mb={1} >
                                    <Typography variant="h2" > Confirm account</Typography>
                                    <Typography variant="body2" > Please enter the code you receive in order to confirm your account </Typography>
                                </Box>

                                <InputText errors={errors} touched={touched} label="Code" name="code" onBlur={handleBlur} onChange={handleChange} value={values.code} />

                                <Box my={2}>
                                    <Button color="primary" fullWidth size="large" type="submit" variant="contained" >Confirm</Button>
                                </Box>
                            </form>
                        )}
                    </Formik>


                </Container>
            </Box>
        </Page>
    );



}

export default ConfirmEmailContainer;