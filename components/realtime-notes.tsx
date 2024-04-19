"use client";

import { createClient } from "@/utils/supabase/client";
import Notes from "./notes";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RealtimeTodos({ notes }: { notes: any }) {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notes",
        },
        () => {
          console.log("changes made");
          router.refresh();
        }
      )
      .subscribe();
  }, []);

  return (
    <>
      {/* {notes?.map((todo: any) => (
        <p key={todo.id}>
          <Notes note={notes} />
        </p>
      ))} */}
      <Notes note={notes} />
    </>
  );
}
