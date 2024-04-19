"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function Page() {
  const [notes, setNotes] = useState<any[] | null>(null);
  const supabase = createClient();

  const handleInserts = () => {
    console.log("Change received!");
  };

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
          //   handleInserts();
          getData();
        }
      )
      .subscribe();
  }, []);

  return <pre>{JSON.stringify(notes, null, 2)}</pre>;
}

// "use client";

// import RealtimeTodos from "@/components/realtime-notes";
// import { createClient } from "@/utils/supabase/client";
// import { useEffect, useState } from "react";
// // import { useRouter } from "next/navigation";

// export default function Page() {
//   const [notes, setNotes] = useState<any[] | null>(null);
//   const supabase = createClient();
//   //   const router = useRouter();

//   //   const handleInserts = () => {
//   //     // router.refresh();
//   //     window.location.reload();
//   //     console.log("Change received!");
//   //   };

//   useEffect(() => {
//     const getData = async () => {
//       const { data } = await supabase.from("notes").select();
//       setNotes(data);
//     };
//     getData();

//     // supabase
//     //   .channel("table-db-changes")
//     //   .on(
//     //     "postgres_changes",
//     //     {
//     //       event: "INSERT",
//     //       schema: "public",
//     //       table: "notes",
//     //     },
//     //     (payload) => {
//     //       handleInserts();
//     //     }
//     //   )
//     //   .subscribe();
//   }, []);

//   return <RealtimeTodos notes={notes} />;
// }
