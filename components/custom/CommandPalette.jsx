"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Command, Search, File, Settings, Code, BookOpen, Star, X, PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  
  // Commands list
  const commands = [
    { icon: <PlusCircle size={16} />, name: 'New Project', action: () => router.push('/') },
    { icon: <File size={16} />, name: 'Recent Projects', action: () => router.push('/') },
    { icon: <Star size={16} />, name: 'Browse Templates', action: () => router.push('/templates') },
    { icon: <Code size={16} />, name: 'AI Code Generation', action: () => router.push('/features') },
    { icon: <BookOpen size={16} />, name: 'Documentation', action: () => window.open('https://docs.webly.io', '_blank') },
    { icon: <Settings size={16} />, name: 'Settings', action: () => router.push('/settings') },
  ];
  
  // Filter commands based on search query
  const filteredCommands = commands.filter(command => 
    command.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Open command palette on Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        return;
      }
      
      if (!isOpen) return;
      
      // Handle escape to close
      if (e.key === 'Escape') {
        setIsOpen(false);
        return;
      }
      
      // Handle arrow navigation
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
        e.preventDefault();
        filteredCommands[selectedIndex].action();
        setIsOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands]);
  
  // Reset search when opened
  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);
  
  return (
    <>
      <button 
        className="fixed right-12 bottom-5 p-2 bg-gray-800 rounded-md border border-gray-700 hover:bg-gray-700 transition-colors"
        onClick={() => setIsOpen(true)}
        aria-label="Open command palette"
      >
        <Command size={16} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-[20vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div 
              className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl w-full max-w-md overflow-hidden"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-800 flex items-center gap-2">
                <Search size={18} className="text-gray-400" />
                <input
                  type="text"
                  className="bg-transparent border-none outline-none flex-1 text-sm placeholder-gray-500"
                  placeholder="Search commands..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  autoFocus
                />
                <button 
                  className="p-1 rounded-md hover:bg-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={16} />
                </button>
              </div>
              
              <div className="py-2 max-h-[50vh] overflow-y-auto">
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((command, index) => (
                    <button
                      key={command.name}
                      className={`flex items-center gap-3 px-4 py-2.5 w-full text-left text-sm ${
                        index === selectedIndex 
                          ? 'bg-blue-600/20 text-blue-400' 
                          : 'hover:bg-gray-800'
                      }`}
                      onClick={() => {
                        command.action();
                        setIsOpen(false);
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <span className="text-gray-400">{command.icon}</span>
                      <span>{command.name}</span>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-gray-500">
                    <Search className="h-6 w-6 mx-auto mb-2 opacity-50" />
                    <p>No commands found</p>
                  </div>
                )}
              </div>
              
              <div className="px-4 py-2 border-t border-gray-800 text-xs text-gray-500 flex justify-between">
                <div className="flex items-center gap-1">
                  <span>Navigate</span>
                  <div className="flex gap-0.5">
                    <kbd className="px-1.5 py-0.5 bg-gray-800 rounded">↑</kbd>
                    <kbd className="px-1.5 py-0.5 bg-gray-800 rounded">↓</kbd>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span>Select</span>
                  <kbd className="px-1.5 py-0.5 bg-gray-800 rounded">Enter</kbd>
                </div>
                <div className="flex items-center gap-1">
                  <span>Close</span>
                  <kbd className="px-1.5 py-0.5 bg-gray-800 rounded">Esc</kbd>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
