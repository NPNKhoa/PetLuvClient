import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import { Avatar, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = () => {
  const [navHovered, setNavHovered] = useState(false);
  const [searchHovered, setSearchHovered] = useState(false);

  const menuAnimation = useSpring({
    opacity: navHovered ? 1 : 0,
    transform: navHovered ? 'translateY(0)' : 'translateY(-20px)',
    config: { tension: 200, friction: 20 },
    delay: 100,
  });

  const searchAnimation = useSpring({
    opacity: searchHovered ? 1 : 0,
    transform: searchHovered ? 'translateY(0)' : 'translateY(-20px)',
    config: { tension: 200, friction: 20 },
    delay: 100,
  });

  return (
    <header className='bg-tertiary-light text-white flex items-center justify-between px-8'>
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
            className='absolute left-[-10rem] right-[-4rem] top-[2rem] bg-gray-200 flex flex-col p-4 mt-1 rounded-md'
          >
            <form>
              <p className='mb-2'>Tìm kiếm</p>
              <TextField size='small' placeholder='Nhập từ khóa...' />
            </form>
          </animated.div>
        </IconButton>

        <IconButton color='primary'>
          <ShoppingCartIcon />
        </IconButton>

        <Link
          to={'/dang-nhap'}
          className='px-4 py-2 rounded-md bg-primary-light hover:bg-primary-dark'
        >
          Đăng nhập
        </Link>
        {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
      </div>
    </header>
  );
};

export default Header;
