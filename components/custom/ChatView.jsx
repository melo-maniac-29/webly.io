"use client";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import Colors from "@/data/Colors";
import { useConvex, useMutation } from "convex/react";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ArrowRight, Bot, Link, Loader2Icon, Send, Sparkles, User } from "lucide-react";
import Lookup from "@/data/Lookup";
import axios from "axios";
import Prompt from "@/data/Prompt";
import ReactMarkdown from "react-markdown";
import { useSidebar } from "../ui/sidebar";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../ui/button";

export const countToken = (inputText) => {
  return inputText.trim().split(/\s+/).filter(word => word).length;
};

function ChatView() {
  const { id } = useParams();
  const convex = useConvex();
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const UpdateMessages = useMutation(api.workspace.UpdateMessages);
  const { toggleSidebar } = useSidebar();
  const UpdateTokens = useMutation(api.users.UpdateToken);
  const messagesEndRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    id && GetWorkspaceData();
  }, [id]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check if scroll button should be shown
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
      setShowScrollButton(!isNearBottom);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const GetWorkspaceData = async () => {
    setLoading(true);
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    setMessages(result.messages);
    setLoading(false);
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1].role;
      if (role == "user") {
        GetAiResponse();
      }
    }
  }, [messages]);

  const GetAiResponse = async () => {
    setLoading(true);
    const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
    const result = await axios.post("/api/ai-chat", {
      prompt: PROMPT,
    });

    const aiResp = {
      role: "ai",
      content: result.data.result,
    };

    setMessages((prev) => [...prev, aiResp]);

    await UpdateMessages({
      messages: [...messages, aiResp],
      workspaceId: id,
    });

    const token = Number(userDetail?.token) - Number(countToken(JSON.stringify(aiResp)));

    setUserDetail(prev => ({
      ...prev,
      token: token
    }));

    await UpdateTokens({
      userId: userDetail?._id,
      token: token,
    });

    setLoading(false);
  };

  const onGenerate = (input) => {
    if (userDetail?.token < 10) {
      toast('You do not have enough tokens to generate response');
      return;
    }
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: input,
      },
    ]);
    setUserInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (userInput.trim()) {
        onGenerate(userInput);
      }
    }
  };

  return (
    <motion.div 
      className="relative h-[85vh] flex flex-col rounded-xl overflow-hidden border border-gray-800 shadow-lg bg-gray-950/70"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", duration: 0.5 }}
    >
      {/* Header */}
      <div className="bg-gray-900 p-3 border-b border-gray-800 flex items-center justify-between backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Bot size={18} className="text-blue-400" />
          <h2 className="font-medium text-sm">AI Assistant</h2>
        </div>
        <div className="text-xs text-gray-400 bg-gray-800/60 px-2 py-1 rounded-full flex items-center">
          <Sparkles size={12} className="text-blue-400 mr-1" />
          {userDetail?.token || 0} tokens left
        </div>
      </div>
      
      {/* Messages Area */}
      <div 
        ref={scrollContainerRef} 
        className="flex-1 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent p-4"
      >
        <AnimatePresence>
          {Array.isArray(messages) && messages.length > 0 ? (
            messages.map((msg, index) => (
              <motion.div
                key={index}
                className={`mb-4 flex gap-3 ${msg?.role === "user" ? "justify-end" : "justify-start"}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div 
                  className={`rounded-2xl p-4 max-w-[85%] relative ${
                    msg?.role === "user" 
                      ? "bg-blue-600/20 text-white ml-auto border border-blue-500/30" 
                      : "bg-gray-800/70 border border-gray-700/50"
                  }`}
                >
                  <div className="flex items-center mb-2 gap-2">
                    {msg?.role === "user" ? (
                      <>
                        <span className="text-xs font-medium text-gray-300">You</span>
                        <User size={14} className="text-blue-400" />
                      </>
                    ) : (
                      <>
                        <Bot size={14} className="text-purple-400" />
                        <span className="text-xs font-medium text-gray-300">AI Assistant</span>
                      </>
                    )}
                  </div>
                  
                  <ReactMarkdown
                    components={{
                      p: ({ node, ...props }) => (
                        <p className="text-gray-200 mb-2 leading-relaxed" {...props} />
                      ),
                      code: ({ node, inline, ...props }) => (
                        <code
                          className={`${
                            inline
                              ? "bg-gray-700/50 px-1 py-0.5 rounded text-blue-300"
                              : "block bg-gray-900/90 p-3 rounded-lg my-2 text-blue-300 overflow-x-auto"
                          }`}
                          {...props}
                        />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul className="list-disc ml-4 mb-2 space-y-1" {...props} />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol className="list-decimal ml-4 mb-2 space-y-1" {...props} />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="mb-1" {...props} />
                      ),
                      pre: ({ node, ...props }) => (
                        <pre className="bg-gray-900/90 p-3 rounded-lg my-2 overflow-x-auto" {...props} />
                      ),
                    }}
                  >
                    {msg.content || ""}
                  </ReactMarkdown>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center p-6 rounded-lg bg-gray-800/30 border border-gray-700/50 max-w-xs mx-auto">
                <Bot size={32} className="text-blue-400 mx-auto mb-3" />
                <h3 className="text-lg font-medium mb-2">Start the conversation</h3>
                <p className="text-sm text-gray-400">
                  Ask questions about your code or request new features to build
                </p>
              </div>
            </div>
          )}
        </AnimatePresence>
        
        {loading && (
          <motion.div
            className="p-4 rounded-2xl mb-2 flex gap-2 items-center bg-gray-800/70 border border-gray-700/50 max-w-[85%]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Bot size={14} className="text-purple-400" />
              <span className="text-xs font-medium text-gray-300">AI Assistant</span>
            </div>
            <div className="flex items-center ml-2">
              <motion.div
                className="bg-blue-400 h-2 w-2 rounded-full mr-1"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
              />
              <motion.div
                className="bg-purple-400 h-2 w-2 rounded-full mr-1"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, delay: 0.2, repeat: Infinity, repeatType: "loop" }}
              />
              <motion.div
                className="bg-pink-400 h-2 w-2 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, delay: 0.4, repeat: Infinity, repeatType: "loop" }}
              />
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Scroll to bottom button */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            className="absolute bottom-20 right-4 bg-blue-600 text-white p-2 rounded-full shadow-lg z-10"
            onClick={scrollToBottom}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowRight className="rotate-90" size={16} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <div className="p-3 border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="flex gap-2 items-end">
          {userDetail && (
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="relative"
              onClick={toggleSidebar}
            >
              <Image 
                src={userDetail?.picture} 
                alt="userImage" 
                width={36} 
                height={36} 
                className="rounded-full cursor-pointer shadow-md border-2 border-gray-800" 
              />
              <motion.div 
                className="absolute inset-0 rounded-full border border-blue-500 -z-10"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          )}
          
          <div className="relative flex-1">
            <textarea
              value={userInput}
              placeholder={Lookup.INPUT_PLACEHOLDER}
              onChange={(event) => setUserInput(event.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full resize-none bg-gray-800/50 border border-gray-700/50 rounded-lg p-3 pr-12 outline-none focus:border-blue-500/50 transition-colors min-h-[80px] max-h-32 placeholder-gray-500 text-gray-200"
            />
            
            <AnimatePresence>
              {userInput && (
                <motion.button
                  onClick={() => onGenerate(userInput)}
                  className="absolute right-3 bottom-3 bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-md text-white shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <Send size={18} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        <div className="mt-2 text-xs text-gray-500 flex items-center justify-between px-2">
          <span>Shift + Enter for new line</span>
          {userDetail?.token < 50 && (
            <motion.div 
              className="text-yellow-500 flex items-center gap-1"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles size={10} />
              <span>Low on tokens</span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ChatView;