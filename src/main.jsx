import { createRoot } from 'react-dom/client';
import App from './App.jsx';

import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store, { persister } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import { LoadingPage } from './pages/index.js';

createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <PersistGate loading={<LoadingPage />} persistor={persister}>
        <App />
      </PersistGate>
    </Provider>
    <ToastContainer
      position='top-right'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='light'
    />
  </>
);
