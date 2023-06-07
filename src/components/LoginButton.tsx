"use client";

import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, FunctionComponent, ReactNode } from "react";

interface LoginButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  children: ReactNode;
}

const LoginButton: FunctionComponent<LoginButtonProps> = ({
  isLoading,
  children,
  ...props
}) => {
  return (
    <button {...props} className="bg-slate-900 min-w-[110px] text-white hover:bg-slate-800 h-10 py-2 px-4 active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-color focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none">
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {children}
    </button>
  );
};

export default LoginButton;
