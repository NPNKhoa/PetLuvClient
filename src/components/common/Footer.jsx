import { Box, Typography, Stack } from '@mui/material';
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
          <h1 className='text-primary-light uppercase font-semibold text-3xl mb-2'>
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
          <h1 className='text-primary-light uppercase font-semibold text-3xl mb-2'>
            Tại PetLuv có gì?
          </h1>
          <div>
            <Link
              to={'/dich-vu-spa'}
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
              to={'/thuc-an-cho-meo'}
              className='block my-2 hover:text-primary-dark'
            >
              Thức ăn thú cưng
            </Link>
            <Link
              to={'/san-pham-cho-meo'}
              className='block my-2 hover:text-primary-dark'
            >
              Bán chó, mèo
            </Link>
          </div>
        </Box>

        <Box className='text-left flex-1'>
          <h1 className='text-primary-light uppercase font-semibold text-3xl mb-2'>
            Liên hệ
          </h1>
          <Stack spacing={2}>
            <div className='flex items-center gap-2 hover:cursor-default hover:text-primary-light'>
              <IoMdMail /> khoab2110083@student.ctu.edu.vn
            </div>
            <div className='flex items-center gap-2 hover:cursor-default hover:text-primary-light'>
              <FaPhone /> 0916380593
            </div>
            <div className='flex items-center gap-2 hover:cursor-default hover:text-primary-light'>
              <GiPositionMarker /> đường 3/2, phường Xuân Khánh, quận Ninh Kiều
              TPCT
            </div>
          </Stack>
        </Box>
      </div>

      <hr className='w-full' />
      <Typography
        variant='body2'
        sx={{ marginTop: '1rem', color: '#aeaeae' }}
        className='hover:cursor-default hover:text-primary-dark'
      >
        © 2025 PetLuv. All rights reserved.
      </Typography>
    </div>
  );
};

export default Footer;
