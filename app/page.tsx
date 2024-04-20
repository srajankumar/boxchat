"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BoxSelectIcon } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [boxName, setBoxName] = useState("");

  const handleRedirect = () => {
    if (boxName.trim()) {
      window.location.href = `/box/${boxName.trim()}`;
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center min-h-[100dvh]">
      <div className="flex gap-2 flex-col justify-center items-center">
        <div className="flex hover:cursor-pointer group justify-center items-center gap-2">
          <BoxSelectIcon className="w-10 h-10 group-hover:rotate-12 trasnition duration-300" />
          <p className="text-2xl font-semibold">Box Chat</p>
        </div>
        <p className="font-medium text-primary/50">
          Chat Anonymously Inside the Box
        </p>
      </div>
      <div className="w-full md:grid-cols-2 max-w-md grid gap-3 px-5">
        <Link href="/open">
          <Button className="w-full">Join Open Box</Button>
        </Link>
        {/* <Button>Create a Box</Button> */}
        <AlertDialog>
          <AlertDialogTrigger className="bg-primary py-2 text-primary-foreground shadow hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
            Create / Join a Box
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Create / Join an Existing Box</AlertDialogTitle>
            </AlertDialogHeader>
            <form action={handleRedirect}>
              <Input
                type="text"
                value={boxName}
                onChange={(e) => setBoxName(e.target.value)}
                placeholder="Enter box name"
              />
            </form>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleRedirect}>
                Join
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
