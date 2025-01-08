import { v4 as uuidv4 } from 'uuid';
import { HomePage, LoginPage, RegisterPage } from '../pages';

export default [
  {
    id: `${uuidv4}-client-route`,
    path: '/',
    element: <HomePage />,
  },
  {
    id: `${uuidv4}-client-route`,
    path: '/dang-nhap',
    element: <LoginPage />,
  },
  {
    id: `${uuidv4}-client-route`,
    path: '/dang-ky',
    element: <RegisterPage />,
  },
];
