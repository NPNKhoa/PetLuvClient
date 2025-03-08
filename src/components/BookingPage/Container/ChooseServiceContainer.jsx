import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import ChooseServiceStepperContent from '../ChooseServiceStepperContent';
import { useDispatch } from 'react-redux';
import {
  resetSelectedService,
  setSelectedService,
} from '../../../redux/slices/serviceSlice';

const ChooseServiceContainer = ({ selectedBookingType }) => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Tất cả');

  const services = useSelector((state) => state.services.services);
  const selectedServices = useSelector(
    (state) => state.services.selectedServices
  );

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      console.log(service);
      return (
        service?.serviceTypeName
          .toLowerCase()
          .trim()
          .includes(selectedBookingType.name.toLowerCase().trim()) && // filter by type
        // (category === 'Tất cả' || service?.category === category) && // filter by filter (TEMP)
        service?.serviceName?.toLowerCase().includes(search.toLowerCase()) // search
      );
    });
  }, [services, selectedBookingType, category, search]);

  const handleSelectService = (service) => {
    if (
      !selectedServices.find((item) => item.serviceId === service.serviceId)
    ) {
      dispatch(setSelectedService(service));
    }
  };

  const handleResetSelectedServices = () => {
    dispatch(resetSelectedService());
  };

  return (
    <ChooseServiceStepperContent
      services={filteredServices}
      selectedServices={selectedServices}
      onResetSelectedServices={handleResetSelectedServices}
      search={search}
      setSearch={setSearch}
      category={category}
      setCategory={setCategory}
      onSelectService={handleSelectService}
    />
  );
};

ChooseServiceContainer.propTypes = {
  selectedBookingType: PropTypes.object.isRequired,
};

export default ChooseServiceContainer;
