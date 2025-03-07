import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const ChoosePetStepperContent = ({ setPet }) => {
  const pets = useSelector((state) => state.pets.pets);
  const [selectedPetId, setSelectedPetId] = useState(null);

  const handlePetSelect = (petId) => {
    setSelectedPetId(petId);
    setPet(petId);
  };

  return (
    <div className='w-full flex flex-col items-center'>
      <h1 className='mb-2 text-3xl font-cute tracking-wide text-primary'>
        Chọn thú cưng của bạn
      </h1>
      <p className='mb-6 text-secondary-light'>
        Vui lòng chọn thú cưng phù hợp với dịch vụ đã chọn
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-4xl'>
        {pets.map((pet) => (
          <Card
            key={pet.petId}
            className={`p-4 cursor-pointer transition-all duration-300 border-2 rounded-lg hover:shadow-lg ${
              selectedPetId === pet.petId ? 'border-primary' : 'border-gray-200'
            }`}
            onClick={() => handlePetSelect(pet.petId)}
          >
            <img
              src={pet.petImagePaths[0]?.petImagePath || '/logo.png'}
              alt={pet.petName}
              className='w-full h-40 object-cover rounded-md'
            />
            <CardContent>
              <h2 className='font-bold text-primary text-xl mb-1'>
                {pet.petName}
              </h2>
              <p className='text-secondary text-start'>
                <span className='text-secondary-light text-sm'>Loài:</span>{' '}
                {pet.breedName}
              </p>
              <p className='text-secondary text-start'>
                <span className='text-secondary-light text-sm'>Cân nặng:</span>{' '}
                {pet.petWeight} kg
              </p>
            </CardContent>
          </Card>
        ))}

        <Card className='p-4 flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 hover:border-primary transition-all duration-300 rounded-lg'>
          <AddCircleOutlineIcon fontSize='large' color='primary' />
          <Typography variant='body1' className='mt-2 font-medium'>
            Thêm thú cưng mới
          </Typography>
        </Card>
      </div>
    </div>
  );
};

ChoosePetStepperContent.propTypes = {
  setPet: PropTypes.func,
};

export default ChoosePetStepperContent;
