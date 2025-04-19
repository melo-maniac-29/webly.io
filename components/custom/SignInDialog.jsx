import React, { useState } from "react";
import Lookup from "@/data/Lookup";
import { Button } from "../ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useContext } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import uuid4 from "uuid4";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

function SignInDialog({ openDialog, closeDialog }) {
  const { userDetail, setUserDetail } = useContext(UserDetailContext); // getting userDetail from context
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [signInComplete, setSignInComplete] = useState(false);

  const CreateUser = useMutation(api.users.CreateUser); // mutation for creating user

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setIsSigningIn(true);
        console.log(tokenResponse);
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          { headers: { Authorization: "Bearer " + tokenResponse?.access_token } }
        );

        console.log(userInfo);
        const user = userInfo?.data; // backend data saving

        await CreateUser({   // calling mutation for creating user in backend 
          name: user?.name,
          email: user?.email,
          picture: user?.picture,
          uid: uuid4()   // generating random uid for users  uuid4 external function 
        });

        if (typeof window !== undefined) {  // extra security for while reloading data won't be lost
          localStorage.setItem('user', JSON.stringify(user));
        }

        setUserDetail(userInfo?.data); // setting userDetail in context
        setSignInComplete(true);
        
        // Show success message briefly before refreshing
        setTimeout(() => {
          closeDialog(false);
          // Refresh the page to ensure all components pick up the new user state
          window.location.reload();
        }, 1500);
      } catch (error) {
        console.error("Error during sign in:", error);
        setIsSigningIn(false);
      }
    },
    onError: (errorResponse) => {
      console.log(errorResponse);
      setIsSigningIn(false);
    },
  });

  // Custom animated SVG logo - copied from Header.jsx for consistency
  const LogoSVG = () => {
    // Pre-calculated static positions for sparkle points
    const sparklePoints = [
      { cx: 95, cy: 30, delay: 0 },
      { cx: 75, cy: 85, delay: 0.4 },
      { cx: 20, cy: 80, delay: 0.8 },
      { cx: 15, cy: 30, delay: 1.2 },
      { cx: 55, cy: 5, delay: 1.6 }
    ];
    
    return (
      <motion.svg 
        width="60" 
        height="60" 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        suppressHydrationWarning={true}
      >
        {/* Background circle */}
        <motion.circle 
          cx="50" 
          cy="50" 
          r="45" 
          fill="url(#logoGradient)"
          animate={{ 
            scale: [0.95, 1, 0.95],
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        
        {/* Code bracket left */}
        <motion.path 
          d="M35 30L20 50L35 70" 
          stroke="white" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ 
            duration: 1.5, 
            delay: 0.3,
            ease: "easeInOut"
          }}
        />
        
        {/* Code bracket right */}
        <motion.path 
          d="M65 30L80 50L65 70" 
          stroke="white" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ 
            duration: 1.5, 
            delay: 0.6,
            ease: "easeInOut"
          }}
        />
        
        {/* W Letter */}
        <motion.path 
          d="M40 42L45 58L50 42L55 58L60 42" 
          stroke="white" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ 
            duration: 2, 
            delay: 1,
            ease: "easeInOut"
          }}
        />
        
        {/* Pulse ring */}
        <motion.circle 
          cx="50" 
          cy="50" 
          r="50" 
          stroke="rgba(255,255,255,0.3)" 
          strokeWidth="2" 
          fill="none"
          initial={{ scale: 0.8, opacity: 0.8 }}
          animate={{ 
            scale: [0.8, 1.1, 0.8], 
            opacity: [0.3, 0, 0.3]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Sparkle points with fixed coordinates */}
        {sparklePoints.map((point, i) => (
          <motion.circle 
            key={i}
            cx={point.cx}
            cy={point.cy}
            r="2"
            fill="white"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              delay: point.delay,
              ease: "easeOut" 
            }}
          />
        ))}
        
        {/* Extra visual enhancements */}
        <motion.circle
          cx="50"
          cy="50"
          r="35"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
          fill="none"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner glow */}
        <motion.circle
          cx="50"
          cy="50"
          r="25"
          fill="url(#innerGlow)"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        {/* Gradients definition */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          
          <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>
      </motion.svg>
    );
  };
  
  // Don't render anything if dialog is not open
  if (!openDialog) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999]"
      onClick={() => closeDialog(false)}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 10, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 10, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 border border-gray-700 relative"
        style={{ margin: 'auto' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <motion.button
          className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          onClick={() => closeDialog(false)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </motion.button>
        
        {signInComplete ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center text-center"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 10 }}
              className="bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded-full p-4 mb-4"
            >
              <Check className="w-8 h-8 text-green-400" />
            </motion.div>
            <h2 className="font-bold text-2xl text-center text-white mb-2">Sign In Successful!</h2>
            <p className="text-center text-gray-400">Loading your dashboard...</p>
            <motion.div 
              className="w-full h-1 bg-gray-800 mt-6 overflow-hidden rounded-full"
              initial={{ width: "0%" }}
            >
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                animate={{ width: ["0%", "100%"] }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 10 }}
              className="mb-4"
            >
              <LogoSVG />
            </motion.div>
            
            <h2 className="font-bold text-2xl text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-3">
              {Lookup.SIGNIN_HEADING}
            </h2>
            
            <p className="mb-6 text-center text-gray-300">{Lookup.SIGNIN_SUBHEADING}</p>
            
            <Button 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white mt-2 p-6 h-auto rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3" 
              onClick={googleLogin}
              disabled={isSigningIn}
            >
              {isSigningIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="font-medium">Signing In...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="font-medium">Sign In With Google</span>
                </>
              )}
            </Button>
            
            <p className="text-xs mt-6 text-center text-gray-500 max-w-sm">
              {Lookup.SIGNIn_AGREEMENT_TEXT}
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default SignInDialog;
