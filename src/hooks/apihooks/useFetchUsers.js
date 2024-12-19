import { useEffect, useState } from "react";
import axios from "axios";

/**
 * Custom hook to fetch users data.
 *
 * @param {string} email - The email of the currently logged-in user.
 * @returns {Object} An object containing users, loading state, and error.
 */
export default function useFetchUsers(email) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchUsers = async () => {
      if (!email) return;

      setLoading(true);
      setError(null); // Reset error state

      try {
        const response = await axios.get("http://localhost:5000/get-allusers", {
          params: { email },
        });
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [email]);

  return { users, loading, error };
}
