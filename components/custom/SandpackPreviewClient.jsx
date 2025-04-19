'use client';
import { ActionContext } from '@/context/ActionContext';
import { SandpackPreview, useSandpack } from '@codesandbox/sandpack-react';
import React, { useContext, useEffect, useRef } from 'react';
import { toast } from 'sonner';

function SandpackPreviewClient() {
  const previewRef = useRef();
  const { sandpack } = useSandpack();
  const { action, setAction } = useContext(ActionContext);
  
  useEffect(() => {
    if (action?.actionType === "deploy") {
      handleRunCode();
    } else if (action?.actionType === "export") {
      exportToCodeSandbox();
    }
  }, [action]);

  const handleRunCode = async () => {
    try {
      // Use the sandpack instance to directly control the preview
      if (sandpack) {
        // This triggers the same action as clicking the "Run" button in Sandpack
        sandpack.runSandpack();
        toast.success("Code is running!");
      }
    } catch (error) {
      console.error("Error running code:", error);
      toast.error("Failed to run code");
    }
  };
  
  const exportToCodeSandbox = async () => {
    try {
      const client = previewRef.current?.getClient();
      if (client) {
        const result = await client.getCodeSandboxURL();
        window?.open(result?.editorUrl);
        toast.success("Code exported to CodeSandbox");
      }
    } catch (error) {
      console.error("Error exporting to CodeSandbox:", error);
      toast.error("Failed to export code");
    }
  };

  return (
    <SandpackPreview
      ref={previewRef}
      showNavigator={true}
      style={{ height: '80vh' }}
    />
  );
}

export default SandpackPreviewClient;