import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components';

const PersonalInfoPage = ({ user }) => {
  return (
    <div className='min-h-screen flex p-16'>
      <Sidebar user={user} />
      <main className='flex-1 p-6'>
        <Outlet />
      </main>
    </div>
  );
};

PersonalInfoPage.propTypes = {
  user: PropTypes.object,
};

export default PersonalInfoPage;
