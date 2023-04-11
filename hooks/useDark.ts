import { useEffect } from 'react';

export default function useDark() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.getItem('theme') &&
        localStorage.getItem('theme') === 'dark' &&
        document.getElementsByTagName('html')[0].classList.add('dark');
    }
  }, []);
}
