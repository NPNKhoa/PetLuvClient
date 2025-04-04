import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { format, parseISO } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { getPetInfo } from '../../redux/thunks/petThunk';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  petName: Yup.string().required('Tên thú cưng không được để trống'),
  dateOfBirth: Yup.date().required(),
  petGender: Yup.string()
    .oneOf(['true', 'false'], 'Giới tính phải là Nam hoặc Nữ')
    .required('Giới tính không được để trống'),
  petWeight: Yup.string().required('Cân nặng không được để trống'),
  petBreed: Yup.string().required('Giống không được để trống'),
  petType: Yup.string().required('Loài không được để trống'),
});

const dateFormat = 'dd/MM/yyyy';

const CustomerPetInfo = () => {
  const { petId } = useParams();
  const dispatch = useDispatch();

  const pet = useSelector((state) => state.pets.pet);
  const loading = useSelector((state) => state.pets.loading);
  const error = useSelector((state) => state.pets.error);

  const initialPetValues = useMemo(
    () => ({
      petName: pet?.petName || '',
      dateOfBirth: pet?.petDateOfBirth ? parseISO(pet?.petDateOfBirth) : null,
      petGender: pet?.petGender || '',
      petFurColor: pet?.petFurColor || '',
      petWeight: pet?.petWeight || 0,
      petDesc: pet?.petDesc || '',
      petMother: pet?.petMother || '',
      petFather: pet?.petFather || '',
      petBreed: pet?.petBreed || '',
      petType: pet?.petType || '',
      petChildren: pet?.petChildren || '',
      petImages: pet?.petImagePaths || [],
    }),
    [pet]
  );

  useEffect(() => {
    setFormValues(initialPetValues);
  }, [initialPetValues]);

  const [editMode, setEditMode] = useState(false);

  const [formValues, setFormValues] = useState(initialPetValues);

  const [errors, setErrors] = useState({});

  const handleToggleEdit = () => {
    setEditMode((prev) => !prev);
    if (!editMode) {
      setErrors({});
    }
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const getLabelSx = (fieldName) => ({
    color:
      formValues[fieldName] !== initialPetValues[fieldName]
        ? 'green'
        : 'text.primary',
  });

  // APIs

  useEffect(() => {
    dispatch(getPetInfo(petId));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [petId]);

  const handleUpdate = () => {
    validationSchema
      .validate(formValues, { abortEarly: false })
      .then((validData) => {
        setErrors({});
        // const payload = {
        //   ...validData,
        //   dateOfBirth: validData.dateOfBirth
        //     ? format(validData.dateOfBirth, 'dd/MM/yyyy')
        //     : null,
        // };
        // dispatch(updateUserInfo({ userId, payload }));
        toast.success('Cập nhật thông tin người dùng thành công');
        setEditMode(false);
      })
      .catch((validationError) => {
        const errorObj = {};
        validationError.inner.forEach((err) => {
          errorObj[err.path] = err.message;
        });
        setErrors(errorObj);
      });
  };

  // Error hanlder
  useEffect(() => {
    toast.error(error);
  }, [error]);

  return (
    <Box sx={{ px: 3 }}>
      <h2 className='text-2xl text-primary font-cute tracking-wide mb-4'>
        Thông tin thú cưng
      </h2>
      <Stack spacing={3} className='overflow-y-auto h-[100vh]'>
        <div className='flex justify-start items-center gap-4'>
          <span className='text-sm text-tertiary-dark font-light'>Chế độ:</span>
          <FormControlLabel
            control={<Switch checked={editMode} onChange={handleToggleEdit} />}
            label={editMode ? 'Sửa' : 'Xem'}
          />
        </div>
        {/* Các ô input hiển thị thông tin người dùng theo dạng stack */}
        <TextField
          fullWidth
          label='Tên'
          name='petName'
          value={formValues.petName}
          onChange={handleChange}
          disabled={!editMode}
          variant='outlined'
          InputLabelProps={{ sx: getLabelSx('petName') }}
          error={Boolean(errors.petName)}
          helperText={errors.petName}
        />
        <TextField
          fullWidth
          label='Màu lông'
          name='petFurColor'
          value={formValues.petFurColor}
          onChange={handleChange}
          disabled={!editMode}
          variant='outlined'
          InputLabelProps={{ sx: getLabelSx('petFurColor') }}
          error={Boolean(errors.petFurColor)}
          helperText={errors.petFurColor}
        />
        <TextField
          fullWidth
          label='Cân nặng'
          type='number'
          name='petWeight'
          value={formValues.petWeight}
          onChange={handleChange}
          disabled={!editMode}
          variant='outlined'
          InputLabelProps={{ sx: getLabelSx('petWeight') }}
          error={Boolean(errors.petWeight)}
          helperText={errors.petWeight}
        />
        <TextField
          fullWidth
          label='Mô tả'
          name='petDesc'
          multiline
          rows={4}
          value={formValues.petDesc}
          onChange={handleChange}
          disabled={!editMode}
          variant='outlined'
          InputLabelProps={{ sx: getLabelSx('petDesc') }}
          error={Boolean(errors.petDesc)}
          helperText={errors.petDesc}
        />
        <TextField
          fullWidth
          select
          name='petGender'
          value={formValues.petGender}
          onChange={handleChange}
          disabled={!editMode}
          variant='outlined'
          SelectProps={{ native: true }}
          InputLabelProps={{ sx: getLabelSx('petGender') }}
          error={Boolean(errors.petGender)}
          helperText={errors.petGender}
        >
          <option value=''>Chọn giới tính</option>
          <option value={true}>Nam</option>
          <option value={false}>Nữ</option>
        </TextField>
        <DatePicker
          label='Ngày sinh'
          value={formValues.dateOfBirth ? formValues.dateOfBirth : null}
          onChange={(newValue) =>
            setFormValues({
              ...formValues,
              dateOfBirth: newValue ? format(newValue, dateFormat) : null,
            })
          }
          disabled={!editMode}
          // format='dd/MM/yyyy'
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              InputLabelProps={{ sx: getLabelSx('dateOfBirth') }}
              error={Boolean(errors.dateOfBirth)}
              helperText={errors.dateOfBirth}
            />
          )}
        />
        <TextField
          fullWidth
          label='Địa chỉ'
          name='address'
          value={formValues.address}
          onChange={handleChange}
          disabled={!editMode}
          variant='outlined'
          InputLabelProps={{ sx: getLabelSx('address') }}
          error={Boolean(errors.address)}
          helperText={errors.address}
        />
        {/* Nút cập nhật */}
        <Button
          disabled={!editMode}
          variant='contained'
          color='primary'
          onClick={handleUpdate}
          fullWidth
          sx={{ py: 2, borderRadius: 2, color: 'white' }}
          className={`${loading && 'hover:cursor-not-allowed bg-primary-dark'}`}
        >
          {loading ? (
            <CircularProgress size={'1rem'} color='primary' />
          ) : (
            'Cập nhật'
          )}
        </Button>
      </Stack>
    </Box>
  );
};

export default CustomerPetInfo;
