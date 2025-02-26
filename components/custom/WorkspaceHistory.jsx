"use client"; //client side rendering  using-hooks
import { UserDetailContext } from '@/context/UserDetailContext';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react'

function WorkspaceHistory() {
  const {userDetail,setUserDetail} = useContext(UserDetailContext);//get the user details from the context

  const convex=useConvex();//using convex for fetching data from database

  const[workspaceList,setWorkspaceList]=useState();//state to store the list of workspaces

  useEffect(()=>{//get all the workspaces of the user
    userDetail&&GetAllWorkspace();
  },[userDetail]);

  const GetAllWorkspace=async()=>{//function to get all the workspaces of the user
    const result=await convex.query(api.workspace.GetAllWorkspaces,{
      userId:userDetail?._id
    });
    setWorkspaceList(result);
    console.log(result);
  }

  return (
    <div>
      <h2 className='font-medium text-lg'>Your Chats</h2>
      <div>
        {workspaceList&&workspaceList?.map((workspace,index)=>(//display the list of workspaces
          <h2 key={index} className='text-sm text-gray-500 mt-2 font-light hover:text-white'>
            {workspace?.messages[0]?.content}
            </h2>
        ))}
      </div>
    </div>
  )
}

export default WorkspaceHistory
