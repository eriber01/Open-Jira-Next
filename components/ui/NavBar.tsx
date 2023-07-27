import { UiContext } from '@/context/ui';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useContext } from 'react';

export const NavBar = () => {
  const { openSideMenu, closeSideMenu } = useContext(UiContext)
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          onClick={() => openSideMenu()}
        >
          <MenuOutlinedIcon />
        </IconButton>
        <Typography variant='h6'>
          OpenJira
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

