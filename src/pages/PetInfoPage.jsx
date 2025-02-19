import { BigSizeIcon, CustomerPetInfo, ImageGallery } from '../components';
import CustomBreadCrumbs from '../components/common/CustomBreadCrumbs';
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RiHealthBookLine } from 'react-icons/ri';
import { GiFamilyTree } from 'react-icons/gi';

const mockImages = ['/logo.png', '/logo.png', '/logo.png', '/logo.png'];

const PetInfoPage = () => {
  const location = useLocation();
  const pet = useSelector((state) => state.pets.pet);
  const breedCrumbItems = useMemo(() => {
    // Implement logic get current route hear
    const pathnames = location.pathname.split('/').filter((x) => x);

    return pathnames.map((item, index) => {
      if (index >= pathnames.length - 2) return;

      const pathTo = `/${pathnames.slice(0, index + 1).join('/')}`;

      return (
        <Link
          key={`pet-info-${index}`}
          to={pathTo}
          className='text-primary hover:underline hover:text-primary-dark'
        >
          {decodeURIComponent(item)}
        </Link>
      );
    });
  }, [location]);

  const handleClickHealthBook = () => {
    // Open Modal
  };

  return (
    <div className='p-8'>
      <CustomBreadCrumbs
        breadCrumbItems={breedCrumbItems}
        className={'py-12'}
      />

      <div className='grid grid-cols-12 gap-6'>
        <div className='col-span-4'>
          <ImageGallery imageUrls={mockImages} />
          <BigSizeIcon
            icon={<RiHealthBookLine size={'4rem'} />}
            content={
              <h1 className='lg:text-lg md:text-sm font-cute tracking-wide'>
                Xem sổ sức khỏe của
                <div className='text-primary'>{pet?.petName}</div>
              </h1>
            }
            onClick={handleClickHealthBook}
          />
          <BigSizeIcon
            icon={<GiFamilyTree size={'4rem'} />}
            content={
              <h1 className='lg:text-lg md:text-sm font-cute tracking-wide'>
                Xem nguồn gốc của
                <div className='text-primary'>{pet?.petName}</div>
              </h1>
            }
            onClick={handleClickHealthBook}
          />
        </div>

        <div className='col-span-8'>
          <CustomerPetInfo />
        </div>
      </div>
    </div>
  );
};

export default PetInfoPage;
