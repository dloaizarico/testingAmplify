import React from 'react'
import { Box, Button, Card, CardContent, Container, Divider, Grid, makeStyles, MenuItem, Typography } from '@material-ui/core'
import Page from 'src/components/page'
import ActionBar from 'src/components/actionBar'
import { useNavigate } from 'react-router-dom'
import { createUser } from 'src/graphql/mutations';
import IUserInfo, { userInfoInitialValues } from 'src/types/userInfo'
import { useFormik } from 'formik'
import InputText from 'src/components/inputText'
import { enumKeys } from 'src/helpers/enumHelper'
import { capitalizeFirstLetter } from 'src/helpers/stringHelpers'
import validationSchema from 'src/views/users/validationSchema'
import userTypeEnum from 'src/enum/userTypeEnum'
import Amplify, { API, graphqlOperation } from 'aws-amplify';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}))

const CreateUser: React.FC = () => {

  const pageName: string = 'New User'
  const classes = useStyles()
  const navigate = useNavigate()

  const onSubmit = async (values: IUserInfo) => {
    try {
      values.isActive = true

      await API.graphql(graphqlOperation(createUser, { input: values }))
      navigate('/ordering/users')
    }
    catch(error) {
      console.log(error)
    }
    finally{}
  }

const { errors, touched, values, handleBlur, handleChange, handleSubmit } = useFormik({ initialValues: userInfoInitialValues, onSubmit, validationSchema })

return (
  <Page className={classes.root} title={pageName} >
    <Container maxWidth={false}>
      <form onSubmit={handleSubmit}>
        <ActionBar title={pageName} showBack={true} buttons={
          <Box display="flex" justifyContent="flex-end" >
            <Button color="primary" variant="contained" type='submit'> Create </Button>
          </Box>
        } />
        <Box mt={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1">User info</Typography>
              <Divider />
              <Grid container spacing={2}>
                <Grid item xs={12} lg={3}>
                  <InputText errors={errors} touched={touched} label="Name" name="name" onBlur={handleBlur} onChange={handleChange} value={values.name} />
                </Grid>
                <Grid item xs={12} lg={5}>
                  <InputText errors={errors} touched={touched} label="Email" name="email" onBlur={handleBlur} onChange={handleChange} value={values.email} />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <InputText select errors={errors} touched={touched} label="Role" name="role" onBlur={handleBlur} onChange={handleChange} value={values.role}>
                    <MenuItem value="">None</MenuItem>
                    {enumKeys(userTypeEnum).map(key =>
                      <MenuItem key={key} value={key}>{capitalizeFirstLetter(userTypeEnum[key])}</MenuItem>
                    )}
                  </InputText>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <InputText errors={errors} touched={touched} label="Phone Number" name="phoneNumber" onBlur={handleBlur} onChange={handleChange} value={values.phoneNumber} />
                </Grid>
              </Grid>
            </CardContent>
          </Card >
        </Box>
      </form>
    </Container>
  </Page>
)
}

export default CreateUser
