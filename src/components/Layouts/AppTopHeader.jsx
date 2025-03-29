import React from 'react';
import { SidebarTrigger } from '../ui/sidebar';
import { FaGithub } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { getPageTitle } from '@/utils/utility';

const AppTopHeader = () => {
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

  return (
    <div className="top_header_container h-16 bg-slate-100 px-4 flex justify-between items-center border-b">
      {/* Left: Sidebar Trigger */}
      <div className="flex items-center">
        <SidebarTrigger />
      </div>

      {/* Center: Heading */}
      <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text text-center">
        {pageTitle}
      </h1>

      {/* Right: GitHub Icon */}
      <div className="flex items-center">
        <a
          href="https://github.com/LokeshwarPrasad3"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="h-6 w-6 sm:h-7 sm:w-7 text-slate-700 hover:text-black transition" />
        </a>
      </div>
    </div>
  );
};

export default AppTopHeader;
