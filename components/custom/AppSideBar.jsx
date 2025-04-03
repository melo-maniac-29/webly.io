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
import { MessageCircleCodeIcon, Sparkles, Code, FileCode, Menu } from 'lucide-react';
import WorkspaceHistory from './WorkspaceHistory';
import SideBarFooter from './SideBarFooter';
import { motion } from 'framer-motion';
import Link from 'next/link';

function AppSideBar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-5 relative">
        {/* Background accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent" />
        
        <div className="relative flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative"
          >
            <Image src={'/logo.png'} alt="logo" width={30} height={30} className="drop-shadow-lg z-10" />
            <motion.div 
              className="absolute -inset-1 bg-blue-500/20 rounded-full blur-sm"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
          <motion.h2 
            className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            webly<span className="text-blue-400">.</span><span className="text-purple-500">io</span>
          </motion.h2>
        </div>
        
        <Link href="/">
          <Button className="mt-5 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md group overflow-hidden relative">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <MessageCircleCodeIcon className="mr-2 relative z-10" /> 
            <span className="relative z-10">Start New Chat</span>
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

      <SidebarContent className="scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent px-4">
        <div className="border-b border-gray-800 pb-3 mb-2">
          <div className="flex items-center mb-4">
            <Menu size={14} className="mr-2 text-gray-400" />
            <h3 className="text-sm font-medium text-gray-200">Navigation</h3>
          </div>
          <motion.div 
            className="flex gap-2 justify-between"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <FileCode size={14} className="mr-2 text-blue-400" />
                Dashboard
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Code size={14} className="mr-2 text-purple-400" />
                Pricing
              </Button>
            </Link>
          </motion.div>
        </div>
        
        <SidebarGroup>
          <WorkspaceHistory />
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="bg-gray-900/50 backdrop-blur-sm border-t border-gray-800">
        <SideBarFooter />
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSideBar;