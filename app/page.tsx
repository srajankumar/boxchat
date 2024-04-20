import { Button } from "@/components/ui/button";
import { BoxSelectIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center min-h-[100dvh]">
      <div className="flex gap-2 flex-col justify-center items-center">
        <div className="flex hover:cursor-pointer group justify-center items-center gap-2">
          <BoxSelectIcon className="w-10 h-10 group-hover:rotate-12 trasnition duration-300" />
          <p className="text-2xl font-semibold">Box Chat</p>
        </div>
        <p className="font-medium text-primary/50">
          Chat Anonymously Inside the Box
        </p>
      </div>
      <div className="w-full md:grid-cols-2 max-w-md grid gap-3 px-5">
        <Link href="/open">
          <Button className="w-full">Join Open Box</Button>
        </Link>
        <Button>Create a Box</Button>
      </div>
    </div>
  );
}
