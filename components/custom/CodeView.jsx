"use client"; //client side rendering

import React, { useState } from "react"; // Add useState import
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer
} from "@codesandbox/sandpack-react";

function CodeView() {
  const [activeTab, setActiveTab] = useState('code'); // Fixed useState hook

  return (
    <div>
      <div className="bg-[#181818] w-full p-2 border">
        <div 
        className="items-center flex flex-wrap shrink-0
         bg-black p-1 w-[140px] gap-3 justify-center rounded-full">
          <h2 
            onClick={() => setActiveTab('code')}
            className={`text-sm cursor-pointer ${activeTab === 'code' ? 'text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full' : ''}`}>
            code
          </h2>
          <h2 
            onClick={() => setActiveTab('preview')}
            className={`text-sm cursor-pointer ${activeTab === 'preview' ? 'text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full' : ''}`}>
            preview
          </h2>
        </div>
      </div>
      <SandpackProvider template="react" theme={"dark"}>
        <SandpackLayout>
          {activeTab=='code' ? <>
          <SandpackFileExplorer style={{height:'80vh'}} />
          <SandpackCodeEditor style={{height:'80vh'}} />
          </>:
          <> 
           <SandpackPreview style={{height:'80vh'}} showNavigator={true} />
           </>}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}

export default CodeView;
