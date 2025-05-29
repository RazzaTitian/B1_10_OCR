import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      router.push('/login');
      return;
    }
    setUserId(storedUserId);
  }, []);

  return { userId };
};