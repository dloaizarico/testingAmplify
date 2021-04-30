import React from 'react'
import Loader from 'react-loader-spinner'
import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import { useTheme } from '@material-ui/styles'
import { ITheme } from 'src/theme'

const useStyles = makeStyles(() => ({
  loader: {
    width: '100%',
    height: '100%',
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 9999
  },
  hide: {
    display: 'none'
  }
}))

const Loading: React.FC<{ useLoader: boolean }> = ({ useLoader }) => {

  const classes = useStyles()
  const theme: ITheme = useTheme()

  return (
    <div className={clsx([classes.loader, !useLoader ? classes.hide : ''])}>
      <Loader
        visible={useLoader}
        type="Rings"
        color={theme.palette.primary.main}
        height={100}
        width={100}
      />
    </div>
  )
}

export default Loading