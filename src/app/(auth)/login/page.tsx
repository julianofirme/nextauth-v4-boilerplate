"use client";

import GoogleSVG from "@/components/GoogleSvgapp";
import LoginButton from "@/components/Buttonapp";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google")
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full flex flex-col items-center max-w-md space-y-8">
        <div className="flex flex-col items-center gap-8">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-zinc-200">
            Sign in to your account
          </h2>
        </div>
        <LoginButton
          onClick={loginWithGoogle}
          className="max-w-small mx-auto w-full mt-6"
          isLoading={isLoading}
        >
          {isLoading ? null : (
            <GoogleSVG />
          )}
          Google
        </LoginButton>
      </div>
    </div>
  );
}
