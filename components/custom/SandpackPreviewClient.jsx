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
      const client = previewRef.current?.getClient();
      if (client) {
        // Refresh the preview to run latest code changes
        client.refresh();
        toast.success("Code is running in preview!");
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