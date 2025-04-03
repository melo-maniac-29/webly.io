import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import Lookup from "@/data/Lookup";
import { Button } from "../ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useContext } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import uuid4 from "uuid4";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

function SignInDialog({ openDialog, closeDialog }) {
  const { userDetail, setUserDetail } = useContext(UserDetailContext); // getting userDetail from context
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [signInComplete, setSignInComplete] = useState(false);

  const CreateUser = useMutation(api.users.CreateUser); // mutation for creating user

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setIsSigningIn(true);
        console.log(tokenResponse);
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          { headers: { Authorization: "Bearer " + tokenResponse?.access_token } }
        );

        console.log(userInfo);
        const user = userInfo?.data; // backend data saving

        await CreateUser({   // calling mutation for creating user in backend 
          name: user?.name,
          email: user?.email,
          picture: user?.picture,
          uid: uuid4()   // generating random uid for users  uuid4 external function 
        });

        if (typeof window !== undefined) {  // extra security for while reloading data won't be lost
          localStorage.setItem('user', JSON.stringify(user));
        }

        setUserDetail(userInfo?.data); // setting userDetail in context
        setSignInComplete(true);
        
        // Show success message briefly before refreshing
        setTimeout(() => {
          closeDialog(false);
          // Refresh the page to ensure all components pick up the new user state
          window.location.reload();
        }, 1500);
      } catch (error) {
        console.error("Error during sign in:", error);
        setIsSigningIn(false);
      }
    },
    onError: (errorResponse) => {
      console.log(errorResponse);
      setIsSigningIn(false);
    },
  });

  return (
    <div>
      <Dialog open={openDialog} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <div className="flex flex-col items-center justify-center gap-4">
                {signInComplete ? (
                  <>
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-green-500/20 rounded-full p-3 mb-2"
                    >
                      <Check className="w-6 h-6 text-green-500" />
                    </motion.div>
                    <h2 className="font-bold text-2xl text-center text-white">Sign In Successful!</h2>
                    <p className="text-center text-gray-400">Loading your dashboard...</p>
                  </>
                ) : (
                  <>
                    <h2 className="font-bold text-2xl text-center text-white gap-3">{Lookup.SIGNIN_HEADING}</h2>
                    <p className="mt-3 text-center">{Lookup.SIGNIN_SUBHEADING}</p>
                    <Button 
                      className="bg-blue-500 text-white hover:bg-blue-400 mt-3 flex items-center gap-2" 
                      onClick={googleLogin}
                      disabled={isSigningIn}
                    >
                      {isSigningIn ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Signing In...</span>
                        </>
                      ) : (
                        <span>Sign In With Google</span>
                      )}
                    </Button>
                    <p className="text-xs mt-2">{Lookup.SIGNIn_AGREEMENT_TEXT}</p>
                  </>
                )}
              </div>
            </DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SignInDialog;
