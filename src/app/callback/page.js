"use client";
import useTokenCheck from "@/hooks/useTokenCheck";
const CallbackPage = () => {
  useTokenCheck(); // Automatically checks user and redirects

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
};

export default CallbackPage;
