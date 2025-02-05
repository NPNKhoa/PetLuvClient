import PropTypes from 'prop-types';
import NotFoundComponent from './NotFoundComponent';
import RoomCard from './RoomCard';

const RoomCardList = ({ roomList }) => {
  return (
    <section className='flex justify-between items-center gap-4 mb-16'>
      {!Array.isArray(roomList) || roomList.length === 0 ? (
        <NotFoundComponent name='phòng' />
      ) : (
        roomList.map((room, index) => (
          <RoomCard key={`service-${index}`} room={room} />
        ))
      )}
    </section>
  );
};

RoomCardList.propTypes = {
  roomList: PropTypes.array,
};

export default RoomCardList;
