import PropTypes from 'prop-types';
import formatCurrency from '../../utils/formatCurrency';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const ServiceComboInfo = ({ serviceCombo }) => {
  const { serviceComboId } = useParams();

  const [selectedVariant, setSelectedVariant] = useState({
    serviceComboId: '',
    breedId: '',
    weightRange: '',
  });

  const onSelectVariant = ({ breedId, weightRange }) => {
    setSelectedVariant({ serviceComboId, breedId, weightRange });
  };

  return (
    <div className='flex flex-col h-full'>
      <div className='mb-6'>
        <h1 className='text-4xl font-bold text-primary'>
          {serviceCombo?.serviceComboName}
        </h1>
        <p className='mt-4 text-lg line-clamp-4'>
          {serviceCombo?.serviceComboDesc}
        </p>
      </div>

      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-tertiary mb-4'>Giá combo</h2>
        {serviceCombo?.comboVariants &&
        serviceCombo.comboVariants.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {serviceCombo.comboVariants.map((variant, index) => (
              <div
                key={index}
                className={`bg-white shadow-md rounded-lg p-4 border border-gray-200 relative z-50 hover:cursor-pointer hover:scale-105 ${
                  selectedVariant.breedId === variant.breedId &&
                  selectedVariant.petWeightRange === variant.petWeightRange &&
                  'border-primary-light border-[3px]'
                }`}
                onClick={() => onSelectVariant(variant)}
              >
                <h2 className='font-bold text-lg text-secondary'>
                  {variant.breedName}{' '}
                </h2>
                <h3 className='font-bold text-lg text-secondary'>
                  <span>Trọng lượng: </span> {variant?.weightRange}
                </h3>
                <p className='text-gray-600 mt-2'>
                  Giá: {formatCurrency(variant.comboPrice)}
                </p>
                {selectedVariant.breedId === variant.breedId &&
                  selectedVariant.weightRange === variant.weightRange && (
                    <img
                      src='/cat-paw.png'
                      alt='cat-paw'
                      className='w-16 absolute right-0 top-0 -z-50 -rotate-45'
                    />
                  )}
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

ServiceComboInfo.propTypes = {
  serviceCombo: PropTypes.shape({
    serviceComboName: PropTypes.string.isRequired,
    serviceComboDesc: PropTypes.string.isRequired,
    serviceTypeName: PropTypes.string,
    comboVariants: PropTypes.arrayOf(
      PropTypes.shape({
        variantName: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
};

export default ServiceComboInfo;
