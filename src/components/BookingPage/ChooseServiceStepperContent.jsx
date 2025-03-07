import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { TextField, MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';
import NotFoundComponent from '../common/NotFoundComponent';
import ChosenServiceCard from './ChosenServiceCard';
import ServiceCardList from '../common/ServiceCardList';

// const services = [
//   { name: "Tắm cho thú cưng", category: "Chăm sóc" },
//   { name: "Cắt tỉa lông", category: "Chăm sóc" },
//   { name: "Khám sức khỏe", category: "Y tế" },
//   { name: "Tiêm phòng", category: "Y tế" },
// ];

const categories = ['Tất cả', 'Chăm sóc', 'Y tế'];

const ChooseServiceStepperContent = ({ setServices }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Tất cả');

  const services = useSelector((state) => state.services.services);

  const filteredServices = useMemo(() => {
    return services.filter(
      (service) =>
        (category === 'Tất cả' || service?.category === category) &&
        service?.serviceName?.toLowerCase().includes(search?.toLowerCase())
    );
  }, [services, category, search]);

  const [selectedServices, setSelectedServices] = useState([]);

  const handleSelectCard = (e) => {
    console.log(filteredServices);
    const newArray = filteredServices.filter(
      (item) => String(item.serviceId) === e.currentTarget.dataset.id
    );

    setSelectedServices((prev) => {
      const updatedServices = [...prev, ...newArray];
      setServices(updatedServices.map((item) => item.serviceId));
      return updatedServices;
    });
  };

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='flex gap-4 w-full max-w-3xl mb-6'>
        <TextField
          label='Tìm kiếm dịch vụ'
          variant='outlined'
          className='w-4/5'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TextField
          select
          label='Danh mục'
          className='w-1/5'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          variant='outlined'
        >
          {categories.map((cat, index) => (
            <MenuItem key={index} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>
      </div>
      {!Array.isArray(filteredServices) || filteredServices.length === 0 ? (
        <NotFoundComponent name='dịch vụ' />
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-16 mt-8 mx-auto w-full'>
          {filteredServices.map((service, index) => (
            <ChosenServiceCard
              key={`service-${index}`}
              service={service}
              onClick={handleSelectCard}
            />
          ))}
        </div>
      )}

      <div>
        <h1 className='text-2xl text-primary font-cute tracking-wider'>
          Dịch vụ đã chọn
        </h1>
        <div>
          <ServiceCardList serviceList={selectedServices} />
        </div>
      </div>
    </div>
  );
};

ChooseServiceStepperContent.propTypes = {
  setServices: PropTypes.any,
};

export default ChooseServiceStepperContent;
