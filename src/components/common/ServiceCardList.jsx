import PropTypes from 'prop-types';
import ServiceCard from './ServiceCard';
import NotFoundComponent from './NotFoundComponent';

const ServiceCardList = ({ serviceList }) => {
  return (
    <section className='my-8'>
      {!Array.isArray(serviceList) || serviceList.length === 0 ? (
        <NotFoundComponent name='dịch vụ' />
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-16 mt-8 mx-auto w-full'>
          {serviceList.map((service, index) => (
            <ServiceCard key={`service-${index}`} service={service} />
          ))}
        </div>
      )}
    </section>
  );
};

ServiceCardList.propTypes = {
  serviceList: PropTypes.array,
};

export default ServiceCardList;
