"use client";
import { MessagesContext } from '@/context/MessagesContext';
import { UserDetailContext } from '@/context/UserDetailContext';
import { api } from '@/convex/_generated/api';
import Colors from '@/data/Colors';
import { useConvex } from 'convex/react';
import { useParams } from 'next/navigation'
import React, { use, useContext, useEffect, useState } from 'react'
import Image from 'next/image';

function ChatView() {  //used to fetch workspace data by workspacw id

  const {id}=useParams();  //useParams is used to get the dynamic id from the url

  const convex=useConvex();  //useConvex is used to get the convex object

  const { messages, setMessages } = useContext(MessagesContext); //getting messages from the context

  const {userDetail,setUserDetail}=useContext(UserDetailContext);  //getting user details from the context

  useEffect(() => {  //useEffect is used to run the function when the component is mounted
    id && GetWorkspaceData();  //function to get the workspace data
  }, [id])

  const GetWorkspaceData=async()=>{  //function to get the workspace data
    //fetch the workspace data from the server using the id
    const result=await convex.query(api.workspace.GetWorkspace,
      {
        workspaceId:id
      }
    );
    setMessages(result.messages);  //set the messages in the context

    console.log(result);
  }

  return (
    <div>
          <div>
            {messages?.map((msg,index)=>(  //mapping the messages   img displaying the user image
              <div key={index} 
              className='p-3 rounded-lg mb-2 flex gap-2 items-start'
              style={{
                backgroundColor:Colors.CHAT_BACKGROUND
              }}>

                {msg?.role=='user' && 
                <Image src={ userDetail?.picture}  alt='userImage'
                width={35} height={35} className='rounded-full'  /> }  

                <h2>{msg.content}</h2>    

              </div>
            ))}
          </div>
          {/* Input section */}
    </div>
  )
}

export default ChatView
