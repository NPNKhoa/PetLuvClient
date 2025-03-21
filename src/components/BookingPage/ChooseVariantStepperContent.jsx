import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography } from '@mui/material';
import formatCurrency from '../../utils/formatCurrency';

const ChooseVariantStepperContent = ({ setVariant }) => {
  const selectedServices = useSelector(
    (state) => state.services.selectedServices
  );

  const [selectedVariants, setSelectedVariants] = useState({});

  const handleVariantSelect = (serviceId, breedId, petWeightRange) => {
    setVariant({ breedId, petWeightRange });
    setSelectedVariants({ serviceId, breedId, petWeightRange });
  };

  return (
    <div className='w-full flex flex-col items-center'>
      <h1 className='mb-2 text-3xl font-cute tracking-wide text-primary'>
        Chọn biến thể cho dịch vụ đã chọn
      </h1>
      <p className='mb-6 text-secondary-light'>
        Vui lòng chọn biến thể phù hợp với thú cưng của bạn
      </p>

      {selectedServices.map((service) => (
        <div key={service.serviceId} className='w-full max-w-3xl mb-8'>
          <Card className='p-4 shadow-lg shadow-orange-600 mt-4'>
            <h1 className='font-bold text-primary text-2xl mb-1'>
              {service.serviceName}
            </h1>
            <Typography variant='body2' className='text-gray-500'>
              Loại: {service.serviceTypeName}
            </Typography>

            <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4'>
              {service.serviceVariants?.map((variant, index) => (
                <Card
                  key={`variant-${index}`}
                  className={`p-4 cursor-pointer transition-all duration-300 border-2 rounded-lg hover:shadow-lg ${
                    selectedVariants.serviceId === variant.serviceId &&
                    selectedVariants.breedId === variant.breedId &&
                    selectedVariants.petWeightRange === variant.petWeightRange
                      ? 'border-primary border-[2px]'
                      : 'border-gray-200'
                  }`}
                  onClick={() =>
                    handleVariantSelect(
                      service.serviceId,
                      variant.breedId,
                      variant.petWeightRange
                    )
                  }
                >
                  <CardContent>
                    <h2 className='w-full font-bold text-sm text-secondary-light flex justify-start items-center gap-2 mb-4'>
                      <span>{variant.breedName}</span>
                      <span>{variant?.petWeightRange}</span>
                    </h2>
                    <p className='font-bold text-xl text-primary-light'>
                      {formatCurrency(variant.price)}
                    </p>
                    {selectedVariants.breedId === variant.breedId &&
                      selectedVariants.petWeightRange ===
                        variant.petWeightRange && (
                        <img
                          src='/cat-paw.png'
                          alt='cat-paw'
                          className='w-16 absolute right-0 top-0 -z-50 -rotate-45'
                        />
                      )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

ChooseVariantStepperContent.propTypes = {
  setVariant: PropTypes.func,
};

export default ChooseVariantStepperContent;
