import React from 'react';
import { Box, Container, Typography, makeStyles } from '@material-ui/core';
import Page from 'src/components/page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  }
}));

const NotFound: React.FC = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="404" >
      <Box display="flex" flexDirection="column" height="100%" justifyContent="center" >
        <Container maxWidth="md" >
          <Typography align="center" color="textPrimary" variant="h1" >
            404: Page not found
          </Typography>
          <Box textAlign="center" >
            
          </Box>
        </Container>
      </Box>
    </Page>
  );
};

export default NotFound;
