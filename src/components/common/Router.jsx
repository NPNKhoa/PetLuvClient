import { BrowserRouter, Routes, Route } from 'react-router-dom';

import router from '../../configs/routes.jsx';

import { CommonLayout } from '../../layouts';
import { LoadingPage, NotFoundPage } from '../../pages';
import { Suspense } from 'react';

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          {router.map(({ id, path, element }) => {
            return (
              <Route
                key={id}
                path={path}
                element={<CommonLayout>{element}</CommonLayout>}
              />
            );
          })}

          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
