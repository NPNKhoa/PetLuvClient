import { useMemo, useState } from 'react';
import { Stepper, Step, StepLabel, Button } from '@mui/material';
import { Pets, CheckCircle, Category } from '@mui/icons-material';
import { MdMedicalServices } from 'react-icons/md';

import {
  ChoosePetStepperContent,
  ChooseServiceStepperContent,
  ChooseVariantStepperContent,
  ConfirmInforStepperContent,
} from '../components';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  resetSelectedService,
  resetSelectedVariant,
  setSelectedService,
  setSelectedVariant,
} from '../redux/slices/serviceSlice';
import { useSelector } from 'react-redux';
import { resetSelectedPet, setSelectedPet } from '../redux/slices/petSlice';

const steps = [
  { label: 'Chọn dịch vụ', icon: <MdMedicalServices /> },
  { label: 'Chọn biến thể', icon: <Category /> },
  { label: 'Chọn thú cưng', icon: <Pets /> },
  { label: 'Xác nhận thông tin', icon: <CheckCircle /> },
];

const BookingPage = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const dispatch = useDispatch();

  const serviceId = params.get('dichVu');
  const breedId = params.get('loai');
  const petWeightRange = params.get('canNang');

  const initialStep = useMemo(() => {
    if (serviceId !== null && breedId !== null && petWeightRange !== null)
      return 2;
    if (serviceId !== null) return 1;
    return 0;
  }, [breedId, petWeightRange, serviceId]);

  const [activeStep, setActiveStep] = useState(initialStep);

  const [handleBook, setHandleBook] = useState(null);

  const handleSetService = (serviceIds) => {
    serviceIds.forEach((id) => {
      dispatch(setSelectedService(id));
    });
  };

  const handleSetVariant = (payload) => {
    dispatch(setSelectedVariant(payload));
  };

  const handleSetPet = (payload) => {
    dispatch(setSelectedPet(payload));
  };

  const selectedServices = useSelector(
    (state) => state.services.selectedServices
  );
  const selectedBreed = useSelector((state) => state.services.selectedBreedId);
  const selectedPetWeightRange = useSelector(
    (state) => state.services.selectedPetWeightRange
  );
  const selectedPet = useSelector((state) => state.pets.selectedPetId);

  const disableNext = useMemo(() => {
    if (
      (activeStep === 0 && !Array.isArray(selectedServices)) ||
      selectedServices.length === 0
    )
      return 'Vui lòng chọn ít nhất một dịch vụ để tiếp tục';

    if (
      activeStep === 1 &&
      selectedBreed === null &&
      selectedPetWeightRange === null
    )
      return 'Vui lòng chọn một biến thể để tiếp tục';

    if (activeStep === 2 && selectedPet == null)
      return 'Vui lòng chọn một thú cưng để tiếp tục';

    return null;
  }, [
    activeStep,
    selectedBreed,
    selectedPetWeightRange,
    selectedServices,
    selectedPet,
  ]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 1) {
      dispatch(resetSelectedService());
    }

    if (activeStep === 2) {
      dispatch(resetSelectedVariant());
    }

    if (activeStep === 3) {
      dispatch(resetSelectedPet());
    }

    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className='flex flex-col items-center p-8 max-w-6xl mx-auto'>
      <Stepper activeStep={activeStep} alternativeLabel className='w-full'>
        {steps.map((step, index) => (
          <Step key={index} completed={activeStep > index}>
            <StepLabel
              icon={step.icon}
              className={`text-lg font-semibold ${
                activeStep === index
                  ? 'text-primary'
                  : activeStep > index
                  ? 'text-green-600'
                  : 'text-gray-400'
              }`}
            >
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <div className='mt-8 text-center'>
        {activeStep === 0 ? (
          <ChooseServiceStepperContent setServices={handleSetService} />
        ) : activeStep === 1 ? (
          <ChooseVariantStepperContent setVariant={handleSetVariant} />
        ) : activeStep === 2 ? (
          <ChoosePetStepperContent setPet={handleSetPet} />
        ) : activeStep === 3 ? (
          <ConfirmInforStepperContent setHandleBook={setHandleBook} />
        ) : (
          <h1 className='text-2xl font-bold'>{steps[activeStep]?.label}</h1>
        )}
      </div>

      <div className='mt-8 flex justify-between w-full'>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          variant='contained'
        >
          Quay lại
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button
            variant='contained'
            color='success'
            className='text-white'
            onClick={handleBook}
          >
            Hoàn thành
          </Button>
        ) : (
          <Button
            disabled={disableNext !== null}
            onClick={handleNext}
            variant='contained'
            color='primary'
            className='text-white'
          >
            Tiếp tục
          </Button>
        )}
      </div>
      {disableNext && (
        <span className='text-md text-red-600 font-light ms-auto mt-2 italic'>
          {disableNext}
        </span>
      )}
    </div>
  );
};

export default BookingPage;
