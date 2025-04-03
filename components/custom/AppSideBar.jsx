import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import { Button } from '../ui/button';
import { MessageCircleCodeIcon, Sparkles } from 'lucide-react';
import WorkspaceHistory from './WorkspaceHistory';
import SideBarFooter from './SideBarFooter';
import { motion } from 'framer-motion';
import Link from 'next/link';

function AppSideBar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-5">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Image src={'/logo.png'} alt="logo" width={30} height={30} className="drop-shadow-lg" />
          </motion.div>
          <motion.h2 
            className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            webly.io
          </motion.h2>
        </div>
        <Link href="/">
          <Button className="mt-5 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md group">
            <MessageCircleCodeIcon className="mr-2" /> 
            Start New Chat
            <motion.div 
              className="absolute -top-1 -right-1"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={14} className="text-yellow-300 opacity-75" />
            </motion.div>
          </Button>
        </Link>
      </SidebarHeader>
      <SidebarContent className="scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        <SidebarGroup>
          <WorkspaceHistory />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SideBarFooter />
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSideBar;