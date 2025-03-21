import { useCallback, useEffect, useMemo, useState } from 'react';
import { Stepper, Step, StepLabel, Button } from '@mui/material';
import { Pets, CheckCircle, Category } from '@mui/icons-material';
import { MdMedicalServices, MdOutlineTypeSpecimen } from 'react-icons/md';
import { FaDog, FaBath, FaHotel } from 'react-icons/fa';

import {
  ChoosePetStepperContent,
  ChooseServiceContainer,
  ChooseVariantStepperContent,
  ConfirmInforStepperContent,
} from '../components';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  resetSelectedService,
  resetSelectedVariant,
  setSelectedVariant,
} from '../redux/slices/serviceSlice';
import { useSelector } from 'react-redux';
import { resetSelectedPet, setSelectedPet } from '../redux/slices/petSlice';
import ChooseBookingTypeContent from '../components/BookingPage/ChooseBookingTypeContent';
import { getBookingTypes } from '../redux/thunks/bookingTypeThunk';
import { toast } from 'react-toastify';
import {
  resetSelectedType,
  setSelectedType,
} from '../redux/slices/bookingTypeSlice';
import { resetSelectedCombo } from '../redux/slices/serviceComboSlice';

const steps = [
  { label: 'Chọn loại booking', icon: <MdOutlineTypeSpecimen /> },
  { label: 'Chọn dịch vụ', icon: <MdMedicalServices /> },
  { label: 'Chọn biến thể', icon: <Category /> },
  { label: 'Chọn thú cưng', icon: <Pets /> },
  { label: 'Xác nhận thông tin', icon: <CheckCircle /> },
];

const BookingPage = () => {
  const { search } = useLocation();
  const dispatch = useDispatch();
  const params = new URLSearchParams(search);

  // Stepper initialization
  const serviceId = params.get('dichVu');
  const breedId = params.get('loai');
  const petWeightRange = params.get('canNang');

  const initialStep = useMemo(() => {
    if (serviceId !== null && breedId !== null && petWeightRange !== null)
      return 3;
    if (serviceId !== null) return 1;
    return 0;
  }, [breedId, petWeightRange, serviceId]);

  const [activeStep, setActiveStep] = useState(initialStep);

  const [handleBook, setHandleBook] = useState(null);

  // BookingType
  const bookingTypes = useSelector((state) => state.bookingTypes.bookingTypes);
  const selectedTypeId = useSelector(
    (state) => state.bookingTypes.selectedTypeId
  );

  const selectedType = useMemo(
    () => ({
      id: selectedTypeId,
      name: bookingTypes.find((type) => type.bookingTypeId === selectedTypeId)
        ?.bookingTypeName,
    }),
    [selectedTypeId, bookingTypes]
  );

  const formattedBookingTypes = useMemo(() => {
    return Array.isArray(bookingTypes) && bookingTypes.length !== 0
      ? bookingTypes.map((type) => ({
          id: type.bookingTypeId,
          label: type.bookingTypeName,
          icon: type.bookingTypeName.toLowerCase().includes('chăm sóc') ? (
            <FaBath className='text-primary w-12 h-12' />
          ) : type.bookingTypeName.toLowerCase().includes('dắt chó') ? (
            <FaDog className='text-primary w-12 h-12' />
          ) : (
            <FaHotel className='text-primary w-12 h-12' />
          ),
          description: type.bookingTypeDesc,
        }))
      : [];
  }, [bookingTypes]);

  const handleSelectBookingtype = useCallback(
    (typeId) => dispatch(setSelectedType(typeId)),
    [dispatch]
  );

  //
  const selectedBreed = useSelector((state) => state.services.selectedBreedId);

  // Service
  const selectedServices = useSelector(
    (state) => state.services.selectedServices
  );
  const selectedRooms = useSelector((state) => state.rooms.selectedRooms);

  // Pet
  const selectedPet = useSelector((state) => state.pets.selectedPetId);

  const handleSetPet = useCallback(
    (payload) => dispatch(setSelectedPet(payload)),
    [dispatch]
  );

  const selectedPetWeightRange = useSelector(
    (state) => state.services.selectedPetWeightRange
  );

  const handleSetVariant = useCallback(
    (payload) => dispatch(setSelectedVariant(payload)),
    [dispatch]
  );

  // Stepper Helpers
  const disableNext = useMemo(() => {
    switch (activeStep) {
      case 0:
        return selectedTypeId === null
          ? 'Vui lòng chọn ít nhất một loại dịch vụ để tiếp tục'
          : null;

      case 1:
        return (Array.isArray(selectedServices) &&
          selectedServices.length !== 0) ||
          (Array.isArray(selectedRooms) && selectedRooms.length !== 0)
          ? null
          : 'Vui lòng chọn ít nhất một dịch vụ để tiếp tục';

      case 2:
        return selectedBreed === null && selectedPetWeightRange === null
          ? 'Vui lòng chọn một biến thể để tiếp tục'
          : null;

      case 3:
        return selectedPet == null
          ? 'Vui lòng chọn một thú cưng để tiếp tục'
          : null;

      default:
        return null;
    }
  }, [
    activeStep,
    selectedTypeId,
    selectedServices,
    selectedRooms,
    selectedBreed,
    selectedPetWeightRange,
    selectedPet,
  ]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 1) {
      dispatch(resetSelectedService());
      dispatch(resetSelectedCombo());
      dispatch(resetSelectedType());
    }

    if (activeStep === 2) {
      dispatch(resetSelectedVariant());
    }

    if (activeStep === 3) {
      dispatch(resetSelectedPet());
    }

    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    dispatch(getBookingTypes({ pageIndex: 1, pageSize: 10 }))
      .unwrap()
      .then(() => {})
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      dispatch(resetSelectedService());
      dispatch(resetSelectedType());
      dispatch(resetSelectedVariant());
      dispatch(resetSelectedPet());
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [dispatch]);

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
          <ChooseBookingTypeContent
            bookingTypes={formattedBookingTypes}
            onSelect={handleSelectBookingtype}
          />
        ) : activeStep === 1 ? (
          <ChooseServiceContainer selectedBookingType={selectedType} />
        ) : activeStep === 2 ? (
          <ChooseVariantStepperContent setVariant={handleSetVariant} />
        ) : activeStep === 3 ? (
          <ChoosePetStepperContent setPet={handleSetPet} />
        ) : activeStep === 4 ? (
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
