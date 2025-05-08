"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Search, Filter, Code, Layout, Tag, Layers, Grid, Star, ArrowRight, Monitor, Smartphone, Tablet, ChevronDown, Check, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Template data (in a real app, this would come from an API)
const templatesData = [
  {
    id: 1,
    title: "E-commerce Dashboard",
    description: "A complete admin dashboard for managing your online store.",
    category: "Dashboard",
    tags: ["React", "TailwindCSS", "Chart.js"],
    image: "https://placehold.co/600x400/2563eb/FFFFFF?text=E-commerce+Dashboard",
    difficulty: "Intermediate",
    rating: 4.8,
    downloads: 1250,
    isNew: true,
    isPremium: false
  },
  {
    id: 2,
    title: "Personal Portfolio",
    description: "Showcase your work with this elegant portfolio template.",
    category: "Portfolio",
    tags: ["React", "Framer Motion", "Responsive"],
    image: "https://placehold.co/600x400/8b5cf6/FFFFFF?text=Portfolio+Template",
    difficulty: "Beginner",
    rating: 4.5,
    downloads: 3420,
    isNew: false,
    isPremium: false
  },
  {
    id: 3,
    title: "SaaS Landing Page",
    description: "Convert visitors into customers with this optimized landing page.",
    category: "Landing Page",
    tags: ["Next.js", "TailwindCSS", "SEO"],
    image: "https://placehold.co/600x400/ec4899/FFFFFF?text=SaaS+Landing+Page",
    difficulty: "Intermediate",
    rating: 4.9,
    downloads: 2180,
    isNew: true,
    isPremium: true
  },
  {
    id: 4,
    title: "Blog Platform",
    description: "A feature-rich blog template with dark mode support.",
    category: "Blog",
    tags: ["Next.js", "MDX", "Dark Mode"],
    image: "https://placehold.co/600x400/64748b/FFFFFF?text=Blog+Platform",
    difficulty: "Advanced",
    rating: 4.7,
    downloads: 1870,
    isNew: false,
    isPremium: true
  },
  {
    id: 5,
    title: "Social Media Feed",
    description: "A responsive social media feed with interactive elements.",
    category: "Social",
    tags: ["React", "Firebase", "Real-time"],
    image: "https://placehold.co/600x400/0ea5e9/FFFFFF?text=Social+Media+Feed",
    difficulty: "Advanced",
    rating: 4.6,
    downloads: 980,
    isNew: false,
    isPremium: false
  },
  {
    id: 6,
    title: "Admin Dashboard",
    description: "A comprehensive admin panel with dark and light themes.",
    category: "Dashboard",
    tags: ["React", "Redux", "Recharts"],
    image: "https://placehold.co/600x400/6366f1/FFFFFF?text=Admin+Dashboard",
    difficulty: "Intermediate",
    rating: 4.8,
    downloads: 2450,
    isNew: false,
    isPremium: true
  },
  {
    id: 7,
    title: "Restaurant Website",
    description: "Showcase your menu and accept reservations online.",
    category: "Business",
    tags: ["Next.js", "TailwindCSS", "Reservation System"],
    image: "https://placehold.co/600x400/f59e0b/FFFFFF?text=Restaurant+Website",
    difficulty: "Beginner",
    rating: 4.4,
    downloads: 1650,
    isNew: true,
    isPremium: false
  },
  {
    id: 8,
    title: "Chat Application",
    description: "Real-time chat with message history and user presence.",
    category: "Communication",
    tags: ["React", "Socket.io", "Firebase"],
    image: "https://placehold.co/600x400/10b981/FFFFFF?text=Chat+Application",
    difficulty: "Advanced",
    rating: 4.9,
    downloads: 1120,
    isNew: false,
    isPremium: true
  }
];

// Categories for filtering
const categories = ["All", "Dashboard", "Landing Page", "Portfolio", "Blog", "Business", "Social", "Communication"];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];
const tags = ["React", "Next.js", "TailwindCSS", "Firebase", "Chart.js", "Responsive", "Dark Mode", "SEO"];

export default function Templates() {
  const [templates, setTemplates] = useState(templatesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedTags, setSelectedTags] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  const [activePreview, setActivePreview] = useState(null);
  const [previewDevice, setPreviewDevice] = useState('desktop');
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  // Filter templates based on selected filters
  useEffect(() => {
    let filteredTemplates = templatesData;
    
    // Search term filter
    if (searchTerm) {
      filteredTemplates = filteredTemplates.filter(template => 
        template.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Category filter
    if (selectedCategory !== 'All') {
      filteredTemplates = filteredTemplates.filter(template => 
        template.category === selectedCategory
      );
    }
    
    // Difficulty filter
    if (selectedDifficulty !== 'All') {
      filteredTemplates = filteredTemplates.filter(template => 
        template.difficulty === selectedDifficulty
      );
    }
    
    // Tags filter
    if (selectedTags.length > 0) {
      filteredTemplates = filteredTemplates.filter(template => 
        selectedTags.every(tag => template.tags.includes(tag))
      );
    }
    
    // Premium filter
    if (showPremiumOnly) {
      filteredTemplates = filteredTemplates.filter(template => template.isPremium);
    }
    
    setTemplates(filteredTemplates);
  }, [searchTerm, selectedCategory, selectedDifficulty, selectedTags, showPremiumOnly]);
  
  // Toggle tag selection
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setSelectedTags([]);
    setShowPremiumOnly(false);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
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
    const particleCount = 20;
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);
  
  return (
    <motion.div 
      ref={containerRef}
      className="w-full pb-20"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      {/* Hero section */}
      <div className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-purple-500 opacity-20"
              style={{ 
                left: `${particle.x}%`, 
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`
              }}
              animate={{
                y: [0, -300],
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
          <motion.div className="text-center max-w-3xl mx-auto" variants={itemVariants}>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
              variants={itemVariants}
            >
              Ready-to-Use Templates
            </motion.h1>
            
            <motion.p 
              className="text-gray-300 text-xl mb-10"
              variants={itemVariants}
            >
              Jumpstart your next project with our professionally designed, fully responsive templates.
            </motion.p>
            
            {/* Search bar */}
            <motion.div 
              className="relative max-w-xl mx-auto"
              variants={itemVariants}
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-3 bg-gray-900/70 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base backdrop-blur-sm"
                placeholder="Search templates by name, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setSearchTerm('')}
                >
                  <X className="h-5 w-5 text-gray-400 hover:text-white" />
                </button>
              )}
            </motion.div>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
          style={{ y: y1 }}
        />
      </div>
      
      {/* Main content section */}
      <div className="container mx-auto px-6 relative z-10 mt-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters sidebar */}
          <motion.div 
            className={`${filtersOpen ? 'block' : 'hidden'} md:block w-full md:w-64 lg:w-72 flex-shrink-0`}
            variants={itemVariants}
          >
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </h2>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={resetFilters}
                  className="text-xs"
                >
                  Reset All
                </Button>
              </div>
              
              {/* Category filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-3 py-2 rounded-md text-sm ${
                        selectedCategory === category
                          ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30'
                          : 'hover:bg-gray-800 text-gray-300'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Difficulty filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Difficulty</h3>
                <div className="space-y-2">
                  {difficulties.map((difficulty) => (
                    <button
                      key={difficulty}
                      onClick={() => setSelectedDifficulty(difficulty)}
                      className={`block w-full text-left px-3 py-2 rounded-md text-sm ${
                        selectedDifficulty === difficulty
                          ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30'
                          : 'hover:bg-gray-800 text-gray-300'
                      }`}
                    >
                      {difficulty}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Tags filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                        selectedTags.includes(tag)
                          ? 'bg-blue-600/30 text-blue-400 border border-blue-600/50'
                          : 'bg-gray-800 text-gray-400 border border-gray-700'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Premium filter */}
              <div className="mb-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showPremiumOnly}
                    onChange={() => setShowPremiumOnly(!showPremiumOnly)}
                    className="h-4 w-4 text-blue-600 border-gray-700 rounded bg-gray-800 focus:ring-blue-500"
                  />
                  <div className="flex items-center">
                    <Sparkles className="h-4 w-4 text-yellow-500 mr-1.5" />
                    <span className="text-sm">Premium Templates Only</span>
                  </div>
                </label>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-800">
                <p className="text-xs text-gray-500 mb-4">
                  Showing {templates.length} of {templatesData.length} templates
                </p>
                <div className="flex items-center justify-center">
                  <Link href="/">
                    <Button variant="gradient" size="sm" className="w-full">
                      <Code className="h-4 w-4 mr-2" />
                      <span>Create Custom Template</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Templates grid */}
          <div className="flex-1">
            {/* Mobile filter toggle */}
            <motion.div className="mb-6 md:hidden" variants={itemVariants}>
              <Button 
                variant="outline" 
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="w-full flex items-center justify-between py-3"
              >
                <span className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters {selectedCategory !== 'All' || selectedDifficulty !== 'All' || selectedTags.length > 0 || showPremiumOnly ? 
                    `(${selectedTags.length + (selectedCategory !== 'All' ? 1 : 0) + (selectedDifficulty !== 'All' ? 1 : 0) + (showPremiumOnly ? 1 : 0)})` : ''}
                </span>
                <ChevronDown 
                  className={`h-4 w-4 transition-transform ${filtersOpen ? 'rotate-180' : ''}`} 
                />
              </Button>
            </motion.div>
            
            {/* No results message */}
            {templates.length === 0 && (
              <motion.div 
                className="flex flex-col items-center justify-center py-10 sm:py-16 text-center"
                variants={itemVariants}
              >
                <Search className="h-10 w-10 sm:h-12 sm:w-12 text-gray-500 mb-4" />
                <h3 className="text-lg sm:text-xl font-medium mb-2">No templates found</h3>
                <p className="text-gray-400 mb-6 max-w-md px-4">
                  We couldn't find any templates matching your current filters. Try adjusting your search criteria.
                </p>
                <Button variant="outline" onClick={resetFilters}>
                  Reset All Filters
                </Button>
              </motion.div>
            )}
            
            {/* Templates grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {templates.map((template, index) => (
                <motion.div
                  key={template.id}
                  className="group bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden hover:border-blue-500/50 transition-colors"
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  {/* Template image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={template.image} 
                      alt={template.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-70" />
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {template.isNew && (
                        <span className="px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
                          New
                        </span>
                      )}
                      {template.isPremium && (
                        <span className="px-2 py-1 bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-xs font-medium rounded-full flex items-center">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Premium
                        </span>
                      )}
                    </div>
                    
                    {/* Preview button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="gradient" 
                        className="z-10"
                        onClick={() => setActivePreview(template)}
                      >
                        <Monitor className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </div>
                  
                  {/* Template info */}
                  <div className="p-4 sm:p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-base sm:text-lg font-semibold group-hover:text-blue-400 transition-colors">
                        {template.title}
                      </h3>
                      <div className="flex items-center text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="ml-1 text-xs sm:text-sm font-medium">{template.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-xs sm:text-sm mb-4 line-clamp-2">
                      {template.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-4">
                      {template.tags.map((tag, idx) => (
                        <span 
                          key={idx} 
                          className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-800 text-gray-400 text-xs rounded-md hover:bg-gray-700 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleTag(tag);
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center pt-3 sm:pt-4 border-t border-gray-800">
                      <span className="text-xs sm:text-sm text-gray-400 flex items-center">
                        <Layers className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-1.5" />
                        {template.difficulty}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-400">
                        {template.downloads.toLocaleString()} uses
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Preview modal */}
      <AnimatePresence>
        {activePreview && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePreview(null)}
          >
            <motion.div 
              className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden max-w-5xl w-full max-h-[90vh] flex flex-col"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Preview header */}
              <div className="p-3 sm:p-4 border-b border-gray-800 flex justify-between items-center">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold">{activePreview.title}</h3>
                  <p className="text-gray-400 text-xs sm:text-sm">{activePreview.category}</p>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-1 sm:gap-2 bg-gray-800 rounded-lg p-1">
                    <button 
                      className={`p-1.5 rounded ${previewDevice === 'desktop' ? 'bg-gray-700' : 'hover:bg-gray-700/50'}`}
                      onClick={() => setPreviewDevice('desktop')}
                    >
                      <Monitor className="h-4 w-4" />
                    </button>
                    <button 
                      className={`p-1.5 rounded ${previewDevice === 'tablet' ? 'bg-gray-700' : 'hover:bg-gray-700/50'}`}
                      onClick={() => setPreviewDevice('tablet')}
                    >
                      <Tablet className="h-4 w-4" />
                    </button>
                    <button 
                      className={`p-1.5 rounded ${previewDevice === 'mobile' ? 'bg-gray-700' : 'hover:bg-gray-700/50'}`}
                      onClick={() => setPreviewDevice('mobile')}
                    >
                      <Smartphone className="h-4 w-4" />
                    </button>
                  </div>
                  <button 
                    className="p-1.5 rounded hover:bg-gray-800"
                    onClick={() => setActivePreview(null)}
                  >
                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
              </div>
              
              {/* Preview content */}
              <div className="flex-1 overflow-auto p-4 flex justify-center">
                <div 
                  className={`bg-white rounded-lg overflow-hidden transition-all duration-300 transform ${
                    previewDevice === 'desktop' ? 'w-full' :
                    previewDevice === 'tablet' ? 'w-[768px]' : 'w-[375px]'
                  }`}
                >
                  <img 
                    src={activePreview.image} 
                    alt={activePreview.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Preview footer */}
              <div className="p-3 sm:p-4 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-3">
                <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1 text-sm font-medium">{activePreview.rating}</span>
                  </div>
                  <span className="text-sm text-gray-400">
                    {activePreview.downloads.toLocaleString()} uses
                  </span>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Preview Code
                  </Button>
                  <Button variant="gradient" className="gap-1 w-full sm:w-auto">
                    <span>Use Template</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
