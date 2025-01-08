import { Box, Typography, Button } from '@mui/material';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'; // Các icon xã hội

const Footer = () => {
  return (
    <div className='bg-secondary-light text-tertiary-light pt-6 pb-4'>
      <Box className='mx-auto text-center'>
        <Typography variant='h6' gutterBottom>
          Liên hệ với chúng tôi
        </Typography>
        <Typography variant='body1' paragraph>
          Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ với chúng tôi qua các
          kênh dưới đây.
        </Typography>

        <Box className='flex justify-center space-x-4 mt-4 pb-10'>
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

        <hr className='w-full' />

        <Typography
          variant='body2'
          sx={{ marginTop: '1rem', color: '#aeaeae' }}
        >
          © 2025 PetLuv. All rights reserved.
        </Typography>
      </Box>
    </div>
  );
};

export default Footer;
