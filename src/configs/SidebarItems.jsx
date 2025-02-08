import {
  FaCircleUser,
  FaLocationDot,
  FaLock,
  FaCalendar,
} from 'react-icons/fa6';
import { MdOutlinePets } from 'react-icons/md';
import { IoBag } from 'react-icons/io5';

export default [
  {
    label: 'Hồ sơ',
    icon: <FaCircleUser />,
    path: '',
  },
  {
    label: 'Sổ địa chỉ',
    icon: <FaLocationDot />,
    path: 'dia-chi',
  },
  {
    label: 'BST Thú cưng',
    icon: <MdOutlinePets />,
    path: 'bst-thu-cung',
  },
  {
    label: 'Đơn mua',
    icon: <IoBag />,
    path: 'don-mua',
  },
  {
    label: 'Lịch hẹn',
    icon: <FaCalendar />,
    path: 'lich-hen',
  },
  {
    label: 'Riêng tư',
    icon: <FaLock />,
    path: 'rieng-tu',
  },
];
