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
import BookingSummary from './BookingSummary';

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
  const selectedRooms = useSelector((state) => state.rooms.selectedRooms);

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

  const selectedRoomIds = useMemo(() => {
    return Array.isArray(selectedRooms) && selectedRooms.length !== 0
      ? selectedRooms.map((item) => item.roomId)
      : [];
  }, [selectedRooms]);

  const roomRentalTime = useSelector((state) => state.rooms.roomRentalTime);

  const bookingStartTime = useSelector(
    (state) => state.bookings.bookingStartTime
  );
  const bookingEndTime = useSelector((state) => state.bookings.bookingEndTime);

  const daysBetween = useMemo(() => {
    if (!bookingStartTime || !bookingEndTime || roomRentalTime) return null;

    const start = dayjs(bookingStartTime);
    const end = dayjs(bookingEndTime);

    // Calculate difference in days (rounded up if partial day)
    const diffInDays = Math.ceil(end.diff(start, 'day', true));
    return diffInDays > 0 ? diffInDays : 1; // Ensure at least 1 day
  }, [bookingStartTime, bookingEndTime, roomRentalTime]);

  const totalEstimateTime = useMemo(() => {
    if (!Array.isArray(selectedServices) && selectedServices.length === 0)
      return 0;

    let result = 0;

    selectedServices?.forEach((service) => {
      if (service === null) return 0;
      console.log(service);

      if (
        !Array.isArray(service.serviceVariants) ||
        service.serviceVariants.length === 0
      )
        return 0;

      service.serviceVariants.forEach((variant) => {
        if (
          variant.breedId === selectedBreedId &&
          variant.petWeightRange === selectedPetWeightRange
        ) {
          result += variant?.estimateTime;
        }
      });
    });

    return result;
  }, [selectedBreedId, selectedPetWeightRange, selectedServices]);
  console.log(totalEstimateTime);

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
      if (selectedServiceIds.length === 0 && selectedRoomIds.length === 0) {
        return toast.error('Vui lòng chọn ít nhất một dịch vụ');
      }

      const requestBody = {
        bookingStartTime: bookingStartTime
          ? bookingStartTime
          : formData.appointmentTime,
        bookingEndTime: bookingEndTime
          ? bookingEndTime
          : formData.appointmentTime.add(totalEstimateTime, 'hour'),
        bookingNote: formData.bookingNote,
        roomRentalTime: roomRentalTime ? roomRentalTime : daysBetween * 24,
        bookingTypeId: selectedTypeId,
        customerId: user.userId,
        customerEmail: user.email,
        petId: selectedPetId,
        breedId: selectedBreedId,
        petWeightRange: selectedPetWeightRange,
        serviceId:
          Array.isArray(selectedServiceIds) && selectedServiceIds.length > 0
            ? selectedServiceIds
            : null,
        roomId: selectedRoomIds?.[0],
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
    totalEstimateTime,
    bookingStartTime,
    bookingEndTime,
    roomRentalTime,
    selectedRoomIds.length,
    selectedRoomIds,
    daysBetween,
  ]);

  return (
    <div className='w-full flex flex-col items-center'>
      <h2 className='text-2xl font-bold mb-4'>Xác nhận thông tin</h2>
      <p className='text-gray-600 mb-6'>
        Vui lòng kiểm tra và chỉnh sửa thông tin trước khi đặt lịch.
      </p>

      <div className='w-full max-w-6xl mx-auto'>
        {/* Two-column layout */}
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Left column - Customer Information Form */}
          <div className='w-full lg:w-1/2'>
            <div className='bg-white rounded-lg shadow-md overflow-hidden h-full'>
              <div className='bg-primary text-white p-4'>
                <h3 className='text-xl font-semibold'>Thông tin khách hàng</h3>
              </div>

              <div className='p-6 space-y-6'>
                <TextField
                  label='Họ và tên'
                  name='fullName'
                  fullWidth
                  variant='outlined'
                  value={formData.fullName}
                  onChange={handleChange}
                  InputProps={{
                    className: 'bg-gray-50',
                  }}
                />

                <TextField
                  label='Email'
                  name='email'
                  type='email'
                  fullWidth
                  variant='outlined'
                  value={formData.email}
                  onChange={handleChange}
                  InputProps={{
                    className: 'bg-gray-50',
                  }}
                />

                <TextField
                  label='Số điện thoại'
                  name='phoneNumber'
                  type='tel'
                  fullWidth
                  variant='outlined'
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  InputProps={{
                    className: 'bg-gray-50',
                  }}
                />

                {bookingStartTime && bookingEndTime ? (
                  <div className='p-4 bg-gray-50 rounded-md'>
                    <p className='text-gray-700 font-medium'>
                      Thời gian đã được chọn:
                    </p>
                    <div className='flex flex-wrap justify-between gap-4 mt-2 mx-16'>
                      <div>
                        <span className='text-gray-500 text-sm'>Bắt đầu:</span>
                        <p className='font-medium'>
                          {dayjs(bookingStartTime).format('DD/MM/YYYY HH:mm')}
                        </p>
                      </div>
                      <div>
                        <span className='text-gray-500 text-sm'>Kết thúc:</span>
                        <p className='font-medium'>
                          {dayjs(bookingEndTime).format('DD/MM/YYYY HH:mm')}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      label='Thời gian hẹn'
                      disablePast={true}
                      value={formData.appointmentTime}
                      onChange={(newValue) =>
                        setFormData({ ...formData, appointmentTime: newValue })
                      }
                      className='w-full bg-gray-50'
                      slotProps={{
                        textField: {
                          variant: 'outlined',
                          fullWidth: true,
                        },
                      }}
                    />
                  </LocalizationProvider>
                )}

                <TextField
                  label='Ghi chú'
                  name='bookingNote'
                  type='text'
                  fullWidth
                  variant='outlined'
                  value={formData.bookingNote}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  placeholder='Nhập yêu cầu đặc biệt hoặc thông tin bổ sung về thú cưng của bạn...'
                  InputProps={{
                    className: 'bg-gray-50',
                  }}
                />
              </div>

              {totalEstimateTime > 0 && (
                <div className='p-4 bg-orange-50 border-t border-red-200'>
                  <div className='flex items-start'>
                    <div className='ml-3'>
                      <div className='flex justify-center items-center gap-1'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-8 w-8 text-red-500'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                          />
                        </svg>
                        <h3 className='text-red-500 text-lg font-semibold'>
                          Lưu ý:
                        </h3>
                      </div>
                      <p className='text-gray-700 text-left'>
                        Với các dịch vụ bạn đã chọn, thời gian{' '}
                        <span className='font-bold'>dự kiến</span> để chúng tôi
                        hoàn thành các dịch vụ này là khoảng{' '}
                        <span className='text-primary font-semibold text-[1.3rem]'>
                          {totalEstimateTime} giờ
                        </span>
                        . Vui lòng sắp xếp và đến cửa hàng{' '}
                        <span className='font-semibold'>đúng giờ hẹn</span> để
                        chúng tôi thực hiện việc chăm sóc sớm nhất, không làm
                        mất thời gian của bạn.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right column - Booking Summary */}
          <div className='w-full lg:w-1/2'>
            <BookingSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

ConfirmInforStepperContent.propTypes = {
  setHandleBook: PropTypes.func,
};

export default ConfirmInforStepperContent;
