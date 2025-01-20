import { v4 as uuidv4 } from 'uuid';
import { HomePage, LoginPage, RegisterPage, ServicePage } from '../pages';

export default [
  {
    id: `client-route-${uuidv4}`,
    path: '/',
    element: <HomePage />,
  },
  {
    id: `client-route-${uuidv4}`,
    path: '/dang-nhap',
    element: <LoginPage />,
  },
  {
    id: `client-route-${uuidv4}`,
    path: '/dang-ky',
    element: <RegisterPage />,
  },
  {
    id: `client-route-${uuidv4}`,
    path: '/dich-vu',
    element: <ServicePage />,
  },
];
