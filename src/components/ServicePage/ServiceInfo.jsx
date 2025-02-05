import PropTypes from 'prop-types';
import formatCurrency from '../../utils/formatCurrency';

const ServiceInfo = ({ service }) => {
  return (
    <div className='flex flex-col h-full'>
      <div className='mb-6'>
        <h1 className='text-4xl font-bold text-primary'>
          {service?.serviceName}
        </h1>
        <p className='mt-4 text-lg line-clamp-4'>{service?.serviceDesc}</p>
        {service?.serviceTypeName && (
          <div className='mt-4'>
            <span className='inline-block bg-secondary-light text-white px-4 py-2 rounded-full text-sm font-semibold'>
              {service.serviceTypeName}
            </span>
          </div>
        )}
      </div>

      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-tertiary mb-4'>Giá dịch vụ</h2>
        {service?.serviceVariants && service.serviceVariants.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {service.serviceVariants.map((variant, index) => (
              <div
                key={index}
                className='bg-white shadow-md rounded-lg p-4 border border-gray-200'
              >
                <h2 className='font-bold text-lg text-secondary'>
                  {variant.breedId}{' '}
                  {/* TODO: Thay backend thanh breed name + hien thi o day */}
                </h2>
                <h3 className='font-bold text-lg text-secondary'>
                  <span>Trọng lượng: </span> {variant?.petWeightRange}
                </h3>
                <p className='text-gray-600 mt-2'>
                  Giá: {formatCurrency(variant.price)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-gray-500'>Không có biến thể nào.</p>
        )}
      </div>

      <div className='mt-auto'>
        <button className='w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg transition-colors'>
          Đặt lịch ngay
        </button>
      </div>
    </div>
  );
};

ServiceInfo.propTypes = {
  service: PropTypes.shape({
    serviceName: PropTypes.string.isRequired,
    serviceDesc: PropTypes.string.isRequired,
    serviceTypeName: PropTypes.string,
    serviceVariants: PropTypes.arrayOf(
      PropTypes.shape({
        variantName: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
};

export default ServiceInfo;
