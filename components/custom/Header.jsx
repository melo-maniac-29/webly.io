'use client';
import Image from 'next/image';
import React, { useContext } from 'react';
import { Button } from '../ui/button';
import Colors from '@/data/Colors';
import { UserDetailContext } from '@/context/UserDetailContext';
import Link from 'next/link';
import { Download, Rocket } from 'lucide-react';
import { useSidebar } from '../ui/sidebar';
import { usePathname } from 'next/navigation';
import { ActionContext } from '@/context/ActionContext';
import { motion } from 'framer-motion';

function Header() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { action, setAction } = useContext(ActionContext);
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  
  const onActionBtn = (actn) => {
    setAction({
      actionType: actn,
      timeStamp: Date.now()
    })
  }
  
  return (
    <motion.div 
      className="p-4 flex justify-between items-center border-b backdrop-blur-sm bg-background/80 sticky top-0 z-40"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Link href={'/'}>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Image src={'/logo.png'} alt="logo" width={40} height={40} className="drop-shadow-md" />
        </motion.div>
      </Link>
      {!userDetail?.name ? (
        <div className="flex gap-5">
          <Button variant="ghost">Sign In</Button>
          <Button
            variant="gradient"
            className="text-white"
          >
            Get Started
          </Button>
        </div>
      ) : (
        <div className="flex gap-5 items-center">
          {pathname.includes('/workspace/') && (
            <motion.div 
              className="flex gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button variant="outline" onClick={() => onActionBtn('export')}>
                <Download /> Export
              </Button>
              <Button
                onClick={() => onActionBtn('deploy')}
                variant="gradient"
                className="text-white"
              >
                <Rocket /> Deploy
              </Button>
            </motion.div>
          )}
          {userDetail && (
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Image
                onClick={toggleSidebar}
                src={userDetail?.picture}
                alt="userImage"
                width={40}
                height={40}
                className="rounded-full cursor-pointer object-cover border-2 border-blue-500 shadow-md"
              />
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default Header;