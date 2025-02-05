import PropTypes from 'prop-types';
import ServiceCard from './ServiceCard';
import NotFoundComponent from './NotFoundComponent';

const ServiceCardList = ({ serviceList }) => {
  return (
    <section className='flex justify-between items-center gap-4 mb-16'>
      {!Array.isArray(serviceList) || serviceList.length === 0 ? (
        <NotFoundComponent name='dịch vụ' />
      ) : (
        serviceList.map((service, index) => (
          <ServiceCard key={`service-${index}`} service={service} />
        ))
      )}
    </section>
  );
};

ServiceCardList.propTypes = {
  serviceList: PropTypes.array,
};

export default ServiceCardList;
