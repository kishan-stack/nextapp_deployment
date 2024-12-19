// hooks/useUser.ts

import { useEffect, useState } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
export const useUser = () => {
  const { user, isLoading, isAuthenticated, login, logout } = useKindeAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      // Map the Kinde user object to the info you want
      setUserInfo({
        username: user?.preferred_username,
        firstName: user?.given_name,
        lastName: user?.family_name,
        email: user?.email,
      });
    } else {
      setUserInfo(null);
    }
  }, [isAuthenticated, user]);

  return {
    userInfo,
    isLoading,
    isAuthenticated,
    login,
    logout,
  };
};
