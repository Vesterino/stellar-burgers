import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { logoutUserAuth } from '../../services/slices/user-slice';
import { useAppDispatch } from '../../services/store';

export const ProfileMenu: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    dispatch(logoutUserAuth());
    navigate('/profile');
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
