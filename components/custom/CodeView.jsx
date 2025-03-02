"use client"; //client side rendering

import React, { useState, useContext, useEffect } from "react"; // Add useContext and useEffect imports
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
import { Loader2Icon } from "lucide-react";
import { countToken } from "./ChatView";
import { UserDetailContext } from "@/context/UserDetailContext";
import SandpackPreviewClient from "./SandpackPreviewClient";
import { ActionContext } from "@/context/ActionContext";

function CodeView() {
  const { id } = useParams(); //get the workspace id from the url

  const [activeTab, setActiveTab] = useState("code"); // Fixed useState hook

  const [files, setFiles] = useState(Lookup?.DEFAULT_FILE); // Fixed useState hook

  const { messages, setMessages } = useContext(MessagesContext); //Fixed useContext hook for messages

  const UpdateFiles = useMutation(api.workspace.UpdateFiles); //Fixed useMutation hook for updating files

  const convex = useConvex(); //Fixed useConvex hook

  const [loading, setLoading] = useState(false); //Fixed useState hook for loading

  const { userDetail, setUserDetail } = useContext(UserDetailContext); //Fixed useContext hook for userDetail

  const UpdateTokens = useMutation(api.users.UpdateToken); //Fixed useMutation hook for updating tokens

  const{action,setAction}=useContext(ActionContext); //Fixed useContext hook for action

  useEffect(() => {
    id && GetFiles(); //get the files from the database
  }, [id]);

  useEffect(() => {
    setActiveTab('preview');
  },[action])

  const GetFiles = async () => {
    //function to get the files from the database
    setLoading(true); //set loading to true
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    const mergedFiles = { ...Lookup.DEFAULT_FILE, ...result?.fileData };
    setFiles(mergedFiles);
    setLoading(false); //set loading to false
  };

  useEffect(() => {
    if (messages?.length > 0) {
      /*if messages are present then get the AI response*/

      const role = messages[messages?.length - 1].role;

      if (role == "user") {
        GenerateAiCode(); //chat response succesfully-created
      }
    }
  }, [messages]);

  const GenerateAiCode = async () => {
    setLoading(true); //set loading to true
    const PROMPT = JSON.stringify(messages) + " " + Prompt.CODE_GEN_PROMPT;
    const result = await axios.post("/api/gen-ai-code", {
      prompt: PROMPT,
    });
    console.log(result.data);
    const aiResp = result.data;

    const mergedFiles = { ...Lookup.DEFAULT_FILE, ...aiResp?.files };
    setFiles(mergedFiles);

    await UpdateFiles({
      //update the files in the database
      workspaceId: id,
      files: aiResp?.files,
    });

    const token =
      Number(userDetail?.token) - Number(countToken(JSON.stringify(aiResp))); //update tokens in database

    await UpdateTokens({
      userId: userDetail?._id,
      token: token,
    });

    setUserDetail(prev=>({
      ...prev,
      token:token
    }))

    setLoading(false); //set loading to false
  };

  return (
    <div className="relative">
      <div className="bg-[#181818] w-full p-2 border">
        <div
          className="items-center flex flex-wrap shrink-0
         bg-black p-1 w-[140px] gap-3 justify-center rounded-full"
        >
          <h2
            onClick={() => setActiveTab("code")}
            className={`text-sm cursor-pointer ${
              activeTab === "code"
                ? "text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full"
                : ""
            }`}
          >
            code
          </h2>
          <h2
            onClick={() => setActiveTab("preview")}
            className={`text-sm cursor-pointer ${
              activeTab === "preview"
                ? "text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full"
                : ""
            }`}
          >
            preview
          </h2>
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
          {activeTab=='code'?<>
          <SandpackFileExplorer style={{height:'80vh'}} />
          <SandpackCodeEditor style={{height:'80vh'}} />
          </>:<>
          <SandpackPreviewClient/>
          </>}
        </SandpackLayout>
      </SandpackProvider>
      {loading && (
        <div
          className="p-10 bg-gray-900 opacity-80
      absolute top-0  rounded-lg  w-full h-full flex items-center justify-center"
        >
          <Loader2Icon className="animate-spin h-10 w-10 text-white" />
          <h2 className="text-white">Generating your files..</h2>
        </div>
      )}
    </div>
  );
}

export default CodeView;
