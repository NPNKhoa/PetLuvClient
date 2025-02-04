import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Divider, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Tên không được bỏ trống'),
    email: Yup.string()
      .email('Email không hợp lệ')
      .required('Email không được bỏ trống'),
    password: Yup.string()
      .min(6, 'Mật khẩu ít nhất 8 ký tự')
      .required('Mật khẩu không được bỏ trống'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
      .required('Không được bỏ trống'),
  });

  const handleSubmit = (values) => {
    console.log('Register Data:', values);
    alert('Registration successful!');
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <Stack spacing={2} className='bg-white p-6 rounded-lg shadow-md w-96'>
        <h2 className='text-2xl font-bold mb-4 text-center'>Register</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className='mb-4'>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-700'
                >
                  Name
                </label>
                <Field
                  type='text'
                  name='name'
                  id='name'
                  className='mt-1 block w-full rounded-md border-primary-dark shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4'
                />
                <ErrorMessage
                  name='name'
                  component='div'
                  className='text-red-500 text-sm mt-1'
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700'
                >
                  Email
                </label>
                <Field
                  type='email'
                  name='email'
                  id='email'
                  className='mt-1 block w-full rounded-md border-primary-dark shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4'
                />
                <ErrorMessage
                  name='email'
                  component='div'
                  className='text-red-500 text-sm mt-1'
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-700'
                >
                  Password
                </label>
                <Field
                  type='password'
                  name='password'
                  id='password'
                  className='mt-1 block w-full rounded-md border-primary-dark shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4'
                />
                <ErrorMessage
                  name='password'
                  component='div'
                  className='text-red-500 text-sm mt-1'
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='confirmPassword'
                  className='block text-sm font-medium text-gray-700'
                >
                  Confirm Password
                </label>
                <Field
                  type='password'
                  name='confirmPassword'
                  id='confirmPassword'
                  className='mt-1 block w-full rounded-md border-primary-dark shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4'
                />
                <ErrorMessage
                  name='confirmPassword'
                  component='div'
                  className='text-red-500 text-sm mt-1'
                />
              </div>
              <button
                type='submit'
                className='w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded'
              >
                Register
              </button>
            </Form>
          )}
        </Formik>
        <Divider>hoặc</Divider>
        <Link
          to={'/dang-nhap'}
          className='text-center text-primary p-2 rounded-md hover:bg-primary hover:text-white'
        >
          Đăng nhập
        </Link>
      </Stack>
    </div>
  );
};

export default RegisterPage;
