"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { BoxSelectIcon } from "lucide-react";
import React from "react";
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

const Home = () => {
  const [boxName, setBoxName] = useState("");

  const handleRedirect = () => {
    if (boxName.trim()) {
      window.location.href = `/box/${boxName.trim()}`;
    }
  };
  return (
    <div className="flex justify-center items-center min-h-[100dvh] w-full">
      <Navbar />
      <div className="grid md:grid-cols-2 max-w-3xl px-5 w-full">
        <div className="flex flex-col justify-center">
          <h1 className="text-5xl pb-1 font-semibold">Box Chat</h1>
          <p className="text-lg tracking-wide text-primary/75">
            Chat Anonymously Inside the Box
          </p>
          <div className="mt-3 flex gap-3">
            <Link href="/open">
              <Button className="w-full">Join Open Box</Button>
            </Link>
            <AlertDialog>
              <AlertDialogTrigger className="bg-primary px-4 py-2 text-primary-foreground shadow hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                Create / Join a Box
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Create / Join an Existing Box
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <form action={handleRedirect}>
                  <Input
                    type="text"
                    value={boxName}
                    onChange={(e) => setBoxName(e.target.value)}
                    placeholder="Enter box name"
                  />
                </form>
                <AlertDialogFooter className="flex flex-col">
                  <AlertDialogAction onClick={handleRedirect}>
                    Join
                  </AlertDialogAction>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <div className="md:flex hidden justify-center items-center">
          <BoxSelectIcon className="w-40 h-40 hover:rotate-12 hover:cursor-pointer trasnition duration-300" />
        </div>
      </div>
    </div>
  );
};

export default Home;
