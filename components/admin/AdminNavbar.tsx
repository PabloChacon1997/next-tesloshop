import { useContext } from 'react';
import { UIContext } from '../../context';

import NextLink from 'next/link';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';




export const AdminNavbar = () => {

  const { toogleSideMenu } = useContext(UIContext);


  return (
    <AppBar>
      <Toolbar>
        <NextLink href='/' passHref>
          <Link display='flex' alignItems='center'>
            <Typography variant='h6'>Teslo |</Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>

        <Box flex={1} />

        <Button onClick={toogleSideMenu}>
          Menu
        </Button>
      </Toolbar>
    </AppBar>
  )
}
