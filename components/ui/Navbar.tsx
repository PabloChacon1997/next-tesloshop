import NextLink from 'next/link';
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material';
import ShoppingCartOutlined  from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import ClearOutlined from '@mui/icons-material/ClearOutlined';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { UIContext } from '../../context';



export const Navbar = () => {

  const router = useRouter();

  const { toogleSideMenu } = useContext(UIContext);

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
              <Badge badgeContent={2} color='secondary'>
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
