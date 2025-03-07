"use client";
import * as React from 'react';
import {
  alpha,
  AppBar,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';



interface NavBarProps {
    searchTerm: string;
    onSearchTermChange: (newTerm: string) => void;
    // You can also define other props or omit them if not needed
  }

/** Styled Search container */
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

/** Wrapper for the search icon */
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

/** The styled InputBase for the text input */
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + icon space
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '14ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function NavBar({ searchTerm, onSearchTermChange }: NavBarProps) {
  const router = useRouter();

  // Manage menu anchor for the popup <Menu>
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Manage the search input

  // Open/Close the menu
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
     // Handler for Add Article
     const handleAddArticle = () => {
      // Navigate to /feed/article/create
      router.push('/feed/article/create');
      handleMenuClose();
    };
  
      // Handler for Profile
      const handleProfile = () => {
        router.push('/profil');
        handleMenuClose();
      };
  
    // Handler for Logout
    const handleLogout = async () => {
      //logout service
      alert('User logged out');
      handleMenuClose();
    };
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearchTermChange(e.target.value);
      };
      const handleGoHome = () => {
        router.push('/feed/articles');
      };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Menu icon button */}
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleMenuOpen}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        {/* Popup Menu */}
        <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
          <MenuItem onClick={handleAddArticle}>Add Article</MenuItem>
          <MenuItem onClick={handleProfile}>Profile Page</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
        {/* Brand Title */}
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          onClick={handleGoHome}
        >
          SkillHub
        </Typography>

        {/* The Search Box */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            value={searchTerm}
            onChange={handleSearchChange}          />
        </Search>
      </Toolbar>
    </AppBar>
  );
}
