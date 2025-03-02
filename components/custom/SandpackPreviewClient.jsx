import { SandpackPreview, useSandpack } from '@codesandbox/sandpack-react'
import React, { useEffect, useRef } from 'react'

function SandpackPreviewClient() {
    const previewRef = useRef();
    const { sandpack } = useSandpack();

    useEffect(() => {
        GetSandpackClient();
    }, [sandpack])

    const GetSandpackClient =async () => {
        const client = previewRef.current?.getClient();
        if(client) {
            console.log(client);
            const result=await client.getCodeSandboxURL();
            console.log(result);
        }
    }

  return (
    <div style={{ width: "100%", height: "80vh" }}>
      <SandpackPreview
        ref={previewRef}
        style={{ height: "100%", width: "100%" }}
        showNavigator={true}
      />
    </div>
  )
}

export default SandpackPreviewClient