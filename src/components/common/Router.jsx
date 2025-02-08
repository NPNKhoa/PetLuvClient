import { BrowserRouter, Routes, Route } from 'react-router-dom';

import router from '../../configs/routes.jsx';

import { CommonLayout } from '../../layouts';
import { LoadingPage, NotFoundPage, PersonalInfoPage } from '../../pages';
import { Suspense } from 'react';
import PersonalInfo from '../PersonalInfoPage/PersonalInfo.jsx';
import Privilege from '../PersonalInfoPage/Privilege.jsx';
import AddressCollection from '../PersonalInfoPage/AddressCollection.jsx';

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

          <Route
            path='/trang-ca-nhan'
            element={
              <CommonLayout>
                <PersonalInfoPage />
              </CommonLayout>
            }
          >
            <Route index element={<PersonalInfo />} />
            <Route path='dia-chi' element={<AddressCollection />} />
            <Route path='mat-khau' element={<Privilege />} />
          </Route>

          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
