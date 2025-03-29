import { AppSidebar } from '@/components/Layouts/AppSidebar';
import AppTopHeader from '@/components/Layouts/AppTopHeader';
import { SidebarProvider } from '@/components/ui/sidebar';
import { getPageTitle } from '@/utils/utility';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    document.title = `${getPageTitle(location.pathname)} | FaceAI`;
  }, [location.pathname]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="h-full w-full">
        <AppTopHeader />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Layout;
