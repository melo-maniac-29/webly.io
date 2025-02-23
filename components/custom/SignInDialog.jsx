

import React from "react";
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



function SignInDialog({ openDialog, closeDialog }) {
  const { userDetail, setUserDetail } = useContext(UserDetailContext); // getting userDetail from context

  const CreateUser=useMutation(api.user.CreateUser); //mutation for creating user


  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: "Bearer " + tokenResponse?.access_token } }
      );

      console.log(userInfo);
      const user=userInfo?.data; //backend data saving

      await CreateUser({   //calling mutation for creating user in backend 
        name:user?.name,
        email:user?.email,
        picture:user?.picture,
        uid:uuid4()   //generating random uid for users  uuid4 external function 
      });

      if(typeof window!==undefined){  //extra secuirty for while reloading data wont be lost
        localStorage.setItem('user',JSON.stringify(user))
      }

      setUserDetail(userInfo?.data); // setting userDetail in context
      
      closeDialog(false);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <div>
      <Dialog open={openDialog} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle >
            
              <div className="flex flex-col items-center justify-center gap-4">
                
                <h2 className="font-bold text-2xl text-center text-white gap-3">{Lookup.SIGNIN_HEADING}</h2>
                
                <p className="mt-3 text-center">{Lookup.SIGNIN_SUBHEADING}</p>
                
                <Button className="bg-blue-500 text-white hover:bg-blue-400 mt-3" onClick={googleLogin}>Sign In With Google</Button>
                
                <p className="text-xs mt-2">{Lookup.SIGNIn_AGREEMENT_TEXT}</p>
                
              </div>
              </DialogTitle>
              <DialogDescription>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SignInDialog;
