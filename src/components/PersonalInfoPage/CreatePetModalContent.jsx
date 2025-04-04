import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  InputAdornment,
  Tooltip,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ActionModal from '../common/ActionModal';
import { CloudUpload } from 'lucide-react';
import ActionImage from '../common/ActionImage';
import { useSelector } from 'react-redux';

// Form Validation Schema
const validationSchema = Yup.object({
  petName: Yup.string().required('Không được để trống trường này'),
  petDateOfBirth: Yup.date()
    .nullable()
    .required('Không được để trống trường này'),
  petGender: Yup.boolean().required('Không được để trống trường này'),
  petFurColor: Yup.string().required('Không được để trống trường này'),
  petWeight: Yup.number()
    .positive('Cân nặng phải > 0')
    .required('Không được để trống trường này'),
  petDesc: Yup.string(),
  petFamilyRole: Yup.string().nullable(),
  breedId: Yup.string().required('Không được để trống trường này'),
});

const CreatePetModal = ({ open, onClose, onSubmit }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imageReview, setImageReview] = useState([]);

  // Handle File Upload
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const imageObjects = files.map((file, index) => ({
      index,
      file,
      reviewUrl: URL.createObjectURL(file),
    }));
    setSelectedFiles(imageObjects.map((item) => item.file));
    setImageReview(imageObjects.map((file) => file.reviewUrl));
  };

  const handleDeleteUploadedImage = useCallback((index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setImageReview((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // pet breed

  const breedOptions = useSelector((state) => state.petBreeds.petBreeds);

  // Formik Setup
  const formik = useFormik({
    initialValues: {
      petName: '',
      petDateOfBirth: null,
      petGender: '',
      petFurColor: '',
      petWeight: '',
      petDesc: '',
      petFamilyRole: '',
      breedId: '',
      isVisible: true,
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit({ ...values, imageFiles: selectedFiles });
      onClose();
    },
  });

  return (
    <ActionModal title='Thêm thú cưng vào BST' open={open} onClose={onClose}>
      <form onSubmit={formik.handleSubmit} className='w-full space-y-4 m-4'>
        {/* Pet Name */}
        <TextField
          fullWidth
          label='Tên boss của bạn là gì?'
          name='petName'
          value={formik.values.petName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.petName && Boolean(formik.errors.petName)}
          helperText={formik.touched.petName && formik.errors.petName}
        />

        {/* Date of Birth */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label='Hãy cho chúng tôi biết ngày sinh thú cưng của bạn nhé'
            className='w-full'
            format='DD/MM/YYYY'
            value={formik.values.petDateOfBirth}
            onChange={(date) => formik.setFieldValue('petDateOfBirth', date)}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={
                  formik.touched.petDateOfBirth &&
                  Boolean(formik.errors.petDateOfBirth)
                }
                helperText={
                  formik.touched.petDateOfBirth && formik.errors.petDateOfBirth
                }
              />
            )}
          />
        </LocalizationProvider>

        {/* Pet Gender */}
        <FormControl fullWidth>
          <InputLabel>Boss của bạn là đực hay cái nào?</InputLabel>
          <Select
            name='petGender'
            label={`Boss của bạn là đực hay cái nào?`}
            value={formik.values.petGender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.petGender && Boolean(formik.errors.petGender)}
          >
            <MenuItem value={true}>Đực</MenuItem>
            <MenuItem value={false}>Cái</MenuItem>
          </Select>
        </FormControl>

        {/* Fur Color */}
        <TextField
          fullWidth
          label='Thú cưng của bạn có lông màu gì nhỉ'
          name='petFurColor'
          value={formik.values.petFurColor}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.petFurColor && Boolean(formik.errors.petFurColor)
          }
          helperText={formik.touched.petFurColor && formik.errors.petFurColor}
        />

        {/* Weight */}
        <TextField
          fullWidth
          label='Cân nặng là bao nhiêu?'
          name='petWeight'
          type='number'
          slotProps={{
            input: {
              endAdornment: <InputAdornment position='end'>kg</InputAdornment>,
            },
          }}
          value={formik.values.petWeight}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          onWheel={(e) => e.target.blur()}
          error={formik.touched.petWeight && Boolean(formik.errors.petWeight)}
          helperText={formik.touched.petWeight && formik.errors.petWeight}
        />

        {/* Description */}
        <TextField
          fullWidth
          label='Nói một chút về thú cưng của bạn nhé'
          name='petDesc'
          multiline
          rows={3}
          value={formik.values.petDesc}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {console.log(formik.values)}
        {/* Breed Selection */}
        <FormControl fullWidth>
          <InputLabel id='breed-selection-label'>
            Boss của bạn thuộc giống gì nhỉ? Nếu không rõ bạn có thể tham khảo
            thông qua hình ảnh nhé
          </InputLabel>
          <Select
            name='breedId'
            labelId='breed-selection-label'
            label={`Boss của bạn thuộc giống gì nhỉ? Nếu không rõ bạn có thể tham khảo
            thông qua hình ảnh nhé`}
            value={formik.values.breedId}
            onChange={(event) => {
              formik.setFieldValue('breedId', event.target.value);
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.breedId && Boolean(formik.errors.breedId)}
          >
            {breedOptions.map((breed) => (
              <Tooltip
                key={breed?.breedId}
                value={breed?.breedId}
                title={breed.breedDesc}
              >
                <MenuItem value={breed?.breedId}>
                  <img
                    src={`${breed?.illustrationImage}`}
                    alt={breed?.breedName}
                    className='w-12 h-12 object-contain me-2 rounded-md'
                  />
                  {breed?.breedName}
                </MenuItem>
              </Tooltip>
            ))}
          </Select>
        </FormControl>

        {/* File Upload */}
        <div className='space-y-2'>
          <label className='block font-medium'>Thêm ảnh cho thú cưng</label>
          <div className='relative w-full py-10 rounded-lg my-4 border-dashed border-2 border-gray-400 flex items-center justify-center cursor-pointer bg-gray-50'>
            <input
              type='file'
              multiple
              onChange={handleFileChange}
              className='absolute inset-0 opacity-0 cursor-pointer'
            />
            <div className='flex flex-col items-center justify-center text-gray-500'>
              <CloudUpload />
              <p>Click vào để thêm ảnh</p>
            </div>
          </div>
          {imageReview?.length > 0 && (
            <>
              <p className='text-sm text-gray-600'>
                Đã thêm {imageReview?.length} ảnh
              </p>
              <div className='grid grid-cols-4 gap-2'>
                {imageReview.map((item, index) => (
                  <ActionImage
                    src={item}
                    key={`pet-img-key-${index}`}
                    alt={`ảnh thú cưng ${index}`}
                    onDelete={handleDeleteUploadedImage}
                    index={index}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Submit Button */}
        <div className='flex items-center justify-end gap-4'>
          <button
            type='button'
            onClick={onClose}
            className='bg-gray-300 rounded-lg px-16 py-3 cursor-pointer hover:bg-gray-400'
          >
            Hủy
          </button>
          <button
            type='submit'
            className='bg-primary text-white rounded-lg px-16 py-3 cursor-pointer hover:bg-primary-dark'
          >
            Lưu
          </button>
        </div>
      </form>
    </ActionModal>
  );
};

CreatePetModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CreatePetModal;
