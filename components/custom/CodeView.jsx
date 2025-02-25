"use client"; //client side rendering

import React from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer
} from "@codesandbox/sandpack-react";

function CodeView() {
  return (
    <div>
      <div>
        <div>
          <h2>code</h2>
          <h2>preview</h2>
        </div>
      </div>
      <SandpackProvider template="react" theme={"dark"}>
        <SandpackLayout>
          <SandpackFileExplorer  style={{height:'80vh'}} />
          <SandpackCodeEditor  style={{height:'80vh'}} />
          <SandpackPreview style={{height:'80vh'}} />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}

export default CodeView;
