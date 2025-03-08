import PropTypes from 'prop-types';
import { TextField, MenuItem } from '@mui/material';
import NotFoundComponent from '../common/NotFoundComponent';
import ChosenServiceCard from './ChosenServiceCard';
import ServiceCardList from '../common/ServiceCardList';

const categories = ['Tất cả', 'Chăm sóc', 'Y tế'];

const ChooseServiceStepperContent = ({
  services,
  selectedServices,
  onResetSelectedServices,
  search,
  setSearch,
  category,
  setCategory,
  onSelectService,
}) => {
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

      {!Array.isArray(services) || services.length === 0 ? (
        <NotFoundComponent name='dịch vụ' />
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-16 mt-8 mx-auto w-full'>
          {services.map((service, index) => (
            <ChosenServiceCard
              key={`service-${index}`}
              service={service}
              onClick={() => onSelectService(service)}
            />
          ))}
        </div>
      )}

      <div>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl text-primary font-cute tracking-wider text-start'>
            Dịch vụ đã chọn
          </h1>
          {Array.isArray(selectedServices) && selectedServices.length !== 0 && (
            <span
              onClick={onResetSelectedServices}
              className='text-red-500 text-xl italic font-light me-8 hover:cursor-pointer hover:text-red-400'
            >
              Xóa tất cả
            </span>
          )}
        </div>
        <ServiceCardList serviceList={selectedServices} />
      </div>
    </div>
  );
};

ChooseServiceStepperContent.propTypes = {
  services: PropTypes.array.isRequired,
  selectedServices: PropTypes.array.isRequired,
  onResetSelectedServices: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
  onSelectService: PropTypes.func.isRequired,
};

export default ChooseServiceStepperContent;
