import {AppBar,Box, Toolbar, IconButton, Typography,
  Menu, Container, Avatar, Tooltip, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {useState} from "react";
import Links from "./Links"
import { useDispatch, useSelector} from "react-redux";
import { RootState} from "../../store/index";
import { userAPI } from '../../store/APIs/UserAPI';
import { changeUserId } from '../../store/slicers/UserSlicer';

function Footer(){
  const {userId} = useSelector((state: RootState) => state.userReducer);
  const {data: user, refetch} = userAPI.useFetchOneUserQuery(userId as string);
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const LogOut = () => {
    handleCloseUserMenu();
    dispatch(changeUserId(null));
    localStorage.removeItem("userId");
      refetch();
  }

  return (<>
    {userId &&
    <AppBar position="fixed" sx={{backgroundColor: "#505A66"}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={handleOpenNavMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                display: { xs: 'block', md: 'none' },
                }}
              >
                <Links color="#505A66" close={handleCloseNavMenu} hasBorder={false}/>
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Links color="#FFFae5" close={()=>{}} hasBorder={true}/>
            </Box>
    
            <Box sx={{ flexGrow: 0, display : "flex" }}>
            {user &&
              <>
              <Typography variant="h6" sx={{ mr: "1vw", alignItems: "center",
                display: { xs: 'none', sm: 'flex' }, color: "#FFFAE5", cursor: "default"}}
              >
                {user.name}
                </Typography>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.name}/>
                </IconButton>
              </Tooltip>
              </> 
            }

              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={LogOut} >
                  <Typography sx={{color: "#505A66"}} variant="body2">
                    Выйти
                  </Typography>	
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
    </AppBar>
  }
  </>
  )
}
export default Footer;