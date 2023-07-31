import { useContext } from 'react';
import Link from 'next/link'; 'next/link'
import { UiContext } from '@/context/ui';
import { AppBar, Toolbar, IconButton, Typography, Link } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import Link from 'next/link';

export const NavBar = () => {
  const { openSideMenu } = useContext(UiContext)
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
        <Link href={'/'} passHref>
          <Link underline='none' color={'white'}>
            <Typography variant='h6'>OpenJira</Typography>
          </Link>
        </Link>
      </Toolbar>
    </AppBar>
  )
}

