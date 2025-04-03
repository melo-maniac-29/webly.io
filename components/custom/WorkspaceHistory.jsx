"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import React, { useContext, useEffect, useState } from "react";
import { useSidebar } from "../ui/sidebar";
import Link from "next/link";
import { Clock, MessageSquare, Plus, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

function WorkspaceHistory() {
  const { userDetail } = useContext(UserDetailContext);
  const convex = useConvex();
  const [workspaceList, setWorkspaceList] = useState();
  const { toggleSidebar } = useSidebar();
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    userDetail && GetAllWorkspace();
  }, [userDetail]);

  const GetAllWorkspace = async () => {
    const result = await convex.query(api.workspace.GetAllWorkspaces, {
      userId: userDetail?._id,
    });
    setWorkspaceList(result);
    console.log(result);
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
        <motion.div 
          className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded-full"
          whileHover={{ scale: 1.05 }}
        >
          {workspaceList?.length || 0} chat{workspaceList?.length !== 1 ? 's' : ''}
        </motion.div>
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

      <div className="space-y-1 mt-3">
        <AnimatePresence>
          {filteredWorkspaces && filteredWorkspaces.length > 0 ? (
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
              className="text-center py-8 text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {searchQuery ? (
                <div className="space-y-2">
                  <Search size={20} className="mx-auto text-gray-400" />
                  <p className="text-sm">No chats found</p>
                </div>
              ) : workspaceList?.length === 0 ? (
                <div className="space-y-2">
                  <Plus size={20} className="mx-auto text-gray-400" />
                  <p className="text-sm">Start a new chat</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Clock size={20} className="mx-auto text-gray-400 animate-spin" />
                  <p className="text-sm">Loading chats...</p>
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
