'use client';
import { MessagesContext } from '@/context/MessagesContext';
import { UserDetailContext } from '@/context/UserDetailContext';
import Colors from '@/data/Colors';
import Lookup from '@/data/Lookup';
import { ArrowRight, Link, Sparkles } from 'lucide-react';
import React, { useContext, useState } from 'react';
import SignInDialog from './SignInDialog';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

function Hero() {
  const [userInput, setUserInput] = useState();
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [openDialog, setOpenDialog] = useState(false);
  const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
  const router = useRouter();

  const onGenerate = async (input) => {
    if (!userDetail?.name) {
      setOpenDialog(true);
      return;
    }
    if(userDetail?.token < 10) {
      toast("You don't have enough token to generate code");
      return
    }
    const msg = {
      role: 'user',
      content: input,
    };
    setMessages(msg);

    const workspaceId = await CreateWorkspace({
      user: userDetail._id,
      messages: [msg],
    });
    console.log(workspaceId);
    router.push('/workspace/' + workspaceId);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="flex flex-col items-center mt-36 xl:mt-42 gap-2"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div className="relative" variants={item}>
        <motion.h2 className="font-bold text-5xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          {Lookup.HERO_HEADING}
        </motion.h2>
        <motion.div 
          className="absolute -top-10 -right-10 text-yellow-300 opacity-75"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles size={24} />
        </motion.div>
      </motion.div>
      
      <motion.p 
        className="text-gray-400 font-medium text-center max-w-lg mx-auto mt-4" 
        variants={item}
      >
        {Lookup.HERO_DESC}
      </motion.p>
      
      <motion.div
        className="p-6 border rounded-xl max-w-2xl w-full mt-6 backdrop-blur-sm"
        style={{
          backgroundColor: Colors.BACKGROUND,
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          borderColor: 'rgba(255, 255, 255, 0.1)'
        }}
        variants={item}
      >
        <div className="flex gap-2">
          <textarea
            placeholder={Lookup.INPUT_PLACEHOLDER}
            className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"
            onChange={(event) => setUserInput(event.target.value)}
          />
          {userInput && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowRight
                onClick={() => onGenerate(userInput)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 w-10 h-10 rounded-md cursor-pointer shadow-md"
              />
            </motion.div>
          )}
        </div>
        <div>
          <Link className="h-5 w-5" />
        </div>
      </motion.div>

      <motion.div 
        className="flex mt-8 flex-wrap max-w-2xl items-center justify-center gap-3"
        variants={item}
      >
        {Lookup.SUGGSTIONS.map((suggestion, index) => (
          <motion.h2
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 px-3 border rounded-full text-sm text-gray-400 hover:text-white hover:border-blue-500 cursor-pointer transition-colors"
            key={index}
            onClick={() => onGenerate(suggestion)}
          >
            {suggestion}
          </motion.h2>
        ))}
      </motion.div>

      <SignInDialog
        openDialog={openDialog}
        closeDialog={(v) => setOpenDialog(v)}
      />
    </motion.div>
  );
}

export default Hero;