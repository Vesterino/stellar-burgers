import { Provider, useDispatch } from 'react-redux';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAppDispatch } from '../../services/store';

import { AppHeader } from '@components';
import { useEffect } from 'react';
import { getIngredients } from '../../services/slices/ingredients-slice';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <Router>
        <AppHeader />
        <Routes>
          <Route path='/' element={<ConstructorPage />}></Route>
          <Route path='/feed' element={<Feed />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/forgot-password' element={<ForgotPassword />}></Route>
          <Route path='/reset-password' element={<ResetPassword />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/profile/orders' element={<ProfileOrders />}></Route>
          <Route path='*' element={<NotFound404 />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
