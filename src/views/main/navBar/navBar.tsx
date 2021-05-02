import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Box, Divider, Drawer, Hidden, List, Typography, makeStyles } from '@material-ui/core'
import NavItem from './navItem'
import menuItems from './menuItem'


const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  menuItem: {
    '& .MuiSvgIcon-root': {
      width: '20px',
      marginRight: '8px'
    }
  }
}))

const NavBar: React.FC<{ onMobileClose(): void, openMobile: boolean }> = ({ onMobileClose, openMobile }) => {
  const classes = useStyles()
  const location = useLocation()

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  const content = (
    <Box height="100%" display="flex" flexDirection="column" >
      <Box alignItems="center" display="flex" flexDirection="column" p={2} >
        <Typography color="primary" variant="h5" >
          {/* aca debe ir el username */}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {menuItems.map((item) => (
            <NavItem href={item.href} key={item.title} title={item.title} icon={item.icon} className={classes.menuItem} />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  )

  return (
    <>
      <Hidden lgUp>
        <Drawer anchor="left" classes={{ paper: classes.mobileDrawer }} onClose={onMobileClose} open={openMobile} variant="temporary" >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer anchor="left" classes={{ paper: classes.desktopDrawer }} open variant="persistent" >
          {content}
        </Drawer>
      </Hidden>
    </>
  )
}

export default NavBar
