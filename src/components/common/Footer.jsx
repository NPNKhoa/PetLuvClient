import { Box, Typography, Button, Stack } from '@mui/material';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'; // Các icon xã hội
import { Link } from 'react-router-dom';
import { IoMdMail } from 'react-icons/io';
import { FaPhone } from 'react-icons/fa6';
import { GiPositionMarker } from 'react-icons/gi';

const Footer = () => {
  return (
    <div className='bg-secondary-light text-tertiary-light pt-6 pb-4 text-center flex-1'>
      <div className='flex justify-between items-start gap-6 mb-8 px-4'>
        <Box className='bg-gray-50 w-36 h-36 rounded-full'>
          <img src='./logo.png' alt='logo' className='m-auto mt-2' />
        </Box>

        <Box className='flex-1 text-left'>
          <h1 className='text-primary-light uppercase font-bold text-4xl mb-2'>
            PetLuv
          </h1>
          <p className='italic'>
            {`PetLuv ra đời với mong muốn mang lại cho các "boss" những dịch vụ tốt nhất.
            Với nhiều năm kinh nghiệm trong ngành dịch vụ thú cưng bao gồm: Spa thú cưng, Khách sạn
            thú cưng, Dịch vụ thú cưng tại nhà,… PetLuv hứa hẹn sẽ là nơi mang lại 
            trải nghiệm tuyệt vời cho thú cưng của bạn.`}
          </p>
        </Box>

        <Box className='flex-1 text-left'>
          <h1 className='text-primary-light uppercase font-bold text-4xl mb-2'>
            Dịch vụ tại PetLuv
          </h1>
          <div>
            <Link
              to={'/spa-thu-cung'}
              className='block my-2 hover:text-primary-dark'
            >
              Spa thú cưng
            </Link>
            <Link
              to={'/khach-san-thu-cung'}
              className='block my-2 hover:text-primary-dark'
            >
              Khách sạn thú cưng
            </Link>
            <Link
              to={'/dat-cho-di-dao'}
              className='block my-2 hover:text-primary-dark'
            >
              Dắt chó đi dạo
            </Link>
          </div>
        </Box>

        <Box className='text-left flex-1'>
          <h1 className='text-primary-light uppercase font-bold text-4xl mb-2'>
            Liên hệ
          </h1>
          <Stack spacing={2}>
            <div className='flex items-center gap-2'>
              <IoMdMail /> khoab2110083@student.ctu.edu.vn
            </div>
            <div className='flex items-center gap-2'>
              <FaPhone /> 0916380593
            </div>
            <div className='flex items-center gap-2'>
              <GiPositionMarker /> đường 3/2, phường Xuân Khánh, quận Ninh Kiều
              TPCT
            </div>
          </Stack>

          <Box className='flex justify-center space-x-4 mt-4'>
            <Button
              component='a'
              href='https://facebook.com/nyka1603'
              target='_blank'
              sx={{ color: '#cfcfcf', '&:hover': { color: '#f79400' } }}
            >
              <FaFacebookF />
            </Button>
            <Button
              component='a'
              href='https://instagram.com'
              target='_blank'
              sx={{ color: '#cfcfcf', '&:hover': { color: '#f79400' } }}
            >
              <FaInstagram />
            </Button>
            <Button
              component='a'
              href='https://twitter.com'
              target='_blank'
              sx={{ color: '#cfcfcf', '&:hover': { color: '#f79400' } }}
            >
              <FaTwitter />
            </Button>
          </Box>
        </Box>
      </div>

      <hr className='w-full' />
      <Typography variant='body2' sx={{ marginTop: '1rem', color: '#aeaeae' }}>
        © 2025 PetLuv. All rights reserved.
      </Typography>
    </div>
  );
};

export default Footer;
