import NextLink from 'next/link';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';



import ShoppingCartOutlined  from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import ClearOutlined from '@mui/icons-material/ClearOutlined';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { UIContext } from '../../context';
import { CartContext } from '../../context/cart';



export const Navbar = () => {


  const router = useRouter();

  const { toogleSideMenu } = useContext(UIContext);
  const { numberOfItems } = useContext(CartContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
      if (searchTerm.trim().length === 0) return;
      router.push(`/search/${searchTerm}`);
  }

  const activeLink = (href: string) => href === router.asPath ? 'primary': 'info';

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
        <Box className='fadeIn' sx={{ display: isSearchVisible ? 'none':{ xs: 'none', sm: 'block' } }}>

          <NextLink href='/category/men' passHref>
            <Link>
              <Button color={activeLink('/category/men')}>Hombres</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/women' passHref>
            <Link>
              <Button color={activeLink('/category/women')}>Mujeres</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/kid' passHref>
            <Link>
              <Button color={activeLink('/category/kid')}>Niños</Button>
            </Link>
          </NextLink>
        </Box>
        <Box flex={1} />

        {/* Pantallas grandes */}
        {
          isSearchVisible
            ? (
              <Input
                className='fadeIn'
                sx={{ display: { xs: 'none', sm: 'flex' } }}
                autoFocus
                value={searchTerm}
                onChange={ (e) => setSearchTerm(e.target.value) }
                onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                type='text'
                placeholder="Buscar..."
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setIsSearchVisible(false)}
                        >
                          <ClearOutlined />
                        </IconButton>
                    </InputAdornment>
                }
              />
            )
            :(
              <IconButton
                sx={{ display: { xs: 'none', sm: 'flex' } }}
                onClick={() => setIsSearchVisible(true)}
              >
                <SearchOutlined />
              </IconButton>
            )
        }


        {/* Pantalla pequeñas */}
        <IconButton
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={toogleSideMenu}
        >
          <SearchOutlined />
        </IconButton>
        <NextLink href='/cart' passHref>
          <Link>
            <IconButton>
              <Badge badgeContent={numberOfItems > 9 ? '+9': numberOfItems} color='secondary'>
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button onClick={toogleSideMenu}>
          Menu
        </Button>
      </Toolbar>
    </AppBar>
  )
}
