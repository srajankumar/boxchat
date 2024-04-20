"use client";

import Navbar from "@/components/Navbar";
import NewNote from "@/components/NewNote";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  const [notes, setNotes] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase
        .from("notes")
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
          table: "notes",
        },
        (payload) => {
          getData();
        }
      )
      .subscribe();
  }, []);

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
    <div className="min-h-[100dvh] pt-20 md:pb-28">
      <div>
        <NewNote />
        <Navbar />
      </div>
      <div className="flex flex-col gap-2 max-w-3xl mx-auto px-5 w-full">
        {loading ? (
          <div>
            {[...Array(6)].map((_, index) => (
              <div key={index} className="py-5 flex">
                <Skeleton className="w-10 h-10 mr-2 rounded-full" />
                <div>
                  <Skeleton className="w-40 h-5 mb-2" />

                  <Skeleton className="w-60 h-4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          notes &&
          notes.map((note) => {
            const user = users[note.id % users.length];
            const createdAt = new Date(note.created_at).toLocaleString();
            return (
              <div key={note.id} className="py-5 flex">
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
        )}
      </div>
    </div>
  );
}
