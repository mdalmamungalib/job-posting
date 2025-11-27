import { useState } from "react";

export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  return {
    isLoading,
    error,
    setError,
  };
};
