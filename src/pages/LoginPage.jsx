import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Divider, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Email không hợp lệ')
      .required('Không được bỏ trống'),
    password: Yup.string()
      .min(6, 'Mật khẩu ít nhất 8 ký tự')
      .required('Không được bỏ trống'),
  });

  const handleSubmit = (values) => {
    console.log('Login Data:', values);
    alert('Login successful!');
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <Stack spacing={2} className='bg-white p-6 rounded-lg shadow-md w-96'>
        <h2 className='text-2xl font-bold mb-4 text-center'>Đăng nhập</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
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
                  className='mt-1 block w-full rounded-md border-primary-dark shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4'
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
                  className='mt-1 block w-full rounded-md border-primary-dark shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4'
                />
                <ErrorMessage
                  name='password'
                  component='div'
                  className='text-red-500 text-sm mt-1'
                />
              </div>
              <button
                type='submit'
                className='w-full bg-primary-light hover:bg-primary-dark text-white font-bold py-2 px-4 rounded'
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
        <Divider>hoặc</Divider>
        <Link
          to={'/dang-ky'}
          className='text-center text-primary-light p-2 rounded-md hover:bg-primary-light hover:text-white'
        >
          Đăng ký
        </Link>
      </Stack>
    </div>
  );
};

export default LoginPage;
