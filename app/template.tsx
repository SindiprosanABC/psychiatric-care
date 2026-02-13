'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/sections/navbar';
import { FooterContact } from '@/components/sections/footer-contact';
import { FloatingWhatsAppButton } from '@/components/floating-whatsapp-button';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {children}
      {!isAdminRoute && <FooterContact />}
      {!isAdminRoute && <FloatingWhatsAppButton />}
    </>
  );
}
