"use client";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import Colors from "@/data/Colors";
import { useConvex } from "convex/react";
import { useParams } from "next/navigation";
import React, { use, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Link } from "lucide-react";
import Lookup from "@/data/Lookup";
import axios from "axios";
import Prompt from "@/data/Prompt";

function ChatView() {
  //used to fetch workspace data by workspacw id

  const { id } = useParams(); //useParams is used to get the dynamic id from the url

  const convex = useConvex(); //useConvex is used to get the convex object

  const { messages, setMessages } = useContext(MessagesContext); //getting messages from the context

  const { userDetail, setUserDetail } = useContext(UserDetailContext); //getting user details from the context

  const [userInput, setUserInput] = useState(); //user input state

  const [loading, setLoading] = useState(false); //loading state

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
        GetAiResponse();  //chat response succesfully-created
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
    console.log(result.data.result);

    setMessages(prev=>[...prev,{
      role:"ai",
      content:result.data.result
    }])
    setLoading(false);
  };

  

  return (
    <div className="relative h-[85vh] flex flex-col">
      <div className="flex-1 overflow-y-scroll">
        {Array.isArray(messages)
          ? messages.map((msg, index) => (
              <div
                key={index}
                className="p-3 rounded-lg mb-2 flex gap-2 items-start"
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

                <h2>{msg.content}</h2>
              </div>
            ))
          : null}
      </div>

      {/* Input section */}
      <div
        className="p-5 border rounded-xl max-w-xl w-full mt-3"
        style={{
          backgroundColor: Colors.BACKGROUND,
        }}
      >
        <div className="flex gap-2">
          <textarea
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
  );
}

export default ChatView;
