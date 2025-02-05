import PropTypes from 'prop-types';
import formatCurrency from '../../utils/formatCurrency';

const RoomInfo = ({ room }) => {
  return (
    <div className='flex flex-col h-full'>
      <div className='mb-6'>
        <h1 className='text-4xl font-bold text-primary'>{room?.roomName}</h1>
        <p className='mt-4 text-lg text-tertiary'>{room?.roomDesc}</p>
        {room?.roomTypeName && (
          <div className='mt-4'>
            <span className='inline-block bg-secondary-light text-white px-4 py-2 rounded-full text-sm font-semibold'>
              {room.roomTypeName}
            </span>
          </div>
        )}
      </div>
      <div className='mb-6 space-y-2'>
        <p className='text-lg text-gray-800'>
          <span className='font-semibold'>Giá theo giờ: </span>
          {formatCurrency(room?.pricePerHour)}
        </p>
        <p className='text-lg text-gray-800'>
          <span className='font-semibold'>Giá theo ngày: </span>
          {formatCurrency(room?.pricePerDay)}
        </p>
      </div>
      <div className='mt-auto'>
        <button className='w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg transition-colors'>
          Đặt lịch ngay
        </button>
      </div>
    </div>
  );
};

RoomInfo.propTypes = {
  room: PropTypes.object.isRequired,
};

export default RoomInfo;
