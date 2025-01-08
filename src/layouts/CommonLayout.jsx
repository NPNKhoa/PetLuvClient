import PropTypes from 'prop-types';

const CommonLayout = ({ children }) => {
  return (
    <main>
      <h1>Common Layout</h1>
      {children}
    </main>
  );
};

CommonLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CommonLayout;
