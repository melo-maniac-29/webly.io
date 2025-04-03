'use client';
import Image from 'next/image';
import React, { useContext, useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { UserDetailContext } from '@/context/UserDetailContext';
import Link from 'next/link';
import { Download, Rocket, Menu, X, Code, CodeXml, ChevronDown, Terminal, Globe, Star } from 'lucide-react';
import { useSidebar } from '../ui/sidebar';
import { usePathname } from 'next/navigation';
import { ActionContext } from '@/context/ActionContext';
import { motion, AnimatePresence } from 'framer-motion';

function Header() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { action, setAction } = useContext(ActionContext);
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const [hoveredButton, setHoveredButton] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const onActionBtn = (actn) => {
    setAction({
      actionType: actn,
      timeStamp: Date.now()
    });
  };
  
  // Navigation items
  const navItems = [
    { name: 'Features', icon: Star },
    { name: 'Templates', icon: Terminal },
    { name: 'Pricing', icon: Globe, href: '/pricing' }
  ];
  
  return (
    <motion.div 
      className={`px-4 md:px-8 py-3 flex justify-between items-center border-b backdrop-blur-lg sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-background/90 shadow-md' : 'bg-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 z-0" />
      
      {/* Logo and Navigation */}
      <div className="flex items-center z-10 relative">
        <Link href={'/'}>
          <motion.div 
            className="relative flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              className="relative"
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Image 
                src={'/logo.png'} 
                alt="logo" 
                width={38} 
                height={38} 
                className="drop-shadow-lg" 
              />
              <motion.div
                className="absolute -inset-1 rounded-full bg-blue-500/20 blur-md"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.div>
            <motion.div
              className="ml-2.5 font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              webly<span className="text-blue-400">.</span><span className="text-purple-500">io</span>
            </motion.div>
          </motion.div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="ml-8 hidden md:flex items-center space-x-1">
          {navItems.map((item, index) => (
            <Link key={index} href={item.href || '#'}>
              <motion.div
                className="px-3 py-2 relative rounded-md text-sm font-medium text-gray-400 hover:text-white"
                whileHover={{ y: -2 }}
                onMouseEnter={() => setHoveredButton(item.name)}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <div className="flex items-center gap-1.5">
                  <item.icon size={14} />
                  <span>{item.name}</span>
                </div>
                <AnimatePresence>
                  {hoveredButton === item.name && (
                    <motion.div 
                      className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden z-20">
        <motion.button 
          className="p-1.5 rounded-md bg-gray-800/50"
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </div>

      {/* Right Side Content */}
      <div className="z-10 relative hidden md:block">
        {!userDetail?.name ? (
          <div className="flex gap-3 items-center">
            <Button 
              variant="ghost"
              onMouseEnter={() => setHoveredButton('signin')}
              onMouseLeave={() => setHoveredButton(null)}
              className="relative overflow-hidden"
            >
              <span>Sign In</span>
              <AnimatePresence>
                {hoveredButton === 'signin' && (
                  <motion.div 
                    className="absolute bottom-0 left-0 h-0.5 bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    exit={{ width: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </AnimatePresence>
            </Button>
            <Button
              variant="gradient"
              className="text-white relative overflow-hidden group"
              onMouseEnter={() => setHoveredButton('start')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <span className="relative z-10">Get Started</span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500"
                initial={{ x: '-100%' }}
                animate={hoveredButton === 'start' ? { x: 0 } : { x: '-100%' }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
              />
              <motion.div 
                className="absolute -top-2 -right-2 text-yellow-300 opacity-75"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <CodeXml size={14} />
              </motion.div>
            </Button>
          </div>
        ) : (
          <div className="flex gap-3 items-center">
            {pathname.includes('/workspace/') && (
              <motion.div 
                className="flex gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Button 
                  variant="outline" 
                  onClick={() => onActionBtn('export')}
                  className="relative overflow-hidden group"
                  onMouseEnter={() => setHoveredButton('export')}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <Download className="relative z-10 transition-transform group-hover:scale-110" /> 
                  <span className="relative z-10 ml-2">Export</span>
                  <motion.div 
                    className="absolute inset-0 bg-blue-500/10"
                    initial={{ y: '100%' }}
                    animate={hoveredButton === 'export' ? { y: 0 } : { y: '100%' }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  />
                </Button>
                <Button
                  onClick={() => onActionBtn('deploy')}
                  variant="gradient"
                  className="text-white relative overflow-hidden group"
                  onMouseEnter={() => setHoveredButton('deploy')}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <motion.div
                    animate={hoveredButton === 'deploy' ? { x: 3 } : { x: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10, repeat: hoveredButton === 'deploy' ? Infinity : 0, repeatType: "mirror" }}
                  >
                    <Rocket className="relative z-10" />
                  </motion.div>
                  <span className="relative z-10 ml-2">Deploy</span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500"
                    initial={{ x: '-100%' }}
                    animate={hoveredButton === 'deploy' ? { x: 0 } : { x: '-100%' }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  />
                </Button>
              </motion.div>
            )}
            {userDetail && (
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="relative"
                onClick={toggleSidebar}
              >
                <Image
                  src={userDetail?.picture}
                  alt="userImage"
                  width={40}
                  height={40}
                  className="rounded-full cursor-pointer object-cover shadow-md"
                />
                <motion.div 
                  className="absolute inset-0 rounded-full border-2 border-blue-500"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  style={{ zIndex: -1 }}
                />
                <motion.div 
                  className="absolute inset-0 -z-10 rounded-full bg-blue-500/20 blur-sm"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                <motion.div
                  className="absolute -top-1 -right-1 bg-green-500 h-3 w-3 rounded-full border-2 border-background"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                />
              </motion.div>
            )}
          </div>
        )}
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className="fixed inset-0 bg-background/95 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="flex flex-col items-center justify-center h-full gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {/* Logo in Menu */}
              <motion.div 
                className="flex items-center mb-8"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Image src={'/logo.png'} alt="logo" width={50} height={50} className="drop-shadow-xl" />
                <span className="ml-3 font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                  webly.io
                </span>
              </motion.div>
              
              {/* Navigation Items */}
              {navItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (index * 0.1) }}
                >
                  <Link href={item.href || '#'}>
                    <motion.div 
                      className="flex items-center text-xl font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <item.icon className="mr-2" size={20} />
                      {item.name}
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
              
              {/* Action Buttons */}
              <div className="flex flex-col gap-4 mt-4 w-64">
                {!userDetail?.name ? (
                  <>
                    <Button variant="ghost" className="w-full text-lg">
                      Sign In
                    </Button>
                    <Button variant="gradient" className="w-full text-lg">
                      Get Started
                    </Button>
                  </>
                ) : (
                  <div className="flex items-center gap-3 justify-center">
                    <Image
                      src={userDetail?.picture}
                      alt="userImage"
                      width={50}
                      height={50}
                      className="rounded-full border-2 border-blue-500"
                    />
                    <div className="text-left">
                      <div className="font-medium">{userDetail.name}</div>
                      <Button variant="ghost" size="sm" onClick={toggleSidebar} className="px-0 text-blue-400">
                        Open Dashboard
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Close Button */}
              <motion.button
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-800"
                onClick={() => setMenuOpen(false)}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Header;