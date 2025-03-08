import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { createBooking } from '../../redux/thunks/bookingThunk';
import { toast } from 'react-toastify';
import MyAlrt from '../../configs/alert/MyAlrt';
import {
  resetSelectedService,
  resetSelectedVariant,
} from '../../redux/slices/serviceSlice';
import { resetSelectedType } from '../../redux/slices/bookingTypeSlice';
import { resetSelectedPet } from '../../redux/slices/petSlice';

const ConfirmInforStepperContent = ({ setHandleBook }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    appointmentTime: dayjs(),
    bookingNote: '',
  });

  const selectedServices = useSelector(
    (state) => state.services.selectedServices
  );
  const selectedBreedId = useSelector(
    (state) => state.services.selectedBreedId
  );
  const selectedPetWeightRange = useSelector(
    (state) => state.services.selectedPetWeightRange
  );
  const selectedPetId = useSelector((state) => state.pets.selectedPetId);
  const selectedTypeId = useSelector(
    (state) => state.bookingTypes.selectedTypeId
  );

  const selectedServiceIds = useMemo(() => {
    return Array.isArray(selectedServices) && selectedServices.length !== 0
      ? selectedServices.map((item) => item.serviceId)
      : [];
  }, [selectedServices]);

  console.log(selectedServices);

  const totalEstimateTime = useMemo(() => {
    if (!Array.isArray(selectedServices) && selectedServices.length === 0)
      return 0;

    let result = 0;

    console.log(selectedServices.length);

    selectedServices?.forEach((service) => {
      if (service === null) return 0;

      if (
        !Array.isArray(service.serviceVariants) ||
        service.serviceVariants.length === 0
      )
        return 0;

      service.serviceVariants.forEach((variant) => {
        result += variant?.estimateTime;
      });
    });

    return result;
  }, [selectedServices]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirmBookingResult = useCallback(() => {
    dispatch(resetSelectedService());
    dispatch(resetSelectedType());
    dispatch(resetSelectedVariant());
    dispatch(resetSelectedPet());

    window.location.href = '/';
  }, [dispatch]);

  useEffect(() => {
    const handleBook = () => {
      if (selectedServiceIds.length === 0) {
        return toast.error('Vui lòng chọn ít nhất một dịch vụ');
      }

      const requestBody = {
        bookingStartTime: formData.appointmentTime,
        bookingEndTime: formData.appointmentTime.add(totalEstimateTime, 'hour'),
        bookingNote: formData.bookingNote,
        roomRentalTime: 0, // Fix later
        bookingTypeId: selectedTypeId,
        customerId: user.userId,
        customerEmail: user.email,
        petId: selectedPetId,
        breedId: selectedBreedId,
        petWeightRange: selectedPetWeightRange,
        serviceId: selectedServiceIds,
      };

      console.log(requestBody);

      dispatch(createBooking(requestBody))
        .unwrap()
        .then(() => {
          MyAlrt.Success(
            'Tạo lịch hẹn',
            'Đặt lịch hẹn thành công. Vui lòng kiểm tra email và xác nhận thanh toán',
            'Xác nhận',
            false,
            handleConfirmBookingResult
          );
        })
        .catch((err) => {
          toast.error(err);
          console.error(err);
        });
    };

    if (setHandleBook) {
      setHandleBook(() => handleBook);
    }
  }, [
    setHandleBook,
    formData,
    user,
    selectedPetId,
    selectedBreedId,
    selectedPetWeightRange,
    selectedServiceIds,
    selectedTypeId,
    dispatch,
    handleConfirmBookingResult,
  ]);

  return (
    <div className='w-full flex flex-col items-center'>
      <h2 className='text-2xl font-bold mb-4'>Xác nhận thông tin</h2>
      <p className='text-gray-600 mb-6'>
        Vui lòng kiểm tra và chỉnh sửa thông tin trước khi đặt lịch.
      </p>

      <div className='w-full max-w-md space-y-4'>
        <TextField
          label='Họ và tên'
          name='fullName'
          fullWidth
          variant='outlined'
          value={formData.fullName}
          onChange={handleChange}
        />
        <TextField
          label='Email'
          name='email'
          type='email'
          fullWidth
          variant='outlined'
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label='Số điện thoại'
          name='phoneNumber'
          type='tel'
          fullWidth
          variant='outlined'
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label='Thời gian hẹn'
            value={formData.appointmentTime}
            onChange={(newValue) =>
              setFormData({ ...formData, appointmentTime: newValue })
            }
            className='w-full'
          />
        </LocalizationProvider>
        <TextField
          label='Ghi chú'
          name='bookingNote'
          type='text'
          fullWidth
          variant='outlined'
          value={formData.bookingNote}
          onChange={handleChange}
        />
        {totalEstimateTime > 0 && (
          <p className='text-start'>
            <span className='text-red-500 text-2xl font-semibold'>Lưu ý: </span>
            Với các dịch vụ bạn đã chọn, thời gian{' '}
            <span className='font-bold'>dự kiến</span> để chúng tôi hoàn thành
            các dịch vụ này là khoảng{' '}
            <span className='text-primary-dark font-semibold text-[1.3rem]'>
              {totalEstimateTime} giờ
            </span>{' '}
            . Vui lòng sắp xếp và đến cửa hàng{' '}
            <span className='font-semibold'>đúng giờ hẹn</span> để chúng tôi
            thực hiện việc chăm sóc sớm nhất, không làm mất thời gian của bạn
          </p>
        )}
      </div>
    </div>
  );
};

ConfirmInforStepperContent.propTypes = {
  setHandleBook: PropTypes.func,
};

export default ConfirmInforStepperContent;
