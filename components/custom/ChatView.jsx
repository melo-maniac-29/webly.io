"use client";
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { useParams } from 'next/navigation'
import React, { use, useEffect } from 'react'

function ChatView() {  //used to fetch workspace data by workspacw id

  const {id}=useParams();  //useParams is used to get the dynamic id from the url

  const convex=useConvex();  //useConvex is used to get the convex object

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
    console.log(result);
  }

  return (
    <div>
      ChatView
    </div>
  )
}

export default ChatView
