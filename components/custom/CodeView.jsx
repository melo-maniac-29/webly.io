"use client";

import React, { useState, useContext, useEffect } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import Lookup from "@/data/Lookup";
import axios from "axios";
import { MessagesContext } from "@/context/MessagesContext";
import Prompt from "@/data/Prompt";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Code, FileCode, LayoutGrid, Loader2Icon, PlayCircle, SquareCode } from "lucide-react";
import { countToken } from "./ChatView";
import { UserDetailContext } from "@/context/UserDetailContext";
import SandpackPreviewClient from "./SandpackPreviewClient";
import { ActionContext } from "@/context/ActionContext";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";

function CodeView() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("code");
  const [files, setFiles] = useState(Lookup?.DEFAULT_FILE);
  const { messages, setMessages } = useContext(MessagesContext);
  const UpdateFiles = useMutation(api.workspace.UpdateFiles);
  const convex = useConvex();
  const [loading, setLoading] = useState(false);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const UpdateTokens = useMutation(api.users.UpdateToken);
  const {action, setAction} = useContext(ActionContext);

  useEffect(() => {
    id && GetFiles();
  }, [id]);

  useEffect(() => {
    setActiveTab('preview');
  },[action]);

  const GetFiles = async () => {
    setLoading(true);
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    const mergedFiles = { ...Lookup.DEFAULT_FILE, ...result?.fileData };
    setFiles(mergedFiles);
    setLoading(false);
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1].role;
      if (role == "user") {
        GenerateAiCode();
      }
    }
  }, [messages]);

  const GenerateAiCode = async () => {
    setLoading(true);
    const PROMPT = JSON.stringify(messages) + " " + Prompt.CODE_GEN_PROMPT;
    const result = await axios.post("/api/gen-ai-code", {
      prompt: PROMPT,
    });
    console.log(result.data);
    const aiResp = result.data;

    const mergedFiles = { ...Lookup.DEFAULT_FILE, ...aiResp?.files };
    setFiles(mergedFiles);

    await UpdateFiles({
      workspaceId: id,
      files: aiResp?.files,
    });

    const token = Number(userDetail?.token) - Number(countToken(JSON.stringify(aiResp)));

    await UpdateTokens({
      userId: userDetail?._id,
      token: token,
    });

    setUserDetail(prev=>({
      ...prev,
      token:token
    }));

    setLoading(false);
  };

  return (
    <motion.div 
      className="relative rounded-xl overflow-hidden shadow-lg border border-gray-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", duration: 0.6 }}
    >
      <div className="bg-gray-900 w-full p-2 border-b border-gray-800 backdrop-blur-sm">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2 px-2">
            <Code size={18} className="text-blue-400" />
            <h2 className="font-medium text-sm text-gray-300">Web Editor</h2>
          </div>
          
          <div className="flex items-center gap-2 rounded-lg bg-gray-950/50 p-1 backdrop-blur-sm">
            <motion.button
              className={`relative flex items-center gap-1 text-sm px-4 py-1.5 rounded-md ${
                activeTab === "code" 
                  ? "text-white" 
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("code")}
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
            >
              <FileCode size={14} />
              <span>Code</span>
              {activeTab === "code" && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-md -z-10"
                  layoutId="tab-bg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </motion.button>
            
            <motion.button
              className={`relative flex items-center gap-1 text-sm px-4 py-1.5 rounded-md ${
                activeTab === "preview" 
                  ? "text-white" 
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("preview")}
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
            >
              <PlayCircle size={14} />
              <span>Preview</span>
              {activeTab === "preview" && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-md -z-10"
                  layoutId="tab-bg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </motion.button>
          </div>
        </div>
      </div>
      
      <SandpackProvider
        files={files}
        template="react"
        theme={"dark"}
        customSetup={{
          dependencies: {
            ...Lookup.DEPENDANCY,
          },
        }}
        options={{
          externalResources: ["https://cdn.tailwindcss.com"],
        }}
      >
        <SandpackLayout>
          <AnimatePresence mode="wait">
            {activeTab === 'code' ? (
              <motion.div
                key="code-view"
                className="flex w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <SandpackFileExplorer style={{height:'80vh'}} className="border-r border-gray-800" />
                <SandpackCodeEditor style={{height:'80vh'}} />
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                className="w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <SandpackPreviewClient />
              </motion.div>
            )}
          </AnimatePresence>
        </SandpackLayout>
      </SandpackProvider>
      
      <AnimatePresence>
        {loading && (
          <motion.div
            className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            >
              <Loader2Icon className="h-12 w-12 text-blue-500" />
            </motion.div>
            <motion.h2 
              className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
              animate={{ 
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Generating your files...
            </motion.h2>
            <motion.div
              className="text-xs text-gray-400 max-w-sm text-center mt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Our AI is crafting your code. This might take a few moments.
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default CodeView;