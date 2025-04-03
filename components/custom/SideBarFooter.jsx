"use client";
import React, { useContext } from 'react';
import { UserDetailContext } from '@/context/UserDetailContext';
import { Settings, LogOut, Info, Moon, Sun, Laptop } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

function SideBarFooter() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  // Menu items
  const menuItems = [
    { name: 'Theme', icon: theme === 'dark' ? <Moon size={18} /> : <Sun size={18} /> },
    { name: 'Settings', icon: <Settings size={18} /> },
    { name: 'Help', icon: <Info size={18} /> },
    { name: 'Sign Out', icon: <LogOut size={18} /> },
  ];
  
  // Handle sign out functionality
  const handleSignOut = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    
    // Clear user state in context
    setUserDetail(null);
    
    // Redirect to home page
    router.push('/');
    
    // Optional: refresh the page to ensure all state is reset
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };
  
  // Handle menu item click
  const handleMenuItemClick = (item) => {
    if (item.name === 'Theme') {
      // Toggle between light and dark themes
      setTheme(theme === 'dark' ? 'light' : 'dark');
    } else if (item.name === 'Sign Out') {
      handleSignOut();
    }
    // Add other menu item handlers as needed
  };

  return (
    <div className="p-4">
      <div className="flex justify-between">
        {menuItems.map((item, index) => (
          <motion.button
            key={index}
            className="flex flex-col items-center justify-center gap-1.5 text-gray-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleMenuItemClick(item)}
          >
            <div className="p-2 bg-gray-800 rounded-lg">
              {item.icon}
            </div>
            <span className="text-xs">{item.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default SideBarFooter;