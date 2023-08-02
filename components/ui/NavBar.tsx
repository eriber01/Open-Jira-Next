import { useContext } from 'react';
import NextLink from 'next/link';
import { UiContext } from '@/context/ui';
import { AppBar, Toolbar, IconButton, Typography, Link } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

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
        <NextLink href={'/'} passHref>
          {/* <Link underline='none' color={'white'}> */}
          <Typography
            sx={{ color: 'white' }}
            variant='h6'>Open Jira</Typography>
          {/* </Link> */}
        </NextLink>
      </Toolbar>
    </AppBar>
  )
}

