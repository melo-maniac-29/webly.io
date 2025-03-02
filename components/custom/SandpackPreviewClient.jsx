import { ActionContext } from '@/context/ActionContext';
import { SandpackPreview, useSandpack } from '@codesandbox/sandpack-react'
import React, { useContext, useEffect, useRef } from 'react'

function SandpackPreviewClient() {
    const previewRef = useRef();
    const { sandpack } = useSandpack();
    const {action,setAction}=useContext(ActionContext);

    useEffect(() => {
        GetSandpackClient();
    },[sandpack&&action])

    const GetSandpackClient = async () => {
        const client = previewRef.current?.getClient();
        if(client) 
        {
            console.log(client);
            const result = await client.getCodeSandboxURL();
            console.log(result);
            if(action?.actionType=='deploy'){
                window?.open('https://'+result?.sandboxId+'.csb.app/')
            }
            else if(action?.actionType=='export') {
                window?.open(result?.editorUrl)
            }
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