import PropTypes from 'prop-types';
import NotFoundComponent from './NotFoundComponent';
import ServiceComboCard from './ServiceComboCard';

const ServiceComboCardList = ({ comboList }) => {
  return (
    <section className='flex justify-between items-center gap-4 mb-16'>
      {!Array.isArray(comboList) || comboList.length === 0 ? (
        <NotFoundComponent name='combo' />
      ) : (
        comboList.map((service, index) => (
          <ServiceComboCard key={`service-${index}`} service={service} />
        ))
      )}
    </section>
  );
};

ServiceComboCardList.propTypes = {
  comboList: PropTypes.array,
};

export default ServiceComboCardList;
