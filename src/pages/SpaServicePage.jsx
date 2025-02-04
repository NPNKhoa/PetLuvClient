import { useDispatch } from 'react-redux';
import ServiceCard from '../components/ServicePage/ServiceCard';
import { useEffect } from 'react';
import { getServices } from '../redux/thunks/serviceThunk.js';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { NotFoundComponent } from '../components/index.js';

const SpaServicePage = () => {
  const dispatch = useDispatch();

  const services = useSelector((state) => state.services.services);
  const loading = useSelector((state) => state.services.loading);
  const error = useSelector((state) => state.services.error);

  useEffect(() => {
    dispatch(getServices(10));

    if (error) {
      toast.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

        {loading ? (
          <div className='flex justify-center items-center w-full'>
            <img
              src='./loading-cat.gif'
              alt='loading...'
              className='w-1/4 sm:w-1/3'
            />
          </div>
        ) : Array.isArray(services) && services.length === 0 ? (
          <NotFoundComponent name='dịch vụ' />
        ) : (
          <div className='flex justify-between items-center gap-4 mb-16 m-8'>
            {services?.map((item, index) => (
              <ServiceCard key={`service-${index}`} service={item} />
            ))}
          </div>
        )}
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

        <div className='flex justify-between items-center gap-4 mb-16 m-8'>
          {services.map((item, index) => (
            <ServiceCard key={`service-${index}`} service={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default SpaServicePage;
