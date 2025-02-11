import PropTypes from 'prop-types';
import NotFoundComponent from './NotFoundComponent';
import ServiceComboCard from './ServiceComboCard';

const ServiceComboCardList = ({ comboList }) => {
  return (
    <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-16 mt-8 mx-auto w-full'>
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
