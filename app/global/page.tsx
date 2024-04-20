"use client";

import Navbar from "@/components/Navbar";
import NewNote from "@/components/NewNote";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function Page() {
  const [notes, setNotes] = useState<any[] | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("notes").select();
      setNotes(data);
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
      name: "Olaug the Wave-walker",
      avatar: "/avatars/1.png",
    },
    {
      name: "Knut the Hearty",
      avatar: "/avatars/2.png",
    },
    {
      name: "Athelstan the Star-gazer",
      avatar: "/avatars/3.png",
    },
    {
      name: "Asva the Iron-singer",
      avatar: "/avatars/4.png",
    },
    {
      name: "Jarl the Ice-veined",
      avatar: "/avatars/5.png",
    },
    {
      name: "Ivarr the Seafaring",
      avatar: "/avatars/6.png",
    },
    {
      name: "Haldor the Skerry-rider",
      avatar: "/avatars/7.png",
    },
    {
      name: "Ingolfr the Lore-master",
      avatar: "/avatars/8.png",
    },
    { name: "Einar the Ember-eyed", avatar: "/avatars/9.png" },
  ];

  return (
    <div className="min-h-[100dvh] pt-24 pb-32">
      <div>
        <NewNote />
        <Navbar />
      </div>
      <div className="flex flex-col gap-3 max-w-3xl mx-auto px-5 w-full">
        {notes &&
          notes
            .slice()
            .reverse()
            .map((note, index) => {
              const user = users[note.id % users.length]; // Rotate through the predefined users
              return (
                <div key={note.id} className="py-5 flex">
                  <img
                    src={user.avatar}
                    alt="Avatar"
                    className="w-10 h-10 mr-2 rounded-full"
                  />
                  <div>
                    <div className="font-semibold">{user.name}</div>
                    <div>{note.title}</div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}
