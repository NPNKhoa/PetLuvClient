import PropTypes from 'prop-types';
import { CircularProgress, TextField } from '@mui/material';
import NotFoundComponent from '../common/NotFoundComponent';
import RoomCardList from '../common/RoomCardList';
import ChosenRoomCard from './ChosenRoomCard';

const ChooseRoomStepperContent = ({
  rooms,
  loading,
  selectedRooms,
  onResetSelectedRooms,
  search,
  setSearch,
  onSelectRoom,
}) => {
  return (
    <div className='w-full flex flex-col items-center'>
      <h1 className='text-primary text-2xl font-cute tracking-wide my-6'>
        Chọn phòng cho thú cưng của bạn
      </h1>

      <TextField
        label='Tìm kiếm phòng'
        variant='outlined'
        className='w-3/5'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <CircularProgress />
      ) : !Array.isArray(rooms) || rooms.length === 0 ? (
        <NotFoundComponent name='phòng' />
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-16 mt-16 mx-auto w-full'>
          {rooms.map((room, index) => (
            <ChosenRoomCard
              key={`room-${index}`}
              room={room}
              onClick={() => onSelectRoom(room)}
            />
          ))}
        </div>
      )}

      <div>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl text-primary font-cute tracking-wider text-start'>
            Phòng đã chọn
          </h1>
          {Array.isArray(selectedRooms) && selectedRooms.length !== 0 && (
            <span
              onClick={onResetSelectedRooms}
              className='text-red-500 text-xl italic font-light me-8 hover:cursor-pointer hover:text-red-400'
            >
              Xóa tất cả
            </span>
          )}
        </div>
        <RoomCardList roomList={selectedRooms} />
      </div>
    </div>
  );
};

ChooseRoomStepperContent.propTypes = {
  rooms: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  selectedRooms: PropTypes.array.isRequired,
  onResetSelectedRooms: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  onSelectRoom: PropTypes.func.isRequired,
};

export default ChooseRoomStepperContent;
