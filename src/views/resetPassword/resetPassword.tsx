import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik } from 'formik';
import { Box, Button, Container, Typography, makeStyles } from '@material-ui/core';
import Page from 'src/components/page';
import { AuthInitialValue } from 'src/types/auth';
import InputText from 'src/components/inputText';
import validationSchema from './validationSchema';
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

const ResetPassword = () => {
  const classes = useStyles()

  const navigate = useNavigate()
  const params = useParams()

  const onSubmit = (data: any) => {
    let { code, password } = data
    let username = params.username
    Auth.forgotPasswordSubmit(username, code, password)
      .then(() => {
        alert("password was changed successfully")
        navigate('/app/login', { replace: true })
      })
      .catch((err: Error) => {
        console.log(err)
        alert("error")
      })
  }

  return (
    <Page className={classes.root} title="Reset Password" >
      <Box display="flex" flexDirection="column" height="100%" justifyContent="center" >
        <Container maxWidth="sm" className={classes.container}>
          <Box mt={3} mb={1} >
            <Typography color="primary" variant="h3" > Ordering System </Typography>
          </Box>
          <Formik initialValues={AuthInitialValue} validationSchema={validationSchema} onSubmit={onSubmit} >
            {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
              <form onSubmit={handleSubmit}>
                <Box mt={3} mb={1} >
                  <Typography color="primary" variant="h2" > Reset Password </Typography>
                </Box>

                <InputText errors={errors} touched={touched} label="Confirmation code" name="code" onBlur={handleBlur} onChange={handleChange} value={values.code} />
                <InputText errors={errors} touched={touched} label="Password" name="password" onBlur={handleBlur} onChange={handleChange} type="password" value={values.password} />
                <InputText errors={errors} touched={touched} label="Confirm Password" name="confirmPassword" onBlur={handleBlur} onChange={handleChange} type="password" value={values.confirmPassword} />

                <Box my={2}>
                  <Button color="primary" fullWidth size="large" type="submit" variant="contained" > Change Password </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default ResetPassword;
