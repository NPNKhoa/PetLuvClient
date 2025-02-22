import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ImageGallery = ({ imageUrls }) => {
  const [selectedImage, setSelectedImage] = useState(imageUrls[0] || '');

  useEffect(() => {
    Array.isArray(imageUrls) && imageUrls.length !== 0 && setSelectedImage(imageUrls[0]);
  }, [imageUrls]);

  const handleChangeImage = (e) => {
    setSelectedImage(e.target.name);
  }

  return (
    <div className='flex flex-col'>
      <div className='w-full h-96 rounded-lg overflow-hidden shadow-lg'>
        <img
          src={selectedImage}
          alt={imageUrls}
          className='w-full h-full object-cover'
        />
      </div>
      <div className='mt-4 grid grid-cols-3 gap-2'>
        {imageUrls.map((url, index) => (
          <button
            key={index}
            name={url}
            onClick={handleChangeImage}
            className='focus:outline-none'
          >
            <img
              src={url}
              alt={`Thumbnail ${index + 1}`}
              className={`w-full h-24 object-cover rounded ${
                selectedImage === url ? 'ring-4 ring-primary' : ''
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

ImageGallery.propTypes = {
  imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageGallery;
