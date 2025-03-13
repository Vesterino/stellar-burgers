import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useAppDispatch, useSelector } from '../../services/store';
import { Navigate } from 'react-router-dom';
import { authChecked, loginUserAuth } from '../../services/slices/user-slice';

export const Login: FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, error } = useSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    dispatch(loginUserAuth({ email, password }));
  };

  useEffect(() => {
    dispatch(authChecked());
  }, [dispatch]);

  if (isAuthenticated) {
    return <Navigate to={'/'} />;
  }

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
