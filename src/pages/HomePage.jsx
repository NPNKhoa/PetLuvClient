import { Link } from 'react-router-dom';
import { Carousel } from '../components';
import CategoryList from '../components/HomePage/CategoryList';
import { BiSupport } from 'react-icons/bi';
import ServiceCardList from '../components/common/ServiceCardList';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const HomePage = () => {
  return (
    <div>
      <Carousel />
      <CategoryList />
      <section className='flex w-full px-6 justify-between items-center gap-2 lg:flex-row md:flex-col mb-16'>
        <Link className='lg:w-[45%] md:w-full hover:opacity-90'>
          <img
            src='./spa-banner.webp'
            alt='Pet Hotel'
            className='rounded-lg object-cover'
          />
        </Link>
        <Link className='lg:w-[45%] md:w-full hover:opacity-90'>
          <img
            src='./hotel-banner.webp'
            alt='Pet Hotel'
            className='rounded-lg object-cover'
          />
        </Link>
      </section>
      <section>
        <h1 className='uppercase text-primary-light text-3xl text-center font-bold mb-4'>
          Dịch vụ nổi bật tại PetLuv
        </h1>
        <ServiceCardList />
      </section>
      <LazyLoadImage
        src='./grooming-banner.webp'
        alt='grooming banner'
        className='mb-16 px-32 hover:cursor-pointer'
        height='auto'
        width='100%'
      />
      <section>
        <h1 className='uppercase text-primary-light text-3xl text-center font-bold mb-4'>
          Dịch vụ gợi ý cho bạn
        </h1>
        <ServiceCardList />
      </section>
      <section className='flex items-center justify-center gap-8 bg-primary-light text-secondary-light text-3xl py-10'>
        <BiSupport size={'6rem'} className='text-primary-dark' />
        <h2>
          Hotline hỗ trợ 24/7 của chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc
          của bạn |{' '}
          <span className='text-white hover:text-gray-200 hover:cursor-pointer'>
            0916380593
          </span>
        </h2>
      </section>
    </div>
  );
};

export default HomePage;
