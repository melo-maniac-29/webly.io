import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '../ui/button';
import { MessageCircleCodeIcon, Sparkles, Code, FileCode, Menu, ArrowRightCircle, ChevronRight, Search } from 'lucide-react';
import WorkspaceHistory from './WorkspaceHistory';
import SideBarFooter from './SideBarFooter';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';

function AppSideBar() {
  const { isOpen, setIsOpen } = useSidebar();
  const prefersReducedMotion = useReducedMotion();
  
  // Custom SVG Logo for sidebar with fixed coordinates
  const SidebarLogoSVG = () => {
    // Fixed coordinates for sparkles
    const sparklePoints = [
      { cx: 85, cy: 30, delay: 0 },
      { cx: 15, cy: 30, delay: 0.8 }
    ];
    
    return (
      <motion.svg 
        width="30" 
        height="30" 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg z-10"
        suppressHydrationWarning={true}
      >
        <motion.circle 
          cx="50" 
          cy="50" 
          r="45" 
          fill="url(#sidebarLogoGradient)"
          animate={{ 
            scale: [0.95, 1, 0.95],
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        
        <motion.path 
          d="M35 30L20 50L35 70" 
          stroke="white" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5 }}
        />
        
        <motion.path 
          d="M65 30L80 50L65 70" 
          stroke="white" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />
        
        <motion.path 
          d="M40 42L45 58L50 42L55 58L50 42" 
          stroke="white" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.6 }}
        />
        
        {/* Inner glow */}
        <motion.circle
          cx="50"
          cy="50"
          r="25"
          fill="url(#sidebarInnerGlow)"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        {/* Fixed position sparkles */}
        {sparklePoints.map((point, i) => (
          <motion.circle 
            key={i}
            cx={point.cx}
            cy={point.cy}
            r="2"
            fill="white"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              delay: point.delay,
              ease: "easeOut" 
            }}
          />
        ))}
        
        <defs>
          <linearGradient id="sidebarLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          
          <radialGradient id="sidebarInnerGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>
      </motion.svg>
    );
  };

  return (
    <Sidebar 
      side="left" 
      appearance="translucent" 
      width="xs"
      mouseSensitivity={30}
    >
      {/* Close button that appears when sidebar is hovered */}
      {isOpen && (
        <motion.button
          className="absolute -right-4 top-24 z-10 transform bg-blue-500 text-white p-2 rounded-full shadow-lg"
          onClick={() => setIsOpen(false)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          whileHover={{ scale: 1.1, x: 2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
        >
          <ChevronRight className="h-5 w-5" />
        </motion.button>
      )}
      
      <SidebarHeader className="p-5 relative flex-shrink-0 sticky" sticky={true}>
        {/* Gradient background accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-500/5 to-transparent" />
        
        <div className="relative flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative"
          >
            <SidebarLogoSVG />
            <motion.div 
              className="absolute -inset-1 bg-blue-500/20 rounded-full blur-sm"
              animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1] }}
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
        
        {/* Quick search */}
        <div className="relative mt-4 mb-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <input
            type="text"
            placeholder="Quick navigation..."
            className="w-full bg-gray-800/50 border border-gray-700/50 rounded-md py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500/50 transition-colors placeholder-gray-500"
          />
        </div>
        
        <Link href="/">
          <Button className="mt-2 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md group overflow-hidden relative">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <MessageCircleCodeIcon className="mr-2 relative z-10" /> 
            <span className="relative z-10">Start New Chat</span>
            <motion.div 
              className="absolute -top-1 -right-1"
              animate={prefersReducedMotion ? {} : { rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={14} className="text-yellow-300 opacity-75" />
            </motion.div>
          </Button>
        </Link>
      </SidebarHeader>

      {/* Add scroll fades to improve UX */}
      <SidebarContent 
        className="scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent px-4 overflow-y-auto" 
        style={{ height: 'calc(100vh - 230px)' }}
        fadeTop={true}
        fadeBottom={true}
      >
        <SidebarGroup 
          title="NAVIGATION" 
          animate={true}
          className="border-b border-gray-800 pb-3 mb-4"
        >
          <div className="flex gap-2 justify-between">
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
          </div>
        </SidebarGroup>
        
        <SidebarGroup title="RECENT CHATS" animate={true}>
          <WorkspaceHistory />
        </SidebarGroup>
      </SidebarContent>
      
      {/* Make footer sticky and add blur effect */}
      <SidebarFooter className="bg-gray-900/70 backdrop-blur-lg border-t border-gray-800 flex-shrink-0 sticky mt-auto">
        <SideBarFooter />
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSideBar;