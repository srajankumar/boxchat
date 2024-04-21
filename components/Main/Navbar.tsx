import { BoxSelectIcon } from "lucide-react";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const Navbar = () => {
  return (
    <div className="fixed py-5 bg-background top-0 justify-center items-center w-full z-50">
      <div className="flex gap-3 justify-between max-w-5xl mx-auto px-5 w-full">
        <Link
          href="/"
          className="flex hover:cursor-pointer group justify-center items-center gap-2"
        >
          <BoxSelectIcon className="w-8 h-8 group-hover:rotate-12 trasnition duration-300" />
          <p className="text-xl font-semibold">Box Chat</p>
        </Link>
        <Link href="https://github.com/srajankumar/boxchat" target="_blank">
          <Button className="px-2" variant={"outline"}>
            <GitHubLogoIcon className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
