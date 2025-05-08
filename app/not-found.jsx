"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 p-4">
      <motion.div 
        className="max-w-md w-full text-center space-y-4 sm:space-y-6 p-4 sm:p-6 md:p-8 rounded-xl border border-gray-800 bg-gray-900/70 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Error code */}
        <div className="relative">
          <motion.div
            className="text-7xl sm:text-9xl font-bold text-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ delay: 0.2 }}
          >
            404
          </motion.div>
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <Search className="h-12 w-12 sm:h-16 sm:w-16 text-blue-500" />
          </motion.div>
        </div>
        
        {/* Message */}
        <div className="space-y-2">
          <motion.h1 
            className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Page Not Found
          </motion.h1>
          <motion.p 
            className="text-gray-400 text-sm sm:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            The page you're looking for doesn't exist or has been moved.
          </motion.p>
        </div>
        
        {/* Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-3 justify-center pt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="gap-2 w-full"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="gradient" className="gap-2 w-full">
              <Home className="h-4 w-4" />
              Return Home
            </Button>
          </Link>
        </motion.div>
        
        {/* Decorative elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-xl">
          <motion.div 
            className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.2, 0.3] 
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div 
            className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.3, 0.2] 
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
}
