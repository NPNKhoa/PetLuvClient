import { useDispatch } from 'react-redux';
import UserPetCardList from './UserPetCardList';
import { useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { getPetByUser } from '../../redux/thunks/petThunk';
import { toast } from 'react-toastify';
import LoadingComponent from '../common/LoadingComponent';
import { IoAddCircleOutline } from 'react-icons/io5';

const PetCollection = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const pets = useSelector((state) => state.pets.pets);
  const loading = useSelector((state) => state.pets.loading);

  const { userId } = useMemo(() => {
    return user || { userId: '' };
  }, [user]);

  useEffect(() => {
    dispatch(getPetByUser(userId))
      .unwrap()
      .then(() => {})
      .catch((error) => toast.error(error));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <div>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-4xl text-primary font-cute tracking-wide'>
          Bộ sưu tập thú cưng của bạn
        </h1>
        <button className='bg-primary text-white font-semibold flex justify-center items-center gap-1 px-10 py-3 rounded-full hover:text-tertiary-light hover:bg-primary-dark'>
          Thêm thú cưng <IoAddCircleOutline />
        </button>
      </div>
      {loading ? <LoadingComponent /> : <UserPetCardList pets={pets} />}
    </div>
  );
};

export default PetCollection;
