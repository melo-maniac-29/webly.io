import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Lookup from "@/data/Lookup";
import { Button } from "../ui/button";

function SignInDialog({ openDialog, closeDialog }) {
  return (
    <div>
      <Dialog open={openDialog} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl text-center text-white gap-3">{Lookup.SIGNIN_HEADING}</DialogTitle>
            <DialogDescription>
              <div className="flex flex-col items-center justify-center gap-4">
                <p className="mt-3 text-center">{Lookup.SIGNIN_SUBHEADING}</p>
                <Button className="bg-blue-500 text-white hover:bg-blue-400 mt-3">Sign In With Google</Button>
                <p className="text-xs mt-2">{Lookup.SIGNIn_AGREEMENT_TEXT}</p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SignInDialog;
