"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import axios from "axios";

const CallbackHandler = () => {
  const {getToken}=useKindeAuth()
  
  const router = useRouter();
  useEffect(() => {
    const handleCallback = async () => {
      try {
        const token = await getToken()
        console.log(token);
        const { data } = await axios.post(
          "http://localhost:5000/auth/check-user", // Use http for local development
          { token },
          {
            headers: {
              "Content-Type": "application/json",
            },
            timeout: 5000, // Timeout after 5 seconds
          }
        );
        console.log("User exists:", data.userExists);
        if (data.userExists) {
          router.push("/dashboard"); // Redirect existing users to the dashboard
        } else {
          router.push("/save-info"); // Redirect new users to save-info page
        }
      } catch (error) {
        console.log(error);
      }
    };

    handleCallback();
  }, [getToken, router]);

  return <></>; // No UI needed
};

export default CallbackHandler;
