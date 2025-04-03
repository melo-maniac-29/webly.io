'use client';
import { MessagesContext } from '@/context/MessagesContext';
import { UserDetailContext } from '@/context/UserDetailContext';
import Colors from '@/data/Colors';
import Lookup from '@/data/Lookup';
import { ArrowRight, Link, Sparkles, Cpu, Code, Wand2, Zap, Globe, Braces } from 'lucide-react';
import React, { useContext, useState, useRef, useEffect } from 'react';
import SignInDialog from './SignInDialog';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion, useAnimation, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';

function Hero() {
  const [userInput, setUserInput] = useState('');
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
  const router = useRouter();
  const textareaRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const controls = useAnimation();
  const heroRef = useRef(null);
  
  // Track mouse movement for parallax effect
  const handleMouseMove = (e) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  // Random particle generation
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const particleCount = 20;
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 2,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  const onGenerate = async (input) => {
    if (!userDetail?.name) {
      setOpenDialog(true);
      return;
    }
    if(userDetail?.token < 10) {
      toast("You don't have enough token to generate code");
      return
    }
    
    controls.start({
      scale: [1, 0.98, 1],
      transition: { duration: 0.5 }
    });
    
    const msg = {
      role: 'user',
      content: input,
    };
    setMessages(msg);

    // Make sure we have a valid user ID before creating workspace
    if (!userDetail?._id) {
      toast.error("User session is incomplete. Please sign in again.");
      return;
    }

    try {
      const workspaceId = await CreateWorkspace({
        user: userDetail._id,  // Ensure user ID is passed
        messages: [msg],
      });
      console.log(workspaceId);
      router.push('/workspace/' + workspaceId);
    } catch (error) {
      console.error("Error creating workspace:", error);
      toast.error("Failed to create workspace. Please try again.");
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 30, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", damping: 15 } }
  };
  
  // Variables for parallax effect
  const rotateX = useTransform(mouseY, [0, 400], [3, -3]);
  const rotateY = useTransform(mouseX, [0, 400], [-3, 3]);

  // Features to display
  const features = [
    { icon: Zap, text: "Fast Generation", color: "text-yellow-400" },
    { icon: Globe, text: "Easy Deploy", color: "text-blue-400" },
    { icon: Braces, text: "Clean Code", color: "text-purple-400" }
  ];

  return (
    <motion.div 
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative flex flex-col items-center mt-8 md:mt-12 gap-2 px-4 overflow-hidden"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-blue-500 opacity-20"
            style={{ 
              left: `${particle.x}%`, 
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`
            }}
            animate={{
              y: [0, -100],
              opacity: [0.2, 0]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      {/* Features Badge */}
      <motion.div
        variants={item}
        className="mb-4 flex items-center gap-1 bg-gray-800/70 backdrop-blur-md px-3 py-1.5 rounded-full text-xs border border-gray-700 shadow-md"
      >
        {features.map((feature, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className="mx-1.5 opacity-30">•</span>}
            <div className="flex items-center gap-1.5">
              <feature.icon size={12} className={feature.color} />
              <span>{feature.text}</span>
            </div>
          </React.Fragment>
        ))}
      </motion.div>
      
      {/* Main content */}
      <motion.div 
        className="relative"
        variants={item}
        style={{ 
          rotateX: rotateX, 
          rotateY: rotateY,
          perspective: "1000px",
          transformStyle: "preserve-3d"
        }}
      >
        <motion.h2 
          className="font-bold text-4xl md:text-6xl lg:text-7xl text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {Lookup.HERO_HEADING}
        </motion.h2>
        
        <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl" />
        
        <motion.div 
          className="absolute -top-10 -right-10 text-yellow-300"
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, repeatType: "reverse" }
          }}
        >
          <Sparkles size={30} />
        </motion.div>
        
        <motion.div 
          className="absolute -bottom-5 -left-5 text-blue-400"
          animate={{ 
            rotate: -360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, repeatType: "reverse", delay: 1 }
          }}
        >
          <Code size={24} />
        </motion.div>
      </motion.div>
      
      <motion.p 
        className="text-gray-400 font-medium text-center max-w-xl mx-auto mt-4 text-base md:text-lg"
        variants={item}
      >
        {Lookup.HERO_DESC}
      </motion.p>
      
      <motion.div
        className="p-4 md:p-6 border rounded-xl max-w-2xl w-full mt-6 backdrop-blur-md relative"
        style={{
          backgroundColor: "rgba(20, 20, 30, 0.6)",
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          borderColor: isFocused ? 'rgba(59, 130, 246, 0.5)' : 'rgba(255, 255, 255, 0.1)'
        }}
        variants={item}
        animate={controls}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl -z-10"
          animate={{ 
            opacity: isFocused ? 0.5 : 0.1,
            scale: isFocused ? 1.02 : 1
          }}
          transition={{ duration: 0.3 }}
        />
        
        <div className="flex gap-2 relative">
          <textarea
            ref={textareaRef}
            placeholder={Lookup.INPUT_PLACEHOLDER}
            className="outline-none bg-transparent w-full h-24 md:h-32 max-h-56 resize-none text-white placeholder-gray-400"
            onChange={(event) => setUserInput(event.target.value)}
            value={userInput}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          
          <AnimatePresence>
            {userInput && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="self-end mb-2"
              >
                <button
                  onClick={() => onGenerate(userInput)}
                  className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-2 w-10 h-10 md:w-12 md:h-12 rounded-md cursor-pointer shadow-lg group overflow-hidden"
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  />
                  <ArrowRight className="relative z-10 w-full h-full text-white" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="flex items-center mt-3 text-gray-400">
          <Wand2 className="h-4 w-4 mr-2" />
          <span className="text-xs">Enter your prompt or select a suggestion below</span>
        </div>
      </motion.div>

      <motion.div 
        className="flex mt-6 flex-wrap max-w-2xl items-center justify-center gap-2 md:gap-3"
        variants={item}
      >
        {Lookup.SUGGSTIONS.map((suggestion, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <button
              className="p-1.5 px-3 md:p-2 md:px-4 border rounded-full text-xs md:text-sm text-gray-400 hover:text-white hover:border-blue-500 transition-colors relative overflow-hidden group"
              onClick={() => onGenerate(suggestion)}
            >
              <span className="relative z-10">{suggestion}</span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              />
            </button>
          </motion.div>
        ))}
      </motion.div>

      <SignInDialog
        openDialog={openDialog}
        closeDialog={(v) => setOpenDialog(v)}
      />
    </motion.div>
  );
}

export default Hero;