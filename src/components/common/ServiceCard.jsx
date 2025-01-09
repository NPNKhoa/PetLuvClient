import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import { Card, CardContent, CardMedia } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import { fadeInConfig } from '../../configs/animationConfigurations';

const ServiceCard = ({ service }) => {
  const fadeIn = useSpring(fadeInConfig());

  return (
    <animated.div style={fadeIn} className='w-full max-w-sm mx-auto p-4'>
      <Card className='shadow-lg hover:shadow-2xl transition-shadow duration-300'>
        <CardMedia
          component='img'
          alt={service.serviceName}
          height='200'
          image={service.serviceImagePath}
          className='object-cover rounded-t-lg'
        />
        <CardContent>
          <h1 className='text-primary font-bold mb-2'>{service.serviceName}</h1>
          <p className='mb-8 lg:line-clamp-4 md:line-clamp-3'>
            {service.serviceDesc}
          </p>
          <div className='flex items-center justify-end text-primary-light hover:cursor-pointer hover:text-primary-dark'>
            Đặt lịch ngay
            <ChevronRight />
          </div>
        </CardContent>
      </Card>
    </animated.div>
  );
};

ServiceCard.propTypes = {
  service: PropTypes.shape({
    serviceImagePath: PropTypes.string.isRequired,
    serviceName: PropTypes.string.isRequired,
    serviceDesc: PropTypes.string.isRequired,
  }).isRequired,
};

export default ServiceCard;
