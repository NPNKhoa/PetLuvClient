import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Grid,
  CircularProgress,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import RenderUploadField from './RenderUplaodField';
import ActionImage from '../common/ActionImage';
import { IoCloseSharp } from 'react-icons/io5';
import { useSelector } from 'react-redux';

const EditHealthBookDetailModal = ({
  open,
  onClose,
  onSubmit,
  healthDetail,
}) => {
  const [treatmentProof, setTreatmentProof] = useState(null);
  const [treatmentProofPreview, setTreatmentProofPreview] = useState(null);
  const [vetDegree, setVetDegree] = useState(null);
  const [vetDegreePreview, setVetDegreePreview] = useState(null);

  const loading = useSelector((state) => state.pets.loading);

  const formik = useFormik({
    initialValues: {
      petHealthNote: healthDetail.petHealthNote,
      treatmentName: healthDetail.treatmentName,
      treatmentDesc: healthDetail.treatmentDesc,
      vetName: healthDetail.vetName,
      updatedDate: healthDetail.updatedDate,
      healthBookId: healthDetail.healthBookId,
    },
    validationSchema: Yup.object({
      petHealthNote: Yup.string().required('Không được để trống'),
      treatmentName: Yup.string().required('Không được để trống'),
      treatmentDesc: Yup.string().required('Không được để trống'),
      vetName: Yup.string().required('Không được để trống'),
      updatedDate: Yup.date().required('Không được để trống'),
    }),
    onSubmit: (values) => {
      const payload = {
        ...values,
        updatedDate:
          typeof values.updatedDate?.toDate === 'function'
            ? values.updatedDate.toDate()
            : values.updatedDate,
        treatmentProof,
        vetDegree,
      };

      // If file was not changed, keep original preview (string path)
      if (
        !treatmentProof &&
        treatmentProofPreview &&
        typeof treatmentProofPreview === 'string'
      ) {
        payload.treatmentProof = treatmentProofPreview;
      }
      if (
        !vetDegree &&
        vetDegreePreview &&
        typeof vetDegreePreview === 'string'
      ) {
        payload.vetDegree = vetDegreePreview;
      }

      onSubmit({
        ...payload,
        healthBookDetailId: healthDetail.healthBookDetailId,
      });
    },
  });

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    if (type === 'treatmentProof') {
      setTreatmentProof(file);
      setTreatmentProofPreview(previewUrl);
    } else if (type === 'vetDegree') {
      setVetDegree(file);
      setVetDegreePreview(previewUrl);
    }
  };

  const handleDeleteImage = (type) => {
    if (type === 'treatmentProof') {
      setTreatmentProof(null);
      setTreatmentProofPreview(null);
    } else if (type === 'vetDegree') {
      setVetDegree(null);
      setVetDegreePreview(null);
    }
  };

  // Set form data when modal opens
  useEffect(() => {
    if (open && healthDetail) {
      if (typeof healthDetail.treatmentProof === 'string') {
        setTreatmentProofPreview(healthDetail.treatmentProof);
      }

      if (typeof healthDetail.vetDegree === 'string') {
        setVetDegreePreview(healthDetail.vetDegree);
      }
    }
  }, [open, healthDetail]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='md'>
      <DialogTitle className='relative'>
        <h1 className='text-2xl font-cute text-primary tracking-wider mt-4'>
          Xem thông tin theo dõi sức khỏe
        </h1>
        <span className='text-gray-600 text-sm font-light italic mt-4'>
          Tại đây bạn cũng có thể chỉnh sửa thông tin bằng cách thay đổi nội
          dung bên trong các ô nhập thông tin
        </span>
        <IoCloseSharp
          size={'2.5rem'}
          onClick={onClose}
          className='absolute top-2 right-2 cursor-pointer hover:opacity-70'
        />
      </DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit} className='space-y-6 mt-4 p-2'>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name='petHealthNote'
                label='Sức khỏe thú cưng'
                value={formik.values.petHealthNote}
                onChange={formik.handleChange}
                error={
                  formik.touched.petHealthNote &&
                  Boolean(formik.errors.petHealthNote)
                }
                helperText={
                  formik.touched.petHealthNote && formik.errors.petHealthNote
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name='treatmentName'
                label='Loại chăm sóc'
                value={formik.values.treatmentName}
                onChange={formik.handleChange}
                error={
                  formik.touched.treatmentName &&
                  Boolean(formik.errors.treatmentName)
                }
                helperText={
                  formik.touched.treatmentName && formik.errors.treatmentName
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name='treatmentDesc'
                label='Mô tả Loại chăm sóc'
                value={formik.values.treatmentDesc}
                onChange={formik.handleChange}
                error={
                  formik.touched.treatmentDesc &&
                  Boolean(formik.errors.treatmentDesc)
                }
                helperText={
                  formik.touched.treatmentDesc && formik.errors.treatmentDesc
                }
              />
            </Grid>

            <Grid item xs={12}>
              <label className='block font-medium mb-2'>Minh chứng</label>
              {treatmentProofPreview ? (
                <ActionImage
                  src={treatmentProofPreview}
                  alt='Minh chứng'
                  onDelete={() => handleDeleteImage('treatmentProof')}
                />
              ) : (
                <RenderUploadField
                  label=''
                  id='treatment-proof-upload'
                  onChange={(e) => handleImageChange(e, 'treatmentProof')}
                />
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name='vetName'
                label='Tên bác sĩ'
                value={formik.values.vetName}
                onChange={formik.handleChange}
                error={formik.touched.vetName && Boolean(formik.errors.vetName)}
                helperText={formik.touched.vetName && formik.errors.vetName}
              />
            </Grid>

            <Grid item xs={12}>
              <label className='block font-medium mb-2'>Bằng cấp bác sĩ</label>
              {vetDegreePreview ? (
                <ActionImage
                  src={vetDegreePreview}
                  alt='Bằng cấp bác sĩ'
                  onDelete={() => handleDeleteImage('vetDegree')}
                />
              ) : (
                <RenderUploadField
                  label=''
                  id='vet-degree-upload'
                  onChange={(e) => handleImageChange(e, 'vetDegree')}
                />
              )}
            </Grid>

            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label='Ngày thực hiện'
                  className='w-full'
                  value={dayjs(formik.values.updatedDate)}
                  onChange={(date) => formik.setFieldValue('updatedDate', date)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error:
                        formik.touched.updatedDate &&
                        Boolean(formik.errors.updatedDate),
                      helperText:
                        formik.touched.updatedDate && formik.errors.updatedDate,
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} className='flex justify-end gap-4'>
              <button
                type='submit'
                disabled={loading}
                className='px-10 py-3 mt-4 bg-primary text-white rounded-md hover:bg-primary-dark transition'
              >
                {loading ? (
                  <CircularProgress size='1rem' color='inherit' />
                ) : (
                  'Cập nhật'
                )}
              </button>
              <button
                type='button'
                onClick={onClose}
                className='px-10 py-3 mt-4 bg-tertiary-light rounded-md text-black hover:bg-tertiary-dark transition'
              >
                Hủy
              </button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

EditHealthBookDetailModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  healthDetail: PropTypes.object,
};

export default EditHealthBookDetailModal;
