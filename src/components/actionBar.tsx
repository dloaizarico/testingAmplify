import React, { ReactNode } from 'react'
import clsx from 'clsx'
import { Box, Button, Card, CardContent, makeStyles, Typography } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 55
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    '&.MuiCardContent-root:last-child': {
      paddingBottom: 10
    }
  },
  buttonsContainer: {
    '& button': {
      marginLeft: 5
    }
  }
}))

const ActionBar: React.FC<{ className?: string, title: string, buttons?: ReactNode, showBack?: boolean }> = ({ className, title = '', buttons, showBack = false, ...rest }) => {

  const classes = useStyles()
  const navigate = useNavigate()

  const handleClick = () => navigate(-1)

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent className={classes.content}>
        <Box display="flex" justifyContent="flex-start" flexDirection="row" >
          <Typography variant='h4' color='primary'>{title}</Typography>
        </Box>
        <Box display="flex" justifyContent="flex-end" className={classes.buttonsContainer} >
          {buttons && buttons}
          {showBack && <Button color="primary" variant="outlined" onClick={handleClick} > Back </Button>}
        </Box>
      </CardContent>
    </Card>
  )
}

export default ActionBar
