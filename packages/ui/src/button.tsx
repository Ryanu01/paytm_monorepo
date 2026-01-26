"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => Promise<void> | void;
  disabled?: boolean;
  isLoading?: boolean;
}

export const Button = ({
  children,
  onClick,
  disabled = false,
  isLoading = false,
}: ButtonProps) => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={`
        text-white bg-gray-800
        font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
        focus:outline-none focus:ring-4 focus:ring-gray-300
        transition-all duration-150

        hover:bg-gray-900 cursor-pointer

        disabled:bg-gray-400
        disabled:hover:bg-gray-400
        disabled:cursor-not-allowed
        disabled:opacity-60
      `}
    >
      {isLoading ? "Sending..." : children}
    </button>
  );
};
