import PropTypes from 'prop-types';
import { Footer, Header } from '../components';

const CommonLayout = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-grow px-8'>{children}</main>
      <Footer />
    </div>
  );
};

CommonLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CommonLayout;
