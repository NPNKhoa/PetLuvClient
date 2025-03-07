import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { createBooking } from '../../redux/thunks/bookingThunk';
import { toast } from 'react-toastify';
import MyAlrt from '../../configs/alert/MyAlrt';

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

  const selectedServiceIds = useSelector(
    (state) => state.services.selectedServiceIds
  );
  const selectedBreedId = useSelector(
    (state) => state.services.selectedBreedId
  );
  const selectedPetWeightRange = useSelector(
    (state) => state.services.selectedPetWeightRange
  );
  const selectedPetId = useSelector((state) => state.pets.selectedPetId);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const handleBook = () => {
      const requestBody = {
        bookingStartTime: formData.appointmentTime,
        bookingEndTime: formData.appointmentTime.add(2, 'hour'), // Fix later
        bookingNote: formData.bookingNote,
        roomRentalTime: 0, // Fix later
        bookingTypeId: '872fcefe-b60c-4892-b6cb-0f2dde06c11e', // Fix later
        customerId: user.userId,
        customerEmail: user.email,
        petId: selectedPetId,
        breedId: selectedBreedId,
        petWeightRange: selectedPetWeightRange,
        serviceId: selectedServiceIds,
      };

      dispatch(createBooking(requestBody))
        .unwrap()
        .then(() => {
          MyAlrt.Success(
            'Tạo lịch hẹn',
            'Đặt lịch hẹn thành công. Vui lòng kiểm tra email và xác nhận thanh toán',
            'Xác nhận'
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
    dispatch,
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
          name='phone'
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
          name='note'
          type='text'
          fullWidth
          variant='outlined'
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

ConfirmInforStepperContent.propTypes = {
  setHandleBook: PropTypes.func,
};

export default ConfirmInforStepperContent;
