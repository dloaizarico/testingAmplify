import React, { useEffect } from 'react'
import { Box, Button, Card, CardContent, Container, Divider, Grid, makeStyles, MenuItem, Typography } from '@material-ui/core'
import Page from 'src/components/page'
import ActionBar from 'src/components/actionBar'
import { useNavigate, useParams } from 'react-router-dom'
import IUserInfo, { userInfoInitialValues, getUserInfoQuery } from 'src/types/userInfo'
import { useFormik } from 'formik'
import InputText from 'src/components/inputText'
import { enumKeys } from 'src/helpers/enumHelper'
import { capitalizeFirstLetter } from 'src/helpers/stringHelpers'
import validationSchema from 'src/views/users/validationSchema'
import userTypeEnum from 'src/enum/userTypeEnum'
import { API, graphqlOperation } from 'aws-amplify';
import { updateUser } from 'src/graphql/mutations';
import { getUser } from 'src/graphql/queries'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}))

const UpdateUser: React.FC = () => {

  const pageName: string = 'Update User'
  const classes = useStyles()
  const navigate = useNavigate()
  const params = useParams()

  const onSubmit = async (values: IUserInfo) => {
    try {
      const updatedUser = {
        email: values.email,
        name: values.name,
        role: values.role,
        phoneNumber: values.phoneNumber,
        id: values.id
      }

      await API.graphql(graphqlOperation(updateUser, { input: updatedUser }))

      // if(role!==values.role){
        // removeUserFromGroup(values.email, role).then(()=>{
          // addUserToGroup(values.email, values.role).then(()=>{
            navigate('/ordering/users')
          // }).catch(error=>{
          //   console.log(error)
          // })
        // }).catch(error=>{
        //   console.log(error)
        // })
        
      // }
      
    }
    catch (error) {
      console.log(error)
    }
    finally { }
  }

  const { errors, touched, values, setValues, handleBlur, handleChange, handleSubmit } = useFormik({ initialValues: userInfoInitialValues, onSubmit, validationSchema })

  useEffect(() => {
    async function getUserData() {
      try {
        const userInfo = await API.graphql(graphqlOperation(getUser, { id: params.id })) as {
          data: getUserInfoQuery
        }
        setValues(userInfo.data.getUser)
      }
      catch (error) {
        console.log(error)
      }
    }
    getUserData()
  }, [setValues, params.id])

  const handleDeactivate = async () => {
    try {
      await API.graphql(graphqlOperation(updateUser, { input: { id: params.id, isActive: !values.isActive } as IUserInfo }))
      navigate('/ordering/users')
    }
    catch (error) {
      console.log(error)
    }
    finally { }
  }

  return (
    <Page className={classes.root} title={pageName} >
      <Container maxWidth={false}>
        <form onSubmit={handleSubmit}>
          <ActionBar title={pageName} showBack={true} buttons={
            <Box display="flex" justifyContent="flex-end" >
              <Button color="primary" variant="contained" type='submit'> Save </Button>
              <Button color="primary" variant="contained" onClick={handleDeactivate} > {values.isActive ? 'Deactivate' : 'Activate'} </Button>
            </Box>
          } />
          <Box mt={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1">User info</Typography>
                <Divider />
                <Grid container spacing={2}>
                  <Grid item xs={12} lg={6}>
                    <InputText errors={errors} touched={touched} label="Name" name="name" onBlur={handleBlur} onChange={handleChange} value={values.name} />
                  </Grid>
                  <Grid item xs={12} lg={6}>
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

export default UpdateUser
