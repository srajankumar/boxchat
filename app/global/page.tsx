"use client";

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

  return (
    <div>
      <div>
        <NewNote />
      </div>
      <div>{JSON.stringify(notes, null, 2)}</div>
    </div>
  );
}
