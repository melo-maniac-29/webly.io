//added workspace under that [id] for making it dynamic

import ChatView from '@/components/custom/ChatView'
import CodeView from '@/components/custom/CodeView'
import { Code } from 'lucide-react'
import React from 'react'

function Workspace() {
  return (
    <div className='p-10'>
        <div className='grid grid-cols-1 md:grid-cols-3'>

          <ChatView />

          <div className='col-span-2'>

          <CodeView />

          </div>

        </div>
    </div>
  )
}

export default Workspace
