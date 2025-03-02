"use client"; //client side rendering
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Colors from "@/data/Colors";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useContext } from "react";
import { useSidebar } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import { Link, LucideDownload, Rocket } from "lucide-react";
import { ActionContext } from "@/context/ActionContext";

function Header() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { toggleSidebar } = useSidebar();
  const { action, setAction } = useContext(ActionContext);
  const path = usePathname();
  console.log(path?.includes("workspace"));

  const onActionBtn = (action) => {
    setAction({
      actionType:action,
      timeStamp:Date.now()
    })
  };

  return (
    <div className="p-4 flex justify-between items-center border-b">
      <Link href="/">
        <img src={"/logo.png"} alt="logo" width={40} height={40} />
      </Link>
      {!userDetail?.name ? (
        <div className="flex gap-5">
          <Button variant="ghost">Sign in</Button>
          <Button
            className="text-white"
            style={{ backgroundColor: Colors.BLUE }}
          >
            Get started
          </Button>
        </div>
      ) : (
        path?.includes("workspace") && (
          <div className="flex gap-2 items-center">
            <Button variant="ghost" onClick={()=>onActionBtn('export')}>
              <LucideDownload />
              export
            </Button>
            <Button className="bg-blue-500 text-white hover:bg-blue-600"
            onClick={()=>onActionBtn('deploy')}
            >
              <Rocket />
              Deploy
            </Button>
            {userDetail && (
              <Image
                src={userDetail?.picture}
                alt="user"
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
                onClick={toggleSidebar}
              />
            )}
          </div>
        )
      )}
    </div>
  );
}

export default Header;
