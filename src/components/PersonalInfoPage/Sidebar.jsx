import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
import { Avatar, Typography } from '@mui/material';
import SidebarItems from '../../configs/SidebarItems';
import { useMemo } from 'react';

const Sidebar = ({ user, sidebarItems = SidebarItems }) => {
  const currentRoute = useLocation();

  const routeString = useMemo(
    () => currentRoute.pathname.split('/'),
    [currentRoute]
  );

  return (
    <aside className='p-4 bg-tertiary-light w-64 rounded-2xl'>
      <div className='flex flex-col items-center mb-6'>
        <Avatar
          alt={user?.fullName || 'User'}
          src={user?.avatar ? `${user?.avatar}` : '/logo.png'}
          sx={{ width: 64, height: 64 }}
        />
        <Typography
          variant='subtitle1'
          sx={{
            mt: 1,
            maxWidth: '100%',
            fontSize: '0.875rem',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {user?.fullName || 'Người dùng'}
        </Typography>
      </div>

      <nav>
        {sidebarItems.map((item, index) => (
          <NavLink
            key={`sidebar-item-${index}`}
            to={item.path}
            className={
              routeString.length < 3 && item.path === ''
                ? 'flex items-center p-2 mb-2 text-white bg-primary rounded-lg'
                : item.path === routeString[routeString.length - 1]
                ? 'flex items-center p-2 mb-2 text-white bg-primary rounded-lg'
                : 'flex items-center p-2 mb-2 text-gray-700 hover:bg-primary hover:text-white rounded-lg'
            }
          >
            <span className='mr-2'>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

Sidebar.propTypes = {
  user: PropTypes.shape({
    fullName: PropTypes.string,
    avatar: PropTypes.string,
  }),
  sidebarItems: PropTypes.array,
};

export default Sidebar;
