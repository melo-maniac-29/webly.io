import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Colors from '@/data/Colors'

function Header() {
  return (
    <div className='p-4 flex justify-between items-center'>
      
      <img src={'/logo.png'} alt="logo" width={70} height={70} />
        <div className='flex gap-5'>
            <Button variant="ghost">Sign in</Button>
            <Button className="text-white" style={{
                backgroundColor:Colors.BLUE
            }}>Get started</Button>
        </div>

    </div>
  )
}

export default Header
