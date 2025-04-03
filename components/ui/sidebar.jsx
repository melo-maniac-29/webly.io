"use client";
import * as React from "react";
import { SheetContent, SheetTrigger, Sheet } from "@/components/ui/sheet";
import { cva } from "class-variance-authority";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// Optimized animation variants with better performance
const sidebarVariants = {
  hidden: (side) => ({ 
    x: side === "right" ? "100%" : "-100%", 
    opacity: 0,
    boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)"
  }),
  visible: { 
    x: "0%", 
    opacity: 1,
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.3)",
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 30,
      opacity: { duration: 0.2 }
    }
  },
  exit: (side) => ({ 
    x: side === "right" ? "100%" : "-100%", 
    opacity: 0,
    boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 30,
      opacity: { duration: 0.2 }
    }
  })
};

// Improved sidebar content variants with more CSS options
const sidebarContentVariants = cva(
  "flex h-full flex-col overflow-hidden rounded-lg bg-background pb-0 shadow-lg relative",
  {
    variants: {
      side: {
        left: "rounded-r-lg border-r",
        right: "rounded-l-lg border-l",
      },
      appearance: {
        default: "bg-background",
        translucent: "bg-background/90 backdrop-blur-md"
      }
    },
    defaultVariants: {
      side: "right",
      appearance: "translucent"
    },
  }
);

// Context with extended features
export const SidebarContext = React.createContext({
  isOpen: false,
  setIsOpen: () => {},
  side: "right",
  toggleSidebar: () => {},
  lastActiveTrigger: null,
  setLastActiveTrigger: () => {},
});

export const useSidebar = () => {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

function Sidebar({
  children,
  side = "right",
  className,
  defaultOpen = false,
  appearance = "translucent",
  width = "xs",
  mouseSensitivity = 20,
  ...props
}) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const [shouldTrackMouse, setShouldTrackMouse] = React.useState(true);
  const prefersReducedMotion = useReducedMotion();
  const timeoutRef = React.useRef(null);
  const contentRef = React.useRef(null);
  const lastInteractionRef = React.useRef(Date.now());
  
  // Get actual width value from size prop
  const widthClass = React.useMemo(() => {
    const sizes = {
      "xs": "max-w-xs",
      "sm": "max-w-sm", 
      "md": "max-w-md",
      "lg": "max-w-lg",
      "xl": "max-w-xl",
      "2xl": "max-w-2xl",
      "3xl": "max-w-3xl",
      "4xl": "max-w-4xl",
      "5xl": "max-w-5xl",
      "full": "max-w-full"
    };
    return sizes[width] || sizes.xs;
  }, [width]);
  
  // Improved mouse tracking with debounce
  React.useEffect(() => {
    let debounceTimeout;
    
    const handleMouseMove = (e) => {
      if (!shouldTrackMouse) return;
      
      // Only check position after a minimum interval since last interaction
      if (Date.now() - lastInteractionRef.current < 500) return;
      
      // If sidebar is open, check if mouse is far enough away to close it
      if (isOpen) {
        const sidebarElement = document.querySelector(`.sidebar-${side}`);
        if (sidebarElement) {
          const rect = sidebarElement.getBoundingClientRect();
          const threshold = 50;
          
          // For right sidebar, close if mouse is far enough to the left
          if (side === "right" && e.clientX < rect.left - threshold) {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
              setIsOpen(false);
            }, 200);
          }
          // For left sidebar, close if mouse is far enough to the right
          else if (side === "left" && e.clientX > rect.right + threshold) {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
              setIsOpen(false);
            }, 200);
          }
          // If mouse moved back to sidebar area, clear any pending close timeout
          else if (
            e.clientX >= rect.left - 10 && 
            e.clientX <= rect.right + 10 && 
            e.clientY >= rect.top && 
            e.clientY <= rect.bottom
          ) {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }
          }
        }
      }
      // If sidebar is closed, check if mouse is near edge to open it
      else {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
          // For right sidebar, detect when cursor is near right edge
          if (side === "right") {
            const triggerThreshold = window.innerWidth - mouseSensitivity;
            if (e.clientX >= triggerThreshold) {
              lastInteractionRef.current = Date.now();
              setIsOpen(true);
              // Temporarily disable tracking to prevent flicker
              setShouldTrackMouse(false);
              setTimeout(() => setShouldTrackMouse(true), 800);
            }
          }
          // For left sidebar, detect when cursor is near left edge
          else if (side === "left") {
            const triggerThreshold = mouseSensitivity;
            if (e.clientX <= triggerThreshold) {
              lastInteractionRef.current = Date.now();
              setIsOpen(true);
              setShouldTrackMouse(false);
              setTimeout(() => setShouldTrackMouse(true), 800);
            }
          }
        }, 50); // 50ms debounce
      }
    };

    // Simpler mouseLeave handler that works more reliably
    const handleMouseLeave = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      
      timeoutRef.current = setTimeout(() => {
        lastInteractionRef.current = Date.now();
        setIsOpen(false);
      }, 300);
    };
    
    // Keep sidebar open when mouse is over it
    const handleMouseEnter = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    // Add global mouse move listener for constant position tracking
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    
    // We use MutationObserver to attach event listeners after the sidebar element appears
    const observer = new MutationObserver(() => {
      const sidebarElement = document.querySelector(`.sidebar-${side}`);
      if (sidebarElement) {
        sidebarElement.addEventListener("mouseleave", handleMouseLeave);
        sidebarElement.addEventListener("mouseenter", handleMouseEnter);
      }
    });
    
    // Start observing the document body
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Also attach immediately in case element already exists
    const sidebarElement = document.querySelector(`.sidebar-${side}`);
    if (sidebarElement) {
      sidebarElement.addEventListener("mouseleave", handleMouseLeave);
      sidebarElement.addEventListener("mouseenter", handleMouseEnter);
    }

    // Add keyboard accessibility
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
      observer.disconnect();
      
      const sidebarElement = document.querySelector(`.sidebar-${side}`);
      if (sidebarElement) {
        sidebarElement.removeEventListener("mouseleave", handleMouseLeave);
        sidebarElement.removeEventListener("mouseenter", handleMouseEnter);
      }
      
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      clearTimeout(debounceTimeout);
    };
  }, [isOpen, side, shouldTrackMouse, mouseSensitivity]);

  // Toggle sidebar with improved touch/click tracking
  const toggleSidebar = React.useCallback(() => {
    lastInteractionRef.current = Date.now();
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        setIsOpen,
        side,
        toggleSidebar,
      }}
    >
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Add overlay for small screens */}
            <motion.div
              className="fixed inset-0 bg-black/20 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              ref={contentRef}
              className={`fixed inset-y-0 ${side === "right" ? "right-0" : "left-0"} z-50 ${widthClass} w-full sidebar-${side}`}
              custom={side}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={prefersReducedMotion ? {} : sidebarVariants}
              style={{
                willChange: "transform",
                backfaceVisibility: "hidden",
              }}
            >
              <div className={sidebarContentVariants({ side, appearance, className })}>
                {children}
              </div>
            </motion.div>
          </>
        )}
        
        {/* Optional indicator when closed */}
        {!isOpen && (
          <motion.div 
            className={`absolute ${side === "right" ? "-left-2" : "-right-2"} top-1/2 transform -translate-y-1/2 z-50`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className={`bg-blue-500/20 backdrop-blur-sm h-24 w-2 rounded-${side === "right" ? "l" : "r"}-md border-${side === "right" ? "l" : "r"} border-t border-b border-blue-500/30`} />
          </motion.div>
        )}
      </AnimatePresence>
    </SidebarContext.Provider>
  );
}

// SidebarProvider component
function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [side, setSide] = React.useState("left");
  const [lastActiveTrigger, setLastActiveTrigger] = React.useState(null);

  const toggleSidebar = React.useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const value = React.useMemo(() => ({
    isOpen,
    setIsOpen,
    side,
    setSide,
    toggleSidebar,
    lastActiveTrigger,
    setLastActiveTrigger
  }), [isOpen, side, toggleSidebar, lastActiveTrigger]);

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}

// Enhanced header with sticky support
const SidebarHeader = React.forwardRef(({ className, sticky = false, ...props }, ref) => (
  <div
    ref={ref}
    className={`relative shrink-0 ${sticky ? "sticky top-0 z-10" : ""} ${className}`}
    {...props}
  />
));
SidebarHeader.displayName = "SidebarHeader";

// Enhanced footer with sticky bottom support
const SidebarFooter = React.forwardRef(({ className, sticky = true, ...props }, ref) => (
  <div
    ref={ref}
    className={`shrink-0 ${sticky ? "sticky bottom-0 z-10" : ""} ${className}`}
    {...props}
  />
));
SidebarFooter.displayName = "SidebarFooter";

// Content with scroll fade options
const SidebarContent = React.forwardRef(({ 
  className, 
  fadeTop = false,
  fadeBottom = false,
  ...props 
}, ref) => (
  <div
    ref={ref}
    className={`relative flex-1 ${className}`}
    {...props}
  >
    {fadeTop && (
      <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
    )}
    {props.children}
    {fadeBottom && (
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    )}
  </div>
));
SidebarContent.displayName = "SidebarContent";

// Enhanced group with new animation options
const SidebarGroup = React.forwardRef(({ 
  className, 
  animate = false,
  title,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={`text-sm font-medium ${className}`}
      {...props}
    >
      {title && (
        <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-2 px-2">{title}</h3>
      )}
      {animate ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {props.children}
        </motion.div>
      ) : props.children}
    </div>
  );
});
SidebarGroup.displayName = "SidebarGroup";

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  Sheet,
  SheetTrigger,
  SheetContent,
  SidebarProvider
};
