import React from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

function CodeView() {
  return (
    <div>
      <SandpackProvider template="react">
        <SandpackLayout>
          <SandpackCodeEditor />
          <SandpackPreview />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}

export default CodeView;
