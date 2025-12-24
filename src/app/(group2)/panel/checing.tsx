'use client';

import Navbar from '@/commponents/navbar';
import { usePathname } from 'next/navigation';

export default function PanelLayout() {
  const pathname = usePathname();


  const hiddenRoutes = ['/panel', '/admin'];

 
  const shouldHideNavbar =
    hiddenRoutes.some(route => pathname.startsWith(route)) ||
    pathname.startsWith('/book/'); 

  if (shouldHideNavbar) return null;

  return <Navbar />;
}
  