"use client";
import PricingModel from '@/components/custom/PricingModel';
import { UserDetailContext } from '@/context/UserDetailContext';
import Colors from '@/data/Colors';
import Lookup from '@/data/Lookup';
import React, { useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, GaugeCircle, CreditCard } from 'lucide-react';

function Pricing() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  // Calculate token percentage for gauge
  const maxTokens = 1000; // Assuming this is the max tokens
  const tokenPercentage = userDetail?.token ? Math.min((userDetail.token / maxTokens) * 100, 100) : 0;
  
  // Determine token status
  const getTokenStatus = () => {
    if (tokenPercentage > 70) return { color: 'text-green-500', bg: 'bg-green-500/20', message: 'Your token balance is healthy!' };
    if (tokenPercentage > 30) return { color: 'text-yellow-500', bg: 'bg-yellow-500/20', message: 'Consider upgrading soon' };
    return { color: 'text-red-500', bg: 'bg-red-500/20', message: 'Low on tokens, upgrade now!' };
  };
  
  const tokenStatus = getTokenStatus();

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", damping: 20 } }
  };

  return (
    <motion.div 
      className="mt-6 flex flex-col items-center w-full p-6 md:p-10 md:px-16 lg:px-24 xl:px-32 relative"
      initial="hidden"
      animate="show"
      variants={container}
    >
      {/* Background gradient */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-blue-500/10 via-purple-500/5 to-transparent -z-10" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500/20"
            style={{
              width: Math.random() * 8 + 4,
              height: Math.random() * 8 + 4,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0.2, 0]
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      {/* Header section */}
      <motion.div variants={item} className="relative mb-4">
        <motion.div 
          className="absolute -top-6 -right-6 text-yellow-300"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles size={20} />
        </motion.div>
        <h2 className="font-bold text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
          Pricing
        </h2>
      </motion.div>
      
      <motion.p 
        variants={item} 
        className="text-gray-400 max-w-xl text-center mt-4 text-base md:text-lg"
      >
        {Lookup.PRICING_DESC}
      </motion.p>
      
      {/* Token status card */}
      <motion.div
        variants={item}
        className="p-6 border rounded-xl w-full mt-8 backdrop-blur-md relative overflow-hidden"
        style={{ backgroundColor: "rgba(20, 20, 30, 0.6)" }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 -z-10"
          animate={{ 
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* Token gauge */}
          <div className="flex items-center gap-4">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-gray-700 flex items-center justify-center relative overflow-hidden"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
              >
                <svg viewBox="0 0 100 100" className="absolute inset-0 transform -rotate-90 w-full h-full">
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray="264"
                    strokeLinecap="round"
                    className={tokenStatus.color}
                    initial={{ strokeDashoffset: 264 }}
                    animate={{ 
                      strokeDashoffset: 264 - (264 * tokenPercentage / 100) 
                    }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </svg>
                <motion.div 
                  className="absolute inset-3 rounded-full bg-gray-800 flex items-center justify-center"
                  animate={{ scale: [0.95, 1, 0.95] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Zap className={`w-8 h-8 ${tokenStatus.color}`} />
                </motion.div>
              </motion.div>
            </motion.div>
            
            <div>
              <h2 className="text-xl md:text-2xl font-bold">
                <motion.span
                  className={tokenStatus.color}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring" }}
                >
                  {userDetail?.token || 0}
                </motion.span>
                <span className="text-gray-300 ml-2">Tokens</span>
              </h2>
              <motion.p 
                className={`text-sm mt-1 ${tokenStatus.color}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {tokenStatus.message}
              </motion.p>
            </div>
          </div>
          
          {/* Upgrade message */}
          <motion.div 
            className="flex flex-col justify-center bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-lg p-4 border border-blue-800/30"
            whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-400" />
              <h3 className="font-medium text-lg text-white">Need more tokens?</h3>
            </div>
            <p className="text-gray-400 mt-1">Unlock unlimited potential with our premium plans</p>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Pricing tiers section */}
      <motion.div variants={item} className="w-full mt-12">
        <motion.h3 
          className="text-2xl font-bold mb-8 text-center relative inline-block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span>Choose Your Plan</span>
          <motion.div 
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 mt-2"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.8, duration: 0.6 }}
          />
        </motion.h3>
        
        <PricingModel />
      </motion.div>
      
      {/* FAQ or additional info section */}
      <motion.div 
        variants={item} 
        className="mt-16 max-w-3xl w-full px-6 py-8 rounded-xl bg-gray-900/50 border border-gray-800"
      >
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Sparkles className="text-yellow-400 w-5 h-5" />
          <span>Why Upgrade?</span>
        </h3>
        <ul className="space-y-3">
          {[
            "Generate larger and more complex projects",
            "Access to premium templates and components",
            "Priority support and faster response times",
            "Higher quality AI responses and code generation",
            "Unlimited exports and deployments"
          ].map((benefit, i) => (
            <motion.li 
              key={i}
              className="flex items-start gap-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + (i * 0.1) }}
            >
              <motion.div 
                className="text-blue-500 mt-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 1 + (i * 0.1) }}
              >
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </motion.div>
              <span className="text-gray-300">{benefit}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

export default Pricing;
