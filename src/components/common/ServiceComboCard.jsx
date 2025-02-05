import PropTypes from 'prop-types';
import { useMemo } from 'react';

const ServiceComboCard = ({ service }) => {
  const randomAngle = useMemo(() => {
    const multiples = [-90, -60, -30, 0, 30, 60, 90];
    const index = Math.floor(Math.random() * multiples.length);
    return multiples[index] + 10;
  }, []);

  return (
    <div className='bg-white shadow-xl rounded-2xl overflow-hidden max-w-sm transition-transform transform hover:scale-105 hover:shadow-2xl hover:cursor-pointer w-1/4 relative'>
      <div className='p-6'>
        <h3 className='text-2xl font-extrabold text-gray-900 z-10'>
          {service?.serviceComboName}
        </h3>
        <p className='mt-4 text-base text-gray-600 z-10 line-clamp-4'>
          {service?.serviceComboDesc}
        </p>
        <div className='mt-6'>
          <button className='w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors z-10'>
            Xem chi tiết
          </button>
        </div>
      </div>
      <img
        src='cat-paw.png'
        alt='Background decoration'
        className='absolute top-2 right-2 z-0'
        style={{
          width: '80px',
          transform: `rotate(${randomAngle}deg)`,
        }}
      />
    </div>
  );
};

ServiceComboCard.propTypes = {
  service: PropTypes.shape({
    serviceComboName: PropTypes.string.isRequired,
    serviceComboDesc: PropTypes.string.isRequired,
  }).isRequired,
};

export default ServiceComboCard;
