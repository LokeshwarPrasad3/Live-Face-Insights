import {
  Calendar,
  Home,
  Inbox,
  ScanFace,
  Search,
  Settings,
  Smile,
  Users,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { Link } from 'react-router-dom';

// Menu items.
const items = [
  {
    title: 'Facial Emotion Detection',
    url: '/face-emotion-detection',
    icon: Smile,
  },
  {
    title: 'Face Similarity Matcher',
    url: '#',
    icon: Users,
  },
  {
    title: 'Facial Recognition System',
    url: '#',
    icon: ScanFace,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl mt-6 mb-6 font-bold text-center w-full bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
            Facial Intelligence
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <TooltipProvider>
                {items.map((item) => (
                  <Tooltip key={item.title}>
                    <TooltipTrigger>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <Link
                            style={{
                              background:
                                location.pathname === item.url ? '#e2e8f0' : '',
                            }}
                            href={item.url}
                          >
                            <item.icon />
                            <span className="text-[15px] opacity-90">
                              {item.title}
                            </span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </TooltipTrigger>
                    <TooltipContent className="sm:block hidden" side="right">
                      <p>{item.title}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
