'use client';
import Image from 'next/image';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { UserDetailContext } from '@/context/UserDetailContext';
import Link from 'next/link';
import { Download, Rocket, Menu, X, Code, CodeXml, ChevronDown, Terminal, Globe, Star, Sparkles } from 'lucide-react';
import { useSidebar } from '../ui/sidebar';
import { usePathname } from 'next/navigation';
import { ActionContext } from '@/context/ActionContext';
import { motion, AnimatePresence, useAnimation, useMotionValue, useTransform } from 'framer-motion';

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
  
  const logoRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [0, 100], [5, -5]);
  const rotateY = useTransform(mouseX, [0, 100], [-5, 5]);
  const logoScale = useMotionValue(1);
  const titleControls = useAnimation();
  
  const handleLogoMouseMove = (e) => {
    if (logoRef.current) {
      const rect = logoRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };
  
  // Pulsating effect for the logo on page load
  useEffect(() => {
    const pulseAnimation = async () => {
      await logoScale.set(1);
      await titleControls.start({
        opacity: 1,
        y: 0,
        transition: { delay: 0.3, duration: 0.5 }
      });
    };
    pulseAnimation();
  }, []);
  
  // Generate random particles
  const [logoParticles, setLogoParticles] = useState([]);
  useEffect(() => {
    const particles = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 2,
      x: Math.random() * 60 - 30,
      y: Math.random() * 60 - 30,
      duration: Math.random() * 2 + 2,
      delay: Math.random() * 0.5,
    }));
    setLogoParticles(particles);
  }, []);
  
  // Custom animated SVG logo with fixed coordinates to prevent hydration mismatches
  const LogoSVG = () => {
    // Pre-calculated static positions for sparkle points
    const sparklePoints = [
      { cx: 95, cy: 30, delay: 0 },
      { cx: 75, cy: 85, delay: 0.4 },
      { cx: 20, cy: 80, delay: 0.8 },
      { cx: 15, cy: 30, delay: 1.2 },
      { cx: 55, cy: 5, delay: 1.6 }
    ];
    
    return (
      <motion.svg 
        width="42" 
        height="42" 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        suppressHydrationWarning={true}
      >
        {/* Background circle */}
        <motion.circle 
          cx="50" 
          cy="50" 
          r="45" 
          fill="url(#logoGradient)"
          animate={{ 
            scale: [0.95, 1, 0.95],
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        
        {/* Code bracket left */}
        <motion.path 
          d="M35 30L20 50L35 70" 
          stroke="white" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ 
            duration: 1.5, 
            delay: 0.3,
            ease: "easeInOut"
          }}
        />
        
        {/* Code bracket right */}
        <motion.path 
          d="M65 30L80 50L65 70" 
          stroke="white" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ 
            duration: 1.5, 
            delay: 0.6,
            ease: "easeInOut"
          }}
        />
        
        {/* W Letter */}
        <motion.path 
          d="M40 42L45 58L50 42L55 58L60 42" 
          stroke="white" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ 
            duration: 2, 
            delay: 1,
            ease: "easeInOut"
          }}
        />
        
        {/* Pulse ring */}
        <motion.circle 
          cx="50" 
          cy="50" 
          r="50" 
          stroke="rgba(255,255,255,0.3)" 
          strokeWidth="2" 
          fill="none"
          initial={{ scale: 0.8, opacity: 0.8 }}
          animate={{ 
            scale: [0.8, 1.1, 0.8], 
            opacity: [0.3, 0, 0.3]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Sparkle points with fixed coordinates */}
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
        
        {/* Extra visual enhancements */}
        <motion.circle
          cx="50"
          cy="50"
          r="35"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
          fill="none"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner glow */}
        <motion.circle
          cx="50"
          cy="50"
          r="25"
          fill="url(#innerGlow)"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        {/* Gradients definition */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          
          <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>
      </motion.svg>
    );
  };
  
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
            ref={logoRef}
            onMouseMove={handleLogoMouseMove}
            className="relative flex items-center perspective-[800px]"
            style={{ scale: logoScale }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Replace Image with our SVG Logo component */}
            <motion.div 
              className="relative z-10 perspective-[800px]"
              style={{
                rotateX: rotateX,
                rotateY: rotateY,
                transformStyle: "preserve-3d"
              }}
            >
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ 
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  repeatType: "loop",
                  ease: "easeInOut" 
                }}
                className="relative"
              >
                <LogoSVG />
                
                {/* Inner glow - keep this for additional effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-blue-500/30 blur-md z-[-1]"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5] 
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse" 
                  }}
                />
              </motion.div>
            </motion.div>
            
            {/* Animated text logo - keep this part */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={titleControls}
              className="ml-3 relative"
            >
              {/* Text shadow layer for depth */}
              <div className="absolute font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400/50 via-purple-500/50 to-pink-500/50 blur-sm transform translate-y-[2px] translate-x-[1px]">
                webly<span className="text-blue-400/50">.</span><span className="text-purple-500/50">io</span>
              </div>
              
              {/* Main text */}
              <motion.h1 
                className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 relative"
              >
                <motion.span 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.3 }}
                >
                  w
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  e
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.3 }}
                >
                  b
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  l
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.3 }}
                >
                  y
                </motion.span>
                <motion.span 
                  className="text-blue-400"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.65, type: "spring" }}
                >
                  .
                </motion.span>
                <motion.span 
                  className="text-purple-500"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75, duration: 0.3 }}
                >
                  i
                </motion.span>
                <motion.span 
                  className="text-pink-500"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.3 }}
                >
                  o
                </motion.span>
              </motion.h1>
              
              {/* Animated underline */}
              <motion.div 
                className="h-[2px] bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.4 }}
              />
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
              {/* Logo in Menu - update this too */}
              <motion.div 
                className="flex items-center mb-8"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <LogoSVG />
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