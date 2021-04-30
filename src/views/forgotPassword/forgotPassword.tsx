import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { Box, Button, Container, Typography, makeStyles } from '@material-ui/core';
import Page from 'src/components/page';
import { AuthInitialValue } from 'src/types/auth';
import { Auth } from 'aws-amplify';
import InputText from 'src/components/inputText';
import validationSchema from './validationSchema';

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

const ForgotPassword = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [success, setSuccess] = React.useState<boolean>(false)

  const onSubmit = (values: any) => {
    let username = values.email;

    Auth.forgotPassword(username)
      .then(data => {
        setSuccess(true)
      })
      .catch((err: Error) => { console.log(err) })
      .finally(() => {
      })
  }

  const goToLogin = () => {
    navigate('/login')
  }

  return (
    <Page className={classes.root} title="Forgot Password" >
      <Box display="flex" flexDirection="column" height="100%" justifyContent="center" >
        <Container maxWidth="sm" className={classes.container}>
          <Box mt={3} mb={1} >
            <Typography color="primary" variant="h3" > Ordering System </Typography>
          </Box>
          {
            !success ? (
              <Formik initialValues={AuthInitialValue} validationSchema={validationSchema} onSubmit={onSubmit} >
                {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                  <form onSubmit={handleSubmit}>
                    <Box mt={3} mb={1} >
                      <Typography variant="h2" > Forgot Password </Typography>
                      <Typography variant="body2" > Please enter your email, then a link will then be sent to you to recover your password. </Typography>
                    </Box>

                    <InputText errors={errors} touched={touched} label="Email" name="email" onBlur={handleBlur} onChange={handleChange} value={values.email} />

                    <Box my={2}>
                      <Button color="primary" fullWidth size="large" type="submit" variant="contained" >Request Link</Button>
                    </Box>
                  </form>
                )}
              </Formik>
            ) : (
                <>
                  <Box mt={3} mb={1} >
                    <Typography variant="h2" > Forgot Password </Typography>
                    <Typography variant="body2" > An email has been sent to you to recover your password </Typography>
                  </Box>

                  <Box my={2}>
                    <Button color="primary" fullWidth size="large" onClick={goToLogin} variant="contained" > Login </Button>
                  </Box>
                </>
              )
          }

        </Container>
      </Box>
    </Page>
  );
};

export default ForgotPassword;
