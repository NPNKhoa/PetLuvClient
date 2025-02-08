import { v4 as uuidv4 } from 'uuid';
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ServicePage,
  SpaServicePage,
} from '../pages';
import HotelServicePage from '../pages/HotelServicePage';
import ServiceDetailPage from '../pages/ServiceDetailPage';
import RoomDetailPage from '../pages/RoomDetailPage';

export default [
  {
    id: `client-route-${uuidv4()}`,
    path: '/',
    element: <HomePage />,
  },
  {
    id: `client-route-${uuidv4()}`,
    path: '/dang-nhap',
    element: <LoginPage />,
  },
  {
    id: `client-route-${uuidv4()}`,
    path: '/dang-ky',
    element: <RegisterPage />,
  },
  {
    id: `client-route-${uuidv4()}`,
    path: '/dich-vu',
    element: <ServicePage />,
  },
  {
    id: `client-route-${uuidv4()}`,
    path: '/dich-vu-spa',
    element: <SpaServicePage />,
  },
  {
    id: `client-route-${uuidv4()}`,
    path: '/dich-vu-spa/:serviceId',
    element: <ServiceDetailPage />,
  },
  {
    id: `client-route-${uuidv4()}`,
    path: '/khach-san-thu-cung',
    element: <HotelServicePage />,
  },
  {
    id: `client-route-${uuidv4()}`,
    path: '/khach-san-thu-cung/:roomId',
    element: <RoomDetailPage />,
  },
];
