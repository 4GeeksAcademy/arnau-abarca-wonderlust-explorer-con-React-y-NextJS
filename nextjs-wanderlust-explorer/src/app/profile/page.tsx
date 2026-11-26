import { Suspense } from 'react';
import ProfilePage from '@/components/ProfilePage';

export const metadata = {
  title: 'Mi Perfil - EXPERIENCIAS ARNAU',
  description: 'Tu perfil de usuario.',
};

export default function ProfilePageWrapper() {
  return (
    <Suspense>
      <ProfilePage />
    </Suspense>
  );
}
