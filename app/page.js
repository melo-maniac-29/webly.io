"use client";
import React, { useEffect, useState, Suspense } from 'react';
import Hero from '@/components/custom/Hero';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Code, Laptop, Rocket, Sparkles, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import CommandPalette from "@/components/custom/CommandPalette";

// Lazy load components that aren't needed immediately
const SocialProof = React.lazy(() => import('@/components/custom/SocialProof'));
const FeatureHighlights = React.lazy(() => import('@/components/custom/FeatureHighlights'));

// Loading fallback component with skeleton UI
const SkeletonLoader = () => (
  <div className="w-full animate-pulse">
    <div className="h-8 bg-gray-800/50 rounded-lg w-1/3 mb-4"></div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-gray-800/30 rounded-xl p-6 h-64"></div>
      ))}
    </div>
  </div>
);

export default function Home() {
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  
  // Check if this is user's first visit
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    if (!hasVisitedBefore) {
      setIsFirstVisit(true);
      setShowWelcomeModal(true);
      localStorage.setItem('hasVisitedBefore', 'true');
    }
    
    // Prefetch commonly accessed pages for faster navigation
    const prefetchLinks = ['/features', '/templates', '/pricing'];
    prefetchLinks.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      document.head.appendChild(link);
    });
  }, []);
  
  // Define welcome tooltip content
  const welcomeSteps = [
    { 
      title: "AI-Powered Development", 
      description: "webly.io turns your ideas into clean, optimized code with cutting-edge AI technology.",
      icon: <Terminal className="text-blue-400" />
    },
    { 
      title: "One-Click Deployment", 
      description: "Deploy your projects instantly to production with a single click.",
      icon: <Rocket className="text-purple-400" />
    },
    { 
      title: "Ready-to-Use Templates",
      description: "Start with professionally designed templates or create your own from scratch.",
      icon: <Laptop className="text-pink-400" />
    }
  ];

  return (
    <main className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Main hero section */}
      <Hero />
      
      {/* Quick access cards - new addition */}
      <motion.section 
        className="container mx-auto px-4 mt-10 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/templates">
            <motion.div 
              className="p-6 rounded-xl bg-gradient-to-br from-blue-900/20 to-blue-700/5 backdrop-blur-sm border border-blue-800/30 hover:border-blue-500/50 transition-colors group relative overflow-hidden"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="absolute inset-0 bg-blue-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <Code className="w-10 h-10 mb-4 text-blue-400" />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">Templates</h3>
              <p className="text-gray-400">Jumpstart your project with pre-built, responsive templates</p>
              <div className="flex items-center mt-4 text-sm text-blue-400 font-medium">
                <span>Browse templates</span>
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          </Link>
          
          <Link href="/features">
            <motion.div 
              className="p-6 rounded-xl bg-gradient-to-br from-purple-900/20 to-purple-700/5 backdrop-blur-sm border border-purple-800/30 hover:border-purple-500/50 transition-colors group relative overflow-hidden"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="absolute inset-0 bg-purple-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <Sparkles className="w-10 h-10 mb-4 text-purple-400" />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">Features</h3>
              <p className="text-gray-400">Discover AI-powered tools to accelerate your development</p>
              <div className="flex items-center mt-4 text-sm text-purple-400 font-medium">
                <span>Explore features</span>
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          </Link>
          
          <Link href="/pricing">
            <motion.div 
              className="p-6 rounded-xl bg-gradient-to-br from-pink-900/20 to-pink-700/5 backdrop-blur-sm border border-pink-800/30 hover:border-pink-500/50 transition-colors group relative overflow-hidden"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="absolute inset-0 bg-pink-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <Rocket className="w-10 h-10 mb-4 text-pink-400" />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-pink-400 transition-colors">Get Started</h3>
              <p className="text-gray-400">Choose a plan and start building your next project</p>
              <div className="flex items-center mt-4 text-sm text-pink-400 font-medium">
                <span>View pricing</span>
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          </Link>
        </div>
      </motion.section>
      
      {/* Suspense-wrapped components for better loading experience */}
      <Suspense fallback={<SkeletonLoader />}>
        <SocialProof />
      </Suspense>
      
      <Suspense fallback={<SkeletonLoader />}>
        <FeatureHighlights />
      </Suspense>
      
      {/* Command Palette - only on home page */}
      <CommandPalette />
      
      {/* Welcome modal for first-time users */}
      <AnimatePresence>
        {showWelcomeModal && (
          <motion.div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-gray-900 rounded-xl border border-gray-800 max-w-md w-full p-6"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <h2 className="text-2xl font-bold mb-2 flex items-center">
                <Sparkles className="w-6 h-6 text-blue-400 mr-2" />
                Welcome to webly.io
              </h2>
              <p className="text-gray-400 mb-6">Your AI-powered development platform</p>
              
              <div className="space-y-4 mb-6">
                {welcomeSteps.map((step, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="bg-gray-800 rounded-full p-2 h-min">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{step.title}</h3>
                      <p className="text-sm text-gray-400">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button 
                variant="gradient" 
                className="w-full"
                onClick={() => setShowWelcomeModal(false)}
              >
                <Check className="w-4 h-4 mr-2" />
                Get Started
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
