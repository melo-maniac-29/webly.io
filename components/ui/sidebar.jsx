"use client";
import * as React from "react";
import { SheetContent, SheetTrigger, Sheet } from "@/components/ui/sheet";
import { cva } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";

const sidebarVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: { 
    x: "0%", 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  },
  exit: { 
    x: "100%", 
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};

const sidebarContentVariants = cva(
  "flex h-full flex-col overflow-hidden rounded-lg bg-background pb-0",
  {
    variants: {
      side: {
        left: "rounded-r-none",
        right: "rounded-l-none",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

export const SidebarContext = React.createContext({
  isOpen: false,
  setIsOpen: () => {},
  side: "right",
  toggleSidebar: () => {},
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
  ...props
}) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const [shouldTrackMouse, setShouldTrackMouse] = React.useState(true);
  const timeoutRef = React.useRef(null);
  
  // Track mouse position
  React.useEffect(() => {
    const handleMouseMove = (e) => {
      if (!shouldTrackMouse) return;
      
      // For right sidebar, detect when cursor is near right edge
      if (side === "right") {
        const triggerThreshold = window.innerWidth - 20; // 20px from right edge
        if (e.clientX >= triggerThreshold && !isOpen) {
          setIsOpen(true);
          // Temporarily disable tracking to prevent flicker
          setShouldTrackMouse(false);
          setTimeout(() => setShouldTrackMouse(true), 500);
        }
      }
      // For left sidebar, detect when cursor is near left edge
      else if (side === "left") {
        const triggerThreshold = 20; // 20px from left edge
        if (e.clientX <= triggerThreshold && !isOpen) {
          setIsOpen(true);
          setShouldTrackMouse(false);
          setTimeout(() => setShouldTrackMouse(true), 500);
        }
      }
    };

    // Auto hide when mouse moves away from sidebar
    const handleMouseLeave = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 300); // Short delay before closing
    };
    
    // Keep sidebar open when mouse is over it
    const handleMouseEnter = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    // Get sidebar element to attach mouse enter/leave events
    const sidebarElement = document.querySelector(`.sidebar-${side}`);
    if (sidebarElement) {
      sidebarElement.addEventListener("mouseleave", handleMouseLeave);
      sidebarElement.addEventListener("mouseenter", handleMouseEnter);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (sidebarElement) {
        sidebarElement.removeEventListener("mouseleave", handleMouseLeave);
        sidebarElement.removeEventListener("mouseenter", handleMouseEnter);
      }
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isOpen, side, shouldTrackMouse]);

  const toggleSidebar = React.useCallback(() => {
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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`fixed inset-y-0 ${side === "right" ? "right-0" : "left-0"} z-50 max-w-xs w-full sidebar-${side}`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sidebarVariants}
          >
            <div className={sidebarContentVariants({ side, className })}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SidebarContext.Provider>
  );
}

// Add SidebarProvider component
function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [side, setSide] = React.useState("right");

  const toggleSidebar = React.useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const value = {
    isOpen,
    setIsOpen,
    side,
    setSide,
    toggleSidebar
  };

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}

const SidebarHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`relative shrink-0 ${className}`}
    {...props}
  />
));
SidebarHeader.displayName = "SidebarHeader";

const SidebarFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`shrink-0 ${className}`}
    {...props}
  />
));
SidebarFooter.displayName = "SidebarFooter";

const SidebarContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex-1 ${className}`}
    {...props}
  />
));
SidebarContent.displayName = "SidebarContent";

const SidebarGroup = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`text-sm font-medium ${className}`}
    {...props}
  />
));
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
  SidebarProvider // This is fine now since we're not exporting it earlier
};
