import { BigSizeIcon, CustomerPetInfo, ImageGallery } from '../components';
import CustomBreadCrumbs from '../components/common/CustomBreadCrumbs';
import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RiHealthBookLine } from 'react-icons/ri';
import { GiFamilyTree } from 'react-icons/gi';
import ActionModal from '../components/common/ActionModal';
import PetInfoPageModalData from '../configs/modalData/PetInfoPageModalData';

const familyIconStyle = {
  rotate: '90%',
};

const PetInfoPage = () => {
  const location = useLocation();
  const pet = useSelector((state) => state.pets.pet);

  // BreadCrumbs
  const breedCrumbItems = useMemo(() => {
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

  const petImages = useMemo(() => {
    return Array.isArray(pet.petImagePaths)
      ? pet.petImagePaths.map((item) => item.petImagePath)
      : [];
  }, [pet]);

  const [key, setKey] = useState(null);
  // Family Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickHealthBook = () => {
    // Open Modal
  };

  const handleViewFamilyDetail = () => {
    setKey('family');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setKey(null);
    setIsModalOpen(false);
  };

  return (
    <div className='p-8'>
      <CustomBreadCrumbs
        breadCrumbItems={breedCrumbItems}
        className={'py-12'}
      />

      <div className='grid grid-cols-12 gap-6'>
        <div className='col-span-4'>
          <ImageGallery imageUrls={petImages} />
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
            icon={<GiFamilyTree size={'4rem'} style={familyIconStyle} />}
            content={
              <h1 className='lg:text-lg md:text-sm font-cute tracking-wide'>
                Xem nguồn gốc của
                <div className='text-primary'>{pet?.petName}</div>
              </h1>
            }
            onClick={handleViewFamilyDetail}
          />
          {key && (
            <ActionModal
              title={PetInfoPageModalData[key].setTitle(pet.petName)}
              open={isModalOpen}
              onClose={handleCloseModal}
            >
              {key && (
                <>
                  {console.log(pet)}
                  {PetInfoPageModalData[key].setContent({
                    familyPets: {},
                  })}
                </>
              )}
            </ActionModal>
          )}
        </div>

        <div className='col-span-8'>
          <CustomerPetInfo />
        </div>
      </div>
    </div>
  );
};

export default PetInfoPage;
