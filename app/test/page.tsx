import { createClient } from "@/utils/supabase/server";

export default async function NewTodo() {
  const addTodo = async (formData: FormData) => {
    "use server";
    const title = String(formData.get("title"));
    const supabase = createClient();
    await supabase.from("notes").insert({ title });
  };

  return (
    <form action={addTodo}>
      <input name="title" className="text-black" />
      <button type="submit">Add Todo</button>
    </form>
  );
}
