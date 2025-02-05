import PropTypes from 'prop-types';

const ServiceCard = ({ service }) => {
  return (
    <div className='bg-white shadow-lg rounded-2xl overflow-hidden max-w-sm transition-transform transform hover:scale-105 hover:cursor-pointer w-1/4'>
      <img
        src={`${
          !Array.isArray(service?.serviceImageUrls) ||
          service?.serviceImageUrls.length === 0
            ? 'logo.png'
            : 'http://localhost:5212' + service?.serviceImageUrls[0]
        }`}
        alt={service?.serviceName}
        className='w-full h-48 object-cover'
      />

      <div className='p-4'>
        <h3 className='text-xl font-bold text-gray-800'>
          {service?.serviceName}
        </h3>
        <p className='text-sm text-gray-600 mt-2'>{service?.serviceDesc}</p>

        <span className='inline-block mt-3 text-xs text-white bg-primary px-3 py-1 rounded-full'>
          {service?.serviceTypeName}
        </span>
      </div>
    </div>
  );
};

ServiceCard.propTypes = {
  service: PropTypes.object.isRequired,
};

export default ServiceCard;
