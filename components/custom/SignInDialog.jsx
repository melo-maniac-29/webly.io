

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

function SignInDialog({ openDialog, closeDialog }) {
  const { userDetail, setUserDetail } = useContext(UserDetailContext); // getting userDetail from context

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: "Bearer " + tokenResponse?.access_token } }
      );

      console.log(userInfo);
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
            <DialogTitle ></DialogTitle>
            <DialogDescription>
              <div className="flex flex-col items-center justify-center gap-4">
                <div>
                <p className="font-bold text-2xl text-center text-white gap-3">{Lookup.SIGNIN_HEADING}</p>
                </div>
                <div>
                <p className="mt-3 text-center">{Lookup.SIGNIN_SUBHEADING}</p>
                </div>
                <div>
                <Button className="bg-blue-500 text-white hover:bg-blue-400 mt-3" onClick={googleLogin}>Sign In With Google</Button>
                </div>
                <div>
                <p className="text-xs mt-2">{Lookup.SIGNIn_AGREEMENT_TEXT}</p>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SignInDialog;
