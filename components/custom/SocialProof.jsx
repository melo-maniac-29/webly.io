"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

const companies = [
  { name: 'TechCorp', logo: '🏢' },
  { name: 'DevStudio', logo: '🚀' },
  { name: 'CodeMasters', logo: '💻' },
  { name: 'WebFlow', logo: '🌊' },
  { name: 'PixelPerfect', logo: '📱' },
  { name: 'CloudNine', logo: '☁️' },
];

const testimonials = [
  {
    quote: "webly.io transformed our development process. What used to take days now takes hours.",
    author: "Sarah Johnson",
    role: "CTO at DevStudio",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg"
  },
  {
    quote: "The AI code generation is mind-blowing. It's like having a senior developer working alongside you 24/7.",
    author: "Mark Chen",
    role: "Lead Developer at TechCorp",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg"
  },
  {
    quote: "We've cut our development time in half since switching to webly.io. Absolutely worth every penny.",
    author: "Jessica Parker",
    role: "Product Manager at CloudNine",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  }
];

export default function SocialProof() {
  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 via-purple-900/5 to-transparent -z-10" />
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Users className="h-5 w-5 text-blue-400" />
            <h2 className="text-sm font-medium text-blue-400 uppercase tracking-wider">Trusted by developers worldwide</h2>
          </div>
          <h3 className="text-3xl font-bold">Join thousands of satisfied users</h3>
        </motion.div>
        
        {/* Companies */}
        <motion.div 
          className="flex flex-wrap justify-center gap-8 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {companies.map((company, index) => (
            <motion.div 
              key={company.name}
              className="flex items-center gap-2 text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
            >
              <span className="text-2xl">{company.logo}</span>
              <span className="font-medium">{company.name}</span>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 * index }}
            >
              <div className="mb-4 text-gray-300 relative">
                <span className="absolute -top-3 -left-2 text-4xl text-blue-500/20">"</span>
                <p className="relative z-10">{testimonial.quote}</p>
                <span className="absolute -bottom-3 -right-2 text-4xl text-blue-500/20">"</span>
              </div>
              <div className="flex items-center mt-6">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author} 
                  className="w-10 h-10 rounded-full mr-3 border border-gray-700"
                />
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          {[
            { value: '10K+', label: 'Active Users' },
            { value: '1M+', label: 'Projects Created' },
            { value: '5K+', label: 'Code Generations' },
            { value: '99.9%', label: 'Uptime' }
          ].map((stat, index) => (
            <div key={index} className="bg-gray-900/30 rounded-lg p-6 border border-gray-800/50">
              <h4 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">{stat.value}</h4>
              <p className="text-gray-400 mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
