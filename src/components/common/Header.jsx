import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import { Avatar, Badge, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { hoverDropdownConfig } from '../../configs/animationConfigurations';
import { useSelector } from 'react-redux';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Header = () => {
  const navigate = useNavigate();

  const [navHovered, setNavHovered] = useState(false);
  const [searchHovered, setSearchHovered] = useState(false);

  const loggedInUser = useSelector((state) => state.auth.user);

  const menuAnimation = useSpring(hoverDropdownConfig(navHovered));

  const searchAnimation = useSpring(hoverDropdownConfig(searchHovered));

  // HANDLER EVENT FUNCTIONS

  const handleSearch = (e) => {
    e.preventDefault();

    alert('ok');
  };

  // SUPPORT FUNCTIONS
  return (
    <header className='bg-primary-light text-white flex items-center justify-between px-8 z-50 relative'>
      {/* Logo */}
      <Link to={'/'} className='flex items-center my-2'>
        <img src='/logo.png' alt='logo' className='w-[5.5rem] h-[5rem]' />
      </Link>

      {/* Navigation Links */}
      <nav className='hidden md:flex gap-8'>
        <Link
          to='/'
          className='text-white font-semibold text-xl hover:text-secondary-light'
        >
          Trang chủ
        </Link>
        <Link
          to='/gioi-thieu'
          className='text-white font-semibold text-xl hover:text-secondary-light'
        >
          Giới thiệu
        </Link>
        <Link
          to='/dich-vu'
          className='text-white font-semibold text-xl hover:text-secondary-light'
        >
          Dịch vụ
        </Link>

        <div
          className='relative'
          onMouseEnter={() => setNavHovered(true)}
          onMouseLeave={() => setNavHovered(false)}
        >
          <a className='text-white font-semibold text-xl hover:text-secondary-light hover:cursor-pointer'>
            Mua hàng
          </a>
          <animated.div
            style={menuAnimation}
            className='absolute left-0 bg-secondary-light flex flex-col py-2 right-[-3rem] mt-1 rounded-sm'
          >
            <Link
              to={'thuc-an'}
              className='px-4 py-1 text-lg text-white hover:bg-secondary hover:text-white'
            >
              Thức ăn
            </Link>
            <Link
              to={'thu-cung'}
              className='px-4 py-1 text-lg text-white hover:bg-secondary hover:text-white'
            >
              Thú cưng
            </Link>
          </animated.div>
        </div>

        <Link
          to='/dat-lich'
          className='text-white font-semibold text-xl hover:text-secondary-light'
        >
          Đặt lịch
        </Link>
        <Link
          to='/lien-he'
          className='text-white font-semibold text-xl hover:text-secondary-light'
        >
          Liên hệ
        </Link>
      </nav>

      {/* Search Bar */}
      <div className='flex items-center justify-between gap-4'>
        <IconButton
          color='secondary'
          className='relative'
          sx={{
            position: 'relative',
          }}
          onMouseEnter={() => setSearchHovered(true)}
          onMouseLeave={() => setSearchHovered(false)}
        >
          <SearchIcon />
          <animated.div
            style={searchAnimation}
            className='absolute left-[-12rem] right-[-2rem] top-[2rem] bg-secondary-light text-white flex flex-col p-4 mt-1 rounded-md'
          >
            <form onSubmit={handleSearch}>
              <p className='mb-2'>Tìm kiếm</p>
              <TextField
                size='small'
                placeholder='Nhập từ khóa...'
                fullWidth
                sx={{
                  input: {
                    color: 'white',
                    '::placeholder': {
                      color: 'white',
                      opacity: 1,
                      fontWeight: 200,
                    },
                  },
                }}
                color='primary'
              />
            </form>
          </animated.div>
        </IconButton>

        <IconButton>
          <Badge badgeContent={4} color='primary'>
            <NotificationsIcon color='secondary' />
          </Badge>
        </IconButton>

        <IconButton color='secondary' onClick={() => navigate('/gio-hang')}>
          <ShoppingCartIcon />
        </IconButton>
        {loggedInUser ? (
          <Link to={`/trang-ca-nhan`}>
            <Avatar
              alt={loggedInUser?.fullName || 'Avatar'}
              src={`${loggedInUser?.avatar}`}
            />
          </Link>
        ) : (
          <Link
            to={'/dang-nhap'}
            className='px-4 py-2 rounded-md bg-secondary hover:bg-secondary-light'
          >
            Đăng nhập
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
