import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getServices } from '../redux/thunks/serviceThunk.js';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ServiceCardList, ServiceComboCardList } from '../components/index.js';
import { getServiceCombos } from '../redux/thunks/serviceComboThunk.js';

const SpaServicePage = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.services.loading);
  const services = useSelector((state) => state.services.services);
  const error = useSelector((state) => state.services.error);

  const comboLoading = useSelector((state) => state.serviceCombos.loading);
  const serviceCombos = useSelector(
    (state) => state.serviceCombos.serviceCombos
  );
  const comboError = useSelector((state) => state.serviceCombos.error);

  useEffect(() => {
    dispatch(getServices({ pageIndex: 1, pageSize: 10 }));
    dispatch(getServiceCombos({ pageIndex: 1, pageSize: 10 }));

    if (error) {
      toast.error(error);
    }

    if (comboError) {
      toast.error(comboError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, comboError]);

  return (
    <div>
      <div className='relative w-full h-[30rem]'>
        <div
          className='absolute inset-0 bg-cover bg-center blur-[2px]'
          style={{ backgroundImage: "url('./dog-grooming.jpg')" }}
        ></div>

        <div className='absolute inset-0 bg-black/30 flex items-center justify-center'>
          <h1 className='text-primary text-6xl font-cute tracking-wider'>
            Dịch vụ spa
          </h1>
        </div>
      </div>

      <section>
        <div>
          <h1 className='text-3xl font-semibold text-center text-primary mt-4 mb-2'>
            Dịch vụ lẻ
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
            <ServiceCardList serviceList={services} />
          )}
        </div>
      </section>

      <section>
        <div>
          <h1 className='text-3xl font-semibold text-center text-primary mt-4 mb-2'>
            Combo
          </h1>
          <img
            src='./cute_separator.png'
            alt='cute_separator'
            className='mx-auto'
          />
        </div>

        <div className='m-10 mb-24'>
          {comboLoading ? (
            <div className='flex justify-center items-center w-full'>
              <img
                src='./loading-cat.gif'
                alt='loading...'
                className='w-1/4 sm:w-1/3'
              />
            </div>
          ) : (
            <ServiceComboCardList comboList={serviceCombos} />
          )}
        </div>
      </section>
    </div>
  );
};

export default SpaServicePage;
