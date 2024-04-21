"use client";

import NewNoteBox from "@/components/NewNoteBox";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
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
import { BoxSelectIcon } from "lucide-react";
import React from "react";
import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function Box({ params }: { params: { box: string } }) {
  const [notes, setNotes] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const supabase = createClient();

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase
        .from("box")
        .select("*")
        .order("created_at", { ascending: true });
      setNotes(data);
      setLoading(false);
    };
    getData();

    supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "box",
        },
        (payload) => {
          getData();
        }
      )
      .subscribe();
  }, []);

  async function clearTableData() {
    setIsLoading(true);
    try {
      // Query all rows from the specified table
      const { data, error } = await supabase.from("box").select("id"); // assuming 'id' is the primary key column

      if (error) {
        throw error;
      }

      // Delete each row individually
      for (const row of data) {
        await supabase.from("box").delete().eq("id", row.id); // assuming 'id' is the primary key column
      }

      window.location.href = "/";
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error clearing table data:", error);
    }
  }

  const users = [
    {
      name: "Wave-walker",
      avatar: "/avatars/1.png",
    },
    {
      name: "Hearty",
      avatar: "/avatars/2.png",
    },
    {
      name: "Star-gazer",
      avatar: "/avatars/3.png",
    },
    {
      name: "Iron-singer",
      avatar: "/avatars/4.png",
    },
    {
      name: "Ice-veined",
      avatar: "/avatars/5.png",
    },
    {
      name: "Seafaring",
      avatar: "/avatars/6.png",
    },
    {
      name: "Skerry-rider",
      avatar: "/avatars/7.png",
    },
    {
      name: "Lore-master",
      avatar: "/avatars/8.png",
    },
    { name: "Ember-eyed", avatar: "/avatars/9.png" },
  ];

  return (
    <div className="min-h-[100dvh] pt-20 md:pb-28 pb-24">
      <div>
        <NewNoteBox />
        <div className="fixed py-5 bg-background border-b top-0 justify-center items-center w-full">
          <div className="flex gap-3 justify-between max-w-5xl mx-auto px-5 w-full">
            <Link
              href="/"
              className="flex hover:cursor-pointer group justify-center items-center gap-2"
            >
              <BoxSelectIcon className="w-8 h-8 group-hover:rotate-12 trasnition duration-300" />
              <p className="text-xl font-semibold">Box Chat</p>
            </Link>
            <div className="flex justify-center items-center gap-3">
              <AlertDialog>
                <AlertDialogTrigger className="bg-destructive py-2 px-4 text-primary-foreground shadow hover:bg-destructive/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                  Delete Box {params.box}
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                  </AlertDialogHeader>
                  {`Are you sure you want to delete the Box "${params.box}"? This
                  action cannot be undone.`}
                  <AlertDialogFooter className="flex flex-col">
                    <Button
                      variant={"destructive"}
                      disabled={isLoading}
                      onClick={clearTableData}
                    >
                      {isLoading && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4 animate-spin"
                        >
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                      )}
                      Delete
                    </Button>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Link
                href="https://github.com/srajankumar/boxchat"
                target="_blank"
              >
                <Button className="px-2" variant={"outline"}>
                  <GitHubLogoIcon className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 py-6 max-w-3xl mx-auto px-5 w-full">
        {loading ? (
          <div className="flex flex-col gap-9">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex">
                <Skeleton className="w-10 h-10 mr-2 rounded-full" />
                <div>
                  <Skeleton className="w-40 h-5 mb-2" />
                  <Skeleton className="w-60 h-4" />
                </div>
              </div>
            ))}
          </div>
        ) : notes && notes.length > 0 ? (
          notes.map((note) => {
            const user = users[note.id % users.length];
            const createdAt = new Date(note.created_at).toLocaleString();
            return (
              <div key={note.id} className="flex">
                <Image
                  src={user.avatar}
                  alt="Avatar"
                  width={500}
                  height={500}
                  className="w-10 h-10 mr-2 rounded-full"
                />
                <div>
                  <div className="font-semibold">
                    {user.name}{" "}
                    <span className="text-xs font-normal pt-1 text-primary/75">
                      {createdAt}
                    </span>
                  </div>
                  <div>{note.title}</div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col justify-center items-center gap-1 text-primary/75 pt-40">
            <div className="inline-flex justify-center items-center">
              Oops, your{" "}
              <p className="pl-1 text-primary font-semibold">{params.box}</p>
              <BoxSelectIcon className="w-5 h-5 mx-2 rotate-12 text-primary" />
              seems empty
            </div>
            <div>{"Start chatting something :)"}</div>
          </div>
        )}
      </div>
    </div>
  );
}
