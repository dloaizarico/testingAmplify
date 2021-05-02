import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { Link as RouterLink } from 'react-router-dom'
import { Box, Button, Container, Typography, makeStyles } from '@material-ui/core';
import Page from 'src/components/page';
import { AuthInitialValue, IAuthResponse, IAuth } from 'src/types/auth';
import InputText from 'src/components/inputText';
import validationSchema from './validationSchema';
import { Auth } from 'aws-amplify';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { AUTH_USER_TOKEN_KEY, USER_KEY } from 'src/constants/constants'

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
  signUp: {
    display: "flex",
    justifyContent: 'flex-end',
  }
}));

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const login = (values: any) => {


    Auth.signIn({ username: values.email, password: values.password })
      .then((user: CognitoUser) => {
        localStorage.setItem('token', user.getSignInUserSession().getAccessToken().getJwtToken())
        localStorage.setItem('user', JSON.stringify(user))
        
        navigate('/ordering/dashboard', { replace: true })
      })
      .catch((error) => {
        alert(error.message)
        console.log(error)
       })
  };

  return (
    <Page className={classes.root} title="Login" >
      <Box display="flex" flexDirection="column" height="100%" justifyContent="center" >
        <Container maxWidth="sm" className={classes.container}>
          <Box mt={3} mb={1} >
            <Typography color="primary" variant="h3" >Ordering System</Typography>
          </Box>
          <Formik initialValues={AuthInitialValue} validationSchema={validationSchema} onSubmit={login} >
            {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
              <form onSubmit={handleSubmit}>

                <InputText errors={errors} touched={touched} label="Email" name="email" onBlur={handleBlur} onChange={handleChange} value={values.email} />
                <InputText errors={errors} touched={touched} label="Password" name="password" onBlur={handleBlur} onChange={handleChange} type="password" value={values.password} />

                <RouterLink to="/forgotPassword">
                  <Typography color="primary" variant="body1" > {`Forgot password`} </Typography>
                </RouterLink>

                <RouterLink to="/signUp">
                  <div className={classes.signUp}>
                    <Typography color="primary" variant="body1" > {`Not registered?, Sign Up`} </Typography>
                  </div>
                </RouterLink>

                <Box my={2}>
                  <Button color="primary" fullWidth size="large" type="submit" variant="contained" > Log in </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default Login;