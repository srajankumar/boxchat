import { BoxSelectIcon } from "lucide-react";
import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="fixed py-5 bg-background border-b top-0 justify-center items-center w-full">
      <div className="flex gap-3 max-w-3xl mx-auto px-5 w-full">
        <Link
          href="/"
          className="flex hover:cursor-pointer group justify-center items-center gap-2"
        >
          <BoxSelectIcon className="w-8 h-8 group-hover:rotate-12 trasnition duration-300" />
          <p className="text-xl font-semibold">Box Chat</p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
