import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import { Avatar, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { configHoverDropdownAnimation } from '../../configs/animationConfigurations';

const Header = () => {
  const navigate = useNavigate();

  const [navHovered, setNavHovered] = useState(false);
  const [searchHovered, setSearchHovered] = useState(false);

  const loggedInUser = localStorage.getItem('loggedInUser');

  const menuAnimation = useSpring(configHoverDropdownAnimation(navHovered));

  const searchAnimation = useSpring(
    configHoverDropdownAnimation(searchHovered)
  );

  // HANDLER EVENT FUNCTIONS

  const handleSearch = (e) => {
    e.preventDefault();

    alert('ok');
    loggedInUser
      ? localStorage.removeItem('loggedInUser')
      : localStorage.setItem('loggedInUser', 'user');
  };

  // SUPPORT FUNCTIONS
  return (
    <header className='bg-tertiary-light text-white flex items-center justify-between px-8 z-50'>
      {/* Logo */}
      <Link to={'/'} className='flex items-center'>
        <img src='/logo.png' alt='logo' className='w-24 h-[5.5rem]' />
        <h1 className='text-xl font-bold text-primary-light'>PetLuv</h1>
      </Link>

      {/* Navigation Links */}
      <nav className='hidden md:flex gap-8'>
        <Link
          to='/'
          className='text-primary-light font-semibold text-xl hover:text-primary-dark'
        >
          Trang chủ
        </Link>
        <Link
          to='/dich-vu'
          className='text-primary-light font-semibold text-xl hover:text-primary-dark'
        >
          Dịch vụ
        </Link>

        <div
          className='relative'
          onMouseEnter={() => setNavHovered(true)}
          onMouseLeave={() => setNavHovered(false)}
        >
          <a className='text-primary-light font-semibold text-xl hover:text-primary-dark hover:cursor-pointer'>
            Mua hàng
          </a>
          <animated.div
            style={menuAnimation}
            className='absolute left-0 bg-gray-200 flex flex-col py-2 right-[-3rem] mt-1 rounded-sm'
          >
            <Link
              to={'thuc-an'}
              className='px-4 py-1 text-lg text-primary-light hover:bg-primary-light hover:text-white'
            >
              Thức ăn
            </Link>
            <Link
              to={'thu-cung'}
              className='px-4 py-1 text-lg text-primary-light hover:bg-primary-light hover:text-white'
            >
              Thú cưng
            </Link>
          </animated.div>
        </div>

        <Link
          to='/dat-lich'
          className='text-primary-light font-semibold text-xl hover:text-primary-dark'
        >
          Đặt lịch
        </Link>
        <Link
          to='/lien-he'
          className='text-primary-light font-semibold text-xl hover:text-primary-dark'
        >
          Liên hệ
        </Link>
      </nav>

      {/* Search Bar */}
      <div className='flex items-center justify-between gap-4'>
        <IconButton
          color='primary'
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
            className='absolute left-[-12rem] right-[-2rem] top-[2rem] bg-gray-200 flex flex-col p-4 mt-1 rounded-md'
          >
            <form onSubmit={handleSearch}>
              <p className='mb-2'>Tìm kiếm</p>
              <TextField size='small' placeholder='Nhập từ khóa...' fullWidth />
            </form>
          </animated.div>
        </IconButton>

        <IconButton color='primary' onClick={() => navigate('/gio-hang')}>
          <ShoppingCartIcon />
        </IconButton>

        {loggedInUser ? (
          <Link to={'/trang-ca-nhan'}>
            <Avatar alt='Avatar' src='/static/images/avatar/1.jpg' />
          </Link>
        ) : (
          <Link
            to={'/dang-nhap'}
            className='px-4 py-2 rounded-md bg-primary-light hover:bg-primary-dark'
          >
            Đăng nhập
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
