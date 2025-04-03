"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Code, Sparkles, Zap, Globe, Cpu, RotateCcw, ShieldCheck, PenTool, LayoutGrid, Smartphone, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Features() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [currentFeature, setCurrentFeature] = useState(0);
  
  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "AI-Powered Code Generation",
      description: "Transform your ideas into clean, optimized code in seconds with our advanced AI models.",
      color: "from-blue-500 to-indigo-600",
      stats: ["98% accuracy", "Supports 12+ languages", "Instant generation"]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast Performance",
      description: "Experience blazing fast deployments and real-time updates with our optimized infrastructure.",
      color: "from-yellow-400 to-orange-500",
      stats: ["< 500ms response time", "99.9% uptime", "Global CDN"]
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "One-Click Deployment",
      description: "Deploy your projects to production with a single click. No complex configurations required.",
      color: "from-green-400 to-emerald-600",
      stats: ["Global hosting", "Custom domains", "SSL included"]
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Enterprise-Grade Security",
      description: "Rest easy with military-grade encryption, regular security audits, and GDPR compliance.",
      color: "from-purple-500 to-indigo-700",
      stats: ["End-to-end encryption", "Role-based access", "SOC 2 compliant"]
    }
  ];
  
  const technologies = [
    { name: "React", color: "bg-blue-500" },
    { name: "Next.js", color: "bg-black" },
    { name: "Tailwind", color: "bg-sky-500" },
    { name: "TypeScript", color: "bg-blue-700" },
    { name: "Node.js", color: "bg-green-600" },
    { name: "MongoDB", color: "bg-green-500" },
    { name: "GraphQL", color: "bg-pink-600" },
    { name: "REST API", color: "bg-red-500" }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  // Generate particles for the background
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const particleCount = 30;
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 25 + 10,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  // Auto rotate featured item
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [features.length]);
  
  // Parallax effect values
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  
  return (
    <motion.div 
      ref={containerRef}
      className="w-full overflow-hidden"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      {/* Hero section with animated particles background */}
      <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Animated background particles */}
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
                y: [0, -500],
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
        
        {/* Hero content */}
        <div className="container mx-auto px-6 py-16 relative z-10">
          <motion.div className="text-center" variants={itemVariants}>
            <motion.div 
              className="inline-block mb-4 px-6 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-blue-400 font-medium flex items-center">
                <Sparkles className="w-4 h-4 mr-2" />
                Discover the power of webly.io
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-6"
              variants={itemVariants}
            >
              Build, Deploy, Scale
              <br/> 
              <span className="text-white">Faster Than Ever</span>
            </motion.h1>
            
            <motion.p 
              className="text-gray-400 text-xl max-w-2xl mx-auto mb-10"
              variants={itemVariants}
            >
              Transform your development workflow with our comprehensive suite of AI-powered tools and features designed to accelerate your project delivery.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 justify-center"
              variants={itemVariants}
            >
              <Link href="/">
                <Button variant="gradient" size="lg" className="text-white gap-2 group">
                  <span>Get Started Today</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                View Documentation
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
          style={{ y: y1 }}
        />
        <motion.div 
          className="absolute -bottom-10 left-0 right-0 h-20 bg-gradient-to-t from-background/80 to-transparent"
          style={{ y: y2 }}
        />
      </div>
      
      {/* Main features grid section */}
      <section className="py-20 container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cutting-Edge Features
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our powerful features designed to streamline your development process and deliver exceptional results.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: <Code />, title: "AI Code Generation", description: "Generate clean, production-ready code from natural language prompts." },
            { icon: <PenTool />, title: "Customizable UI Components", description: "Access a vast library of pre-built, customizable UI components." },
            { icon: <LayoutGrid />, title: "Responsive Layouts", description: "Create responsive designs that work seamlessly across all devices." },
            { icon: <Smartphone />, title: "Mobile-First Approach", description: "Optimize your applications for mobile devices with our mobile-first tools." },
            { icon: <RotateCcw />, title: "Version Control", description: "Track changes and collaborate with team members using built-in versioning." },
            { icon: <Users />, title: "Team Collaboration", description: "Work together seamlessly with real-time collaboration features." }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-colors group"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20 flex items-center justify-center mb-4 text-blue-400 group-hover:text-white group-hover:border-blue-500/50 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Interactive feature showcase */}
      <section className="py-16 bg-gradient-to-b from-transparent to-gray-900/30">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            variants={itemVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">webly.io</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6" />
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Feature carousel */}
            <motion.div variants={itemVariants}>
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 overflow-hidden shadow-xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentFeature}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="min-h-[320px]"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${features[currentFeature].color} flex items-center justify-center mb-6 text-white`}>
                      {features[currentFeature].icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">
                      {features[currentFeature].title}
                    </h3>
                    <p className="text-gray-400 mb-8">
                      {features[currentFeature].description}
                    </p>
                    
                    <div className="grid grid-cols-3 gap-4">
                      {features[currentFeature].stats.map((stat, idx) => (
                        <div key={idx} className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
                          <p className="text-sm text-gray-400 font-medium">{stat}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                {/* Navigation dots */}
                <div className="flex justify-center mt-8 gap-2">
                  {features.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentFeature(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${idx === currentFeature ? 'bg-blue-500' : 'bg-gray-600'}`}
                      aria-label={`View feature ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Technologies grid */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-6">Supported Technologies</h3>
              <p className="text-gray-400 mb-8">
                Our platform integrates seamlessly with your favorite technologies, frameworks, and libraries to provide a complete development experience.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {technologies.map((tech, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center gap-3 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4"
                    whileHover={{ x: 5, backgroundColor: "rgba(30, 41, 59, 0.8)" }}
                  >
                    <div className={`w-8 h-8 rounded-md ${tech.color} flex items-center justify-center text-white font-bold text-sm`}>
                      {tech.name.substring(0, 1)}
                    </div>
                    <span className="font-medium">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Call to action */}
      <section className="py-20">
        <motion.div 
          className="container mx-auto px-6"
          variants={itemVariants}
        >
          <div className="relative bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-purple-900/30 rounded-2xl p-12 backdrop-blur-sm border border-blue-800/30 overflow-hidden shadow-xl">
            {/* Decorative elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl" />
              <motion.div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-white/10"
                animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.1, 0.2] }}
                transition={{ duration: 8, repeat: Infinity }}
              />
            </div>
            
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <motion.div 
                className="inline-block mb-6"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Cpu className="h-12 w-12 text-blue-400" />
              </motion.div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to revolutionize your development workflow?
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Join thousands of developers who are building faster, shipping sooner, and delivering better products with webly.io.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/">
                  <Button variant="gradient" size="lg" className="text-white">
                    Get Started For Free
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
