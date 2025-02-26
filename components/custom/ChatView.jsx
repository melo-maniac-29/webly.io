"use client";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import Colors from "@/data/Colors";
import { useConvex, useMutation } from "convex/react";
import { useParams } from "next/navigation";
import React, { use, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Link, Loader2Icon } from "lucide-react";
import Lookup from "@/data/Lookup";
import axios from "axios";
import Prompt from "@/data/Prompt";
import ReactMarkdown from "react-markdown";
import { useSidebar } from "../ui/sidebar";

function ChatView() {
  //used to fetch workspace data by workspacw id

  const { id } = useParams(); //useParams is used to get the dynamic id from the url

  const convex = useConvex(); //useConvex is used to get the convex object

  const { messages, setMessages } = useContext(MessagesContext); //getting messages from the context

  const { userDetail, setUserDetail } = useContext(UserDetailContext); //getting user details from the context

  const [userInput, setUserInput] = useState(); //user input state

  const [loading, setLoading] = useState(false); //loading state

  const UpdateMessages = useMutation(api.workspace.UpdateMessages); //mutation to update the messages

  const{toggleSidebar}=useSidebar();//sidebar toggle

  useEffect(() => {
    //useEffect is used to run the function when the component is mounted
    id && GetWorkspaceData(); //function to get the workspace data
  }, [id]);

  const GetWorkspaceData = async () => {
    //function to get the workspace data
    //fetch the workspace data from the server using the id
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    setMessages(result.messages); //set the messages in the context

    console.log(result);
  };

  useEffect(() => {
    if (messages?.length > 0) {
      /*if messages are present then get the AI response*/

      const role = messages[messages?.length - 1].role;

      if (role == "user") {
        GetAiResponse(); //chat response succesfully-created
      }
    }
  }, [messages]);

  const GetAiResponse = async () => {
    {
      /*function to get the AI response*/
    }

    setLoading(true);
    const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
    const result = await axios.post("/api/ai-chat", {
      prompt: PROMPT,
    });

    const aiResp = {
      //AI response object
      role: "ai",
      content: result.data.result,
    };

    setMessages((prev) => [
      //set the AI response in the messages
      ...prev,
      aiResp,
    ]);

    await UpdateMessages({
      messages: [...messages, aiResp], //update the messages in the database
      workspaceId: id,
    });
    setLoading(false);
  };

  const onGenerate = (input) => {
    //function to generate the response for the user input continuously
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: input,
      },
    ]);
    setUserInput("");
  };

  return (
    <div className="relative h-[85vh] flex flex-col">
      <div className="flex-1 overflow-y-scroll scrollbar-hide pl-5">
        {Array.isArray(messages)
          ? messages.map((msg, index) => (
              <div
                key={index}
                className="p-3 rounded-lg mb-2 flex gap-2 items-start leading-7"
                style={{
                  backgroundColor: Colors.CHAT_BACKGROUND,
                }}
              >
                {msg?.role == "user" && (
                  <Image
                    src={userDetail?.picture}
                    alt="userImage"
                    width={35}
                    height={35}
                    className="rounded-full"
                  />
                )}

                <div className="flex flex-col w-full">
                  <ReactMarkdown
                    components={{
                      p: ({ node, ...props }) => (
                        <p className="text-gray-200 mb-2" {...props} />
                      ),
                      code: ({ node, inline, ...props }) => (
                        <code
                          className={`${
                            inline
                              ? "bg-gray-800 px-1 rounded"
                              : "block bg-gray-800 p-3 rounded-lg my-2"
                          }`}
                          {...props}
                        />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul className="list-disc ml-4 mb-2" {...props} />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol className="list-decimal ml-4 mb-2" {...props} />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="mb-1" {...props} />
                      ),
                      pre: ({ node, ...props }) => (
                        <pre className="bg-gray-800 p-3 rounded-lg my-2" {...props} />
                      ),
                    }}
                  >
                    {msg.content || ""}
                  </ReactMarkdown>
                </div>
              </div>
            ))
          : null}
        {loading && (
          <div
            className="p-3 rounded-lg mb-2 flex gap-2 items-start"
            style={{
              backgroundColor: Colors.CHAT_BACKGROUND,
            }}
          >
            <Loader2Icon className="animate-spin" />
            <h2>Generating response...</h2>
          </div>
        )}
      </div>

        

      {/* Input section */}

        <div className="flex gap-2 items-end">
          {userDetail&& <Image src={userDetail?.picture} alt="userImage" width={35} height={35} className="rounded-full cursor-pointer" 
          onClick={toggleSidebar} />}
      <div
        className="p-5 border rounded-xl max-w-xl w-full mt-3"
        style={{
          backgroundColor: Colors.BACKGROUND,
        }}
      >
        <div className="flex gap-2">
          <textarea
            value={userInput}
            placeholder={Lookup.INPUT_PLACEHOLDER}
            onChange={(event) => setUserInput(event.target.value)}
            className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"
          />
          {userInput && (
            <ArrowRight
              onClick={() => onGenerate(userInput)}
              className="bg-blue-500 p-2 h-9 w-9 rounded-md cursor-pointer"
            />
          )}
        </div>
        <div className="h-5 w-5">
          <Link />
        </div>
      </div>
      </div>
    </div>
  );
}

export default ChatView;
