import PropTypes from 'prop-types';
import ServiceCard from './ServiceCard';

const ServiceCardList = ({ serviceList }) => {
  return (
    <section className='flex justify-between items-center gap-4 mb-16'>
      {serviceList.map((service, index) => (
        <ServiceCard key={`service-${index}`} service={service} />
      ))}
    </section>
  );
};

ServiceCardList.propTypes = {
  serviceList: PropTypes.array,
};

export default ServiceCardList;
