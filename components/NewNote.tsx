"use client";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send } from "lucide-react";

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
    <div className="fixed border-t bg-background bottom-0 pb-10 pt-10 left-0 right-0">
      <form
        onSubmit={handleSubmit}
        className="flex gap-3 max-w-3xl mx-auto px-5 w-full"
      >
        <Input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-grow h-10 text-base"
        />
        <Button type="submit" className="h-10">
          <Send className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </form>
    </div>
  );
}

export const dynamic = "force-dynamic";
