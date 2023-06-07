"use client"

import Button from "@/components/Buttonapp";
import { signOut, useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    return (
      <div className="bg-zinc-800 flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full flex flex-col items-center max-w-md space-y-8">
          <div className="flex flex-col items-center gap-8">
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-zinc-200">
              You shouldnt be here, sorry buddy :/
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full flex flex-col items-center max-w-md space-y-8">
        <div className="flex flex-col items-center gap-8">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-zinc-200">
            Hi, {session?.user.name}! You are logged.
          </h2>
        </div>
        <Button
          onClick={() => signOut()}
          className="max-w-small mx-auto w-full mt-6"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}
