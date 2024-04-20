"use client";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";

export default function NewNotes() {
  const [title, setTitle] = useState("");

  const addTodo = async () => {
    const supabase = createClient();
    await supabase.from("notes").insert({ title: title });
    setTitle("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await addTodo();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-black"
      />
      <button type="submit">Add</button>
    </form>
  );
}

export const dynamic = "force-dynamic";
