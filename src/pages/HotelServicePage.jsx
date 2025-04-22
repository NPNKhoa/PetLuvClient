import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getRooms } from '../redux/thunks/roomThunk';
import RoomCardList from '../components/common/RoomCardList';
import { toast } from 'react-toastify';

const HotelServicePage = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.rooms.loading);
  const error = useSelector((state) => state.rooms.error);
  const rooms = useSelector((state) => state.rooms.rooms);

  const catRooms = useMemo(
    () => rooms.filter((room) => room.roomDesc.toLowerCase().includes('mèo')),
    [rooms]
  );

  const dogRooms = useMemo(
    () => rooms.filter((room) => room.roomDesc.toLowerCase().includes('chó')),
    [rooms]
  );

  useEffect(() => {
    dispatch(getRooms({ pageIndex: 1, pageSize: 10 }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div>
      <div className='relative w-full h-[30rem]'>
        <div
          className='absolute inset-0 bg-cover bg-center blur-[2px]'
          style={{ backgroundImage: "url('./cat-hotel.jpg')" }}
        ></div>

        <div className='absolute inset-0 bg-black/30 flex items-center justify-center'>
          <h1 className='text-primary text-6xl font-cute tracking-wider'>
            Khách sạn thú cưng
          </h1>
        </div>
      </div>

      <section>
        <div>
          <h1 className='text-3xl font-semibold text-center text-primary mt-4 mb-2'>
            Khách sạn cho chó
          </h1>
          <img
            src='./cute_separator.png'
            alt='cute_separator'
            className='mx-auto'
          />
        </div>

        <div className='m-8'>
          {loading ? (
            <div className='flex justify-center items-center w-full'>
              <img
                src='./loading-cat.gif'
                alt='loading...'
                className='w-1/4 sm:w-1/3'
              />
            </div>
          ) : (
            <RoomCardList roomList={dogRooms} />
          )}
        </div>
      </section>

      <section>
        <div>
          <h1 className='text-3xl font-semibold text-center text-primary mt-4 mb-2'>
            Khách sạn cho mèo
          </h1>
          <img
            src='./cute_separator.png'
            alt='cute_separator'
            className='mx-auto'
          />
        </div>

        <div className='m-8'>
          {loading ? (
            <div className='flex justify-center items-center w-full'>
              <img
                src='./loading-cat.gif'
                alt='loading...'
                className='w-1/4 sm:w-1/3'
              />
            </div>
          ) : (
            <RoomCardList roomList={catRooms} />
          )}
        </div>
      </section>
    </div>
  );
};

export default HotelServicePage;
