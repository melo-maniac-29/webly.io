"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import React, { useContext, useEffect, useState } from "react";
import { useSidebar } from "../ui/sidebar";
import Link from "next/link";
import { Clock, MessageSquare, Plus, Search, AlertCircle, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

// Cache duration in milliseconds (15 minutes)
const CACHE_EXPIRATION = 15 * 60 * 1000;

function WorkspaceHistory() {
  const { userDetail } = useContext(UserDetailContext);
  const convex = useConvex();
  const [workspaceList, setWorkspaceList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { toggleSidebar } = useSidebar();
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const [lastFetched, setLastFetched] = useState(null);

  // Load data from cache or API when component mounts or userDetail changes
  useEffect(() => {
    if (userDetail && userDetail._id) {
      loadWorkspaces();
    }
  }, [userDetail]);

  // Load workspaces from cache or fetch from API
  const loadWorkspaces = async () => {
    if (!userDetail?._id) return;
    
    // Try to get data from localStorage first
    const cachedData = getFromCache(userDetail._id);
    
    if (cachedData) {
      // Use cached data while checking if it needs refresh
      setWorkspaceList(cachedData.data);
      setLastFetched(cachedData.timestamp);
      
      // If cache is still fresh, don't fetch again
      if (!isCacheExpired(cachedData.timestamp)) {
        return;
      }
      
      // If we've reached here, cache exists but is expired
      // We'll refresh in the background without showing loading state
      fetchWorkspaces(false);
    } else {
      // No cache exists, fetch with loading state
      fetchWorkspaces(true);
    }
  };

  // Check if cache is expired
  const isCacheExpired = (timestamp) => {
    return Date.now() - timestamp > CACHE_EXPIRATION;
  };

  // Get data from cache
  const getFromCache = (userId) => {
    if (typeof window === 'undefined') return null;
    
    try {
      const cachedItem = localStorage.getItem(`workspaces-${userId}`);
      if (!cachedItem) return null;
      
      const parsed = JSON.parse(cachedItem);
      return parsed;
    } catch (error) {
      console.error("Error reading from cache:", error);
      return null;
    }
  };

  // Save data to cache
  const saveToCache = (userId, data) => {
    if (typeof window === 'undefined') return;
    
    try {
      const cacheItem = {
        timestamp: Date.now(),
        data: data
      };
      localStorage.setItem(`workspaces-${userId}`, JSON.stringify(cacheItem));
    } catch (error) {
      console.error("Error saving to cache:", error);
    }
  };

  // Fetch workspaces from API
  const fetchWorkspaces = async (showLoading = true) => {
    try {
      if (showLoading) {
        setIsLoading(true);
      }
      setError(null);
      
      // Ensure userId is a valid value
      if (!userDetail?._id) {
        console.warn("User ID not available, skipping workspace fetch");
        if (showLoading) setIsLoading(false);
        return;
      }
      
      const result = await convex.query(api.workspace.GetAllWorkspaces, {
        userId: userDetail._id,
      });
      
      // Update state with new data
      setWorkspaceList(result || []);
      setLastFetched(Date.now());
      
      // Save to cache
      saveToCache(userDetail._id, result || []);
    } catch (err) {
      console.error("Error fetching workspaces:", err);
      setError("Failed to load workspaces");
    } finally {
      if (showLoading) {
        setIsLoading(false);
      }
    }
  };

  // Force refresh from API
  const handleRefresh = () => {
    fetchWorkspaces(true);
  };

  // Filter workspaces based on search query
  const filteredWorkspaces = searchQuery && workspaceList 
    ? workspaceList.filter(workspace => 
        workspace?.messages[0]?.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : workspaceList;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-medium text-base flex items-center">
          <MessageSquare size={14} className="mr-2 text-blue-400" />
          Your Chats
        </h2>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleRefresh}
            className="text-gray-400 hover:text-blue-400 transition-colors"
            title="Refresh chat list"
          >
            <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
          </motion.button>
          <motion.div 
            className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            {workspaceList?.length || 0} chat{workspaceList?.length !== 1 ? 's' : ''}
          </motion.div>
        </div>
      </div>

      {/* Search input */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search chats..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-800/50 border border-gray-700/50 rounded-md py-1.5 pl-9 pr-3 text-sm outline-none focus:border-blue-500/50 transition-colors"
        />
      </div>

      {/* Last fetched indicator */}
      {lastFetched && (
        <div className="text-xs text-gray-500 italic text-right">
          Last updated: {new Date(lastFetched).toLocaleTimeString()}
        </div>
      )}

      <div className="space-y-1 mt-3 min-h-[200px]">
        <AnimatePresence>
          {isLoading ? (
            <motion.div 
              className="text-center py-4 text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Clock size={20} className="mx-auto text-gray-400 animate-spin" />
              <p className="text-sm mt-2">Loading chats...</p>
            </motion.div>
          ) : error ? (
            <motion.div 
              className="text-center py-4 text-red-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <AlertCircle size={20} className="mx-auto" />
              <p className="text-sm mt-2">{error}</p>
              <button 
                onClick={handleRefresh} 
                className="mt-3 text-xs text-blue-400 hover:underline"
              >
                Try Again
              </button>
            </motion.div>
          ) : filteredWorkspaces && filteredWorkspaces.length > 0 ? (
            filteredWorkspaces.map((workspace, index) => {
              const isActive = pathname.includes(workspace?._id);
              
              return (
                <motion.div
                  key={workspace?._id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={"/workspace/" + workspace?._id} onClick={toggleSidebar}>
                    <motion.div 
                      className={`relative p-2 px-3 text-sm rounded-md transition-colors flex items-start gap-2 group ${
                        isActive 
                          ? "bg-blue-600/20 text-white border border-blue-500/30" 
                          : "hover:bg-gray-800/60 text-gray-400 hover:text-white border border-transparent"
                      }`}
                      whileHover={{ x: 2 }}
                    >
                      <div className="flex items-center gap-2 w-full">
                        <Clock size={14} className={isActive ? "text-blue-400" : "text-gray-500"} />
                        <div className="flex-1 overflow-hidden">
                          <div className="truncate">
                            {workspace?.messages[0]?.content}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {new Date(workspace?._creationTime).toLocaleDateString()} · {workspace?.messages.length} messages
                          </div>
                        </div>
                      </div>
                      
                      {isActive && (
                        <motion.div 
                          className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500"
                          layoutId="activeWorkspace"
                        />
                      )}
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })
          ) : (
            <motion.div 
              className="text-center py-4 text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {searchQuery ? (
                <div className="space-y-2">
                  <Search size={20} className="mx-auto text-gray-400" />
                  <p className="text-sm">No chats found</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Plus size={20} className="mx-auto text-gray-400" />
                  <p className="text-sm">Start a new chat</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default WorkspaceHistory;
