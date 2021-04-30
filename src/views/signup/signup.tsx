import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Container, Divider, Grid, makeStyles, MenuItem, Typography } from '@material-ui/core'
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import Page from 'src/components/page';
import IUser, { userInitialValue } from 'src/types/user';
import { Auth } from 'aws-amplify';
import InputText from 'src/components/inputText';
import validationSchema from './validationSchema';
import { enumKeys } from 'src/helpers/enumHelper'
import { capitalizeFirstLetter } from 'src/helpers/stringHelpers'
// import { AlertSuccess } from 'src/components/Alert'
import userTypeEnum from 'src/enum/userTypeEnum'
import axios from 'axios'


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
    },
    buttonContainer: {
        margin: 20
    }
}));

const SingUp = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const onSubmit = (values: IUser, {resetForm}) => {
        let { name, password, email, phoneNumber, role } = values
        Auth.signUp({
            username: values.email,
            password,
            attributes: {
                email,
                given_name: name,
                phone_number: phoneNumber,
            }
        }).then((result: any) => {
            alert('Welcome to the ordering system')
            navigate(`/confirmEmail/${result.user.getUsername()}`, { replace: true })
            // let apiName = 'AdminQueries';
            // let path = '/addUserToGroup';

            // console.log(result.user.getSignInUserSession())
            // let myInit = {
            //     body: {
            //         "username": result.user.getUsername(),
            //         "groupname": role
            //     },
            //     headers: {
            //         'Content-Type': 'application/json',
            //         Authorization: `${result.user.getSignInUserSession().getAccessToken().getJwtToken()}`
            //     }
            // }
            // localStorage.setItem('token', result.user.getSignInUserSession().getAccessToken().getJwtToken())
            // localStorage.setItem('user', JSON.stringify(result.user))
            // axios.post(apiName, path, myInit).then(result => {
                
            // }
            // ).catch(error => {
            //     alert(error)
            // })
        })
            .catch((error) => {
                alert(error.message)
                console.log(error)
            }).finally(()=>{
                resetForm();
            })
    }

    return (
        <Page className={classes.root} title="Login" >
            <Box display="flex" flexDirection="column" height="100%" justifyContent="center" >
                <Container maxWidth="sm" className={classes.container}>
                    <Box mt={3} mb={1} >
                        <Typography color="primary" variant="h3" >Ordering System</Typography>
                    </Box>
                    <Formik initialValues={userInitialValue} validationSchema={validationSchema} onSubmit={onSubmit} >
                        {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                            <form onSubmit={handleSubmit}>
                                <Box mt={3} mb={1} >
                                    <Typography variant="h2" > Sign Up </Typography>
                                </Box>
                                <Divider />
                                <Grid container spacing={2}>
                                    <Grid item xs={12} lg={12}>
                                        <InputText errors={errors} touched={touched} label="Name" name="name" onBlur={handleBlur} onChange={handleChange} value={values.name} />
                                    </Grid>
                                    <Grid item xs={12} lg={12}>
                                        <InputText errors={errors} touched={touched} label="Email" name="email" onBlur={handleBlur} onChange={handleChange} value={values.email} />
                                    </Grid>
                                    <Grid item xs={12} lg={12}>
                                        <InputText errors={errors} touched={touched} label="Phone Number" name="phoneNumber" onBlur={handleBlur} onChange={handleChange} value={values.phoneNumber} />
                                    </Grid>
                                    {/* <Grid item xs={12} lg={12}>
                                        <InputText select errors={errors} touched={touched} label="Role" name="role" onBlur={handleBlur} onChange={handleChange} value={values.role}>
                                            <MenuItem value="">None</MenuItem>
                                            {enumKeys(userTypeEnum).map(key =>
                                                <MenuItem key={key} value={key}>{capitalizeFirstLetter(userTypeEnum[key])}</MenuItem>
                                            )}
                                        </InputText>
                                    </Grid> */}
                                    <Grid item xs={12} lg={6}>
                                        <InputText errors={errors} touched={touched} label="Password" name="password" onBlur={handleBlur} onChange={handleChange} type="password" value={values.password} />
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <InputText errors={errors} touched={touched} label="Confirm Password" name="confirmedPassword" onBlur={handleBlur} onChange={handleChange} type="password" value={values.confirmedPassword} />
                                    </Grid>
                                </Grid>

                                <Box display="flex" justifyContent="center" >
                                    <Button className={classes.buttonContainer} color="primary" variant="contained" type='submit'> Sign Up </Button>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Container>
            </Box>
        </Page>
    );
};

export default SingUp;