"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function Notes({ note }: { note: any }) {
  //   const [notes, setNotes] = useState<any[] | null>(null);
  const supabase = createClient();

  //   useEffect(() => {
  //     const getData = async () => {
  //       const { data } = await supabase.from("notes").select();
  //       setNotes(data);
  //     };
  //     getData();
  //   }, []);

  return <pre>{JSON.stringify(note, null, 2)}</pre>;
}
