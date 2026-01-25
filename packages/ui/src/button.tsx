"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void,
  className: string;
}
export const Button = ({ className, children, onClick }: ButtonProps) => {
  return (
      <button className={className} onClick={onClick}>
        {children}
      </button>
  );
};
