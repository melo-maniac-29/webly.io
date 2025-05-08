"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Zap, Globe, PuzzleIcon, BrainCircuit, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function FeatureHighlights() {
  const features = [
    {
      icon: <BrainCircuit className="w-6 h-6" />,
      title: "AI Code Generation",
      description: "Turn your ideas into clean, production-ready code with our advanced AI models",
      color: "from-blue-500 to-blue-700",
      delay: 0.1
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast Deployment",
      description: "Deploy your applications with a single click to our global CDN",
      color: "from-yellow-500 to-orange-600",
      delay: 0.2
    },
    {
      icon: <PuzzleIcon className="w-6 h-6" />,
      title: "Component Library",
      description: "Access hundreds of pre-built, customizable UI components",
      color: "from-green-500 to-emerald-600",
      delay: 0.3
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Hosting",
      description: "Serve your content from edge locations around the world",
      color: "from-purple-500 to-indigo-600",
      delay: 0.4
    }
  ];
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", damping: 15 } }
  };
  
  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-block mb-2"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", damping: 8 }}
          >
            <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-full">
              <Sparkles className="w-6 h-6 text-blue-400" />
            </div>
          </motion.div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            webly.io comes packed with everything you need to build and deploy web applications faster than ever
          </p>
        </motion.div>
        
        {/* Feature cards */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-blue-500/30 transition-colors group"
              variants={item}
              whileHover={{ y: -5 }}
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Feature showcase */}
        <motion.div 
          className="bg-gradient-to-br from-gray-900/80 to-gray-900/50 rounded-2xl p-5 sm:p-8 border border-gray-800 mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-800/50 text-blue-400 text-sm">
                <Code className="w-4 h-4" />
                <span>AI-Powered Development</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">Turn your ideas into code</h3>
              <p className="text-gray-400 mb-6">
                Our advanced AI understands your requirements and generates clean, production-ready code that follows best practices and modern standards.
              </p>
              
              <ul className="space-y-3 mb-8">
                {[
                  "Natural language to code conversion",
                  "Multiple programming languages support",
                  "Intelligent code suggestions",
                  "Automatic error detection and fixes"
                ].map((feature, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + (index * 0.1) }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
              
              <Link href="/features">
                <Button variant="gradient" className="group">
                  <span>Learn more about AI features</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            
            <div className="relative mt-6 lg:mt-0">
              <div className="bg-gray-950 rounded-lg border border-gray-800 p-3 sm:p-4 shadow-xl max-w-md mx-auto overflow-x-auto">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <div className="ml-2 text-sm text-gray-400">AI Code Generator</div>
                </div>
                <pre className="bg-gray-900 rounded-md p-4 overflow-x-auto text-sm">
                  <code className="text-blue-300">
                    <div>// Generate a React component with Tailwind</div>
                    <div className="text-green-400">function Button({'{'} props {'}'}) {'{'}</div>
                    <div>  return (</div>
                    <div className="text-purple-400">    &lt;button</div>
                    <div className="text-yellow-300">      className="px-4 py-2 bg-blue-500 text-white </div>
                    <div className="text-yellow-300">                rounded-md hover:bg-blue-600"</div>
                    <div className="text-purple-400">      {'{{'}...props{'}}'}</div>
                    <div className="text-purple-400">    &gt;</div>
                    <div className="text-white">      {'{'}props.children{'}'}</div>
                    <div className="text-purple-400">    &lt;/button&gt;</div>
                    <div>  );</div>
                    <div className="text-green-400">{'}'}</div>
                  </code>
                </pre>
                
                <div className="mt-4 border-t border-gray-800 pt-4">
                  <div className="text-sm text-gray-400 mb-2">AI Suggestions:</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded-md text-xs">Add loading state</span>
                    <span className="px-2 py-1 bg-purple-900/30 text-purple-400 rounded-md text-xs">Add accessibility props</span>
                    <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded-md text-xs">Add TypeScript types</span>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
