"use client";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, ChevronUpCircle, UserPlus2 } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import axios from "axios";
import { useKindeAuth, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@/components/ui/button";
export default function FindMembers() {
  const { idToken } = useKindeAuth();
  const [email, setEmail] = useState(null); // Store email
  const [recommendations, setRecommendations] = useState([]); // Store API data
  const [showProfile, setShowProfile] = useState(true);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  // Monitor idToken for email
  useEffect(() => {
    if (idToken?.email) {
      setEmail(idToken.email); // Set email from idToken
    }
  }, [idToken]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (email) {
        try {
          setLoading(true); // Start loading
          const response = await axios.get("http://localhost:5000/recommendations", {
            params: { email },
          });

          setRecommendations(response.data);
        } catch (error) {
          console.error("Error fetching recommendations:", error);
        } finally {
          setLoading(false); // End loading
        }
      }
    };

    fetchRecommendations();
  }, [email]);


  const toggleProfile = () => {
    setShowProfile((prev) => !prev);
  };
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setShowProfile(true); // Ensure profile is shown when a user is selected
  };

  useEffect(() => {
    if (email) {


      axios
        .get("http://localhost:5000/get-allusers", {
          params: { email },
        }) // Your API endpoint
        .then((response) => {
          setUsers(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          setLoading(false);
        });

    }


  }, [email]);

  return (
    <main className="h-full rounded-lg mt-1 shadow-xl overflow-hidden dark:border-white pb-8 pt-4">
      <header className="px-4">
        <Input placeholder="Search members..." className="w-full md:w-full lg:w-2/3" aria-label="Search members" />
        <SearchBar />
      </header>

      <div className="relative h-full p-3 grid grid-cols-1 gap-4 sm:grid-cols-12">
        <section
          className="results rounded-xl col-span-12 md:col-span-12 lg:col-span-8 p-2 scroll-hide overflow-y-auto sm:p-4"
          aria-labelledby="results-heading"
        >
          <h2 id="results-heading" className="sr-only">Search results</h2>
          <div className="resultsCard max-h-[600px] overflow-y-auto scroll-hide space-y-4">
            <p className="text-xl text-black p-4 rounded-b-xl bg-white/30 dark:bg-black dark:text-white backdrop-blur-lg sticky top-0 z-10">
              Recommendations for u
            </p>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                {recommendations.length > 0 ? (recommendations.map((recommendation, index) => (

                  <button onClick={() => handleUserSelect(recommendation)} key={index} className="flex-grow shadow-xl border-s-8 mt-2 w-full p-4 bg-white rounded-lg dark:bg-gray-800">
                    <div className="flex items-center gap-4">
                      <Image
                        src="/superman.jpg" // You can use a dynamic image here if available
                        width={500}
                        height={500}
                        className="rounded-full w-[50px] h-[50px]"
                        alt="pfp"
                      />
                      <div >
                        <Link href='/'>{recommendation.user.firstName} {recommendation.user.lastName}</Link >
                        <p>{recommendation.user.email}</p>
                      </div>
                    </div>
                    <div className="px-4 mt-2">
                      <p>Shared Skills with user are : <span className="font-bold font-mono"> {recommendation.sharedSkills.join(", ")}</span></p>
                    </div>
                  </button>
                ))) : (<p>NO recommendations in db</p>)}
              </>
            )}
          </div>
          <div className="resultsCard max-h-[600px] overflow-y-auto scroll-hide space-y-4">
            <p className="text-xl text-black p-4 rounded-b-xl bg-white/30 dark:bg-black dark:text-white backdrop-blur-lg sticky top-0 ">
              Checkout other members
            </p>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                {users.length > 0 ? (users.map((user, index) => (
                  <button onClick={() => handleUserSelect(user)} key={index} className="flex-grow shadow-xl border-s-8 mt-2 w-full p-4 bg-white rounded-lg dark:bg-gray-800">
                    <div className="flex items-center gap-4">
                      <Image
                        src="/superman.jpg" // You can use a dynamic image here if available
                        width={500}
                        height={500}
                        className="rounded-full w-[50px] h-[50px]"
                        alt="pfp"
                      />
                      <Link href={`/dashboard/users/${index}`}>
                        <p>{user.firstName} {user.lastName}</p>
                        <p>{user.email}</p>
                      </Link>
                    </div>
                    <div className="px-4 mt-2">
                      <p>Skills: <span className="font-bold font-mono">{user.skills.join(", ")}</span> </p>
                    </div>
                  </button>
                ))) : (<p>NO users in db</p>)}
              </>
            )}
          </div>
        </section>

        {/* Profile Section */}
        {selectedUser && (
          <aside
            className={`profile fixed bottom-0  right-0 lg:static transform transition-all duration-300 ease-in-out shadow-xl border rounded-xl p-2 w-full max-w-sm bg-white dark:bg-gray-900 col-span-12 lg:col-span-4 overflow-hidden 
              ${showProfile ? "translate-y-0" : "translate-y-[0%]"}  ${showProfile ? "lg:translate-y-0" : "lg:translate-y-[75%]"}`}
            aria-labelledby="profile-heading"
          >
            <h2 id="profile-heading" className="sr-only">Profile Information</h2>

            <div
              onClick={toggleProfile}
              className="head flex items-center justify-between cursor-pointer p-4 bg-gray-100 dark:bg-gray-800 rounded-t-lg"
            >
              <div className="flex gap-4 items-center">
                <div className="p-1 rounded-full border">
                  <Image
                    src={selectedUser.profilePicture || "/superman.jpg"}
                    width={40}
                    height={40}
                    className="rounded-full"
                    alt="small card image"
                  />
                </div>
                <p className="text-lg font-semibold " >
                  {selectedUser?.user ? selectedUser.user.firstName : selectedUser?.firstName || "No name selected"}<span className="ml-2">
                    {selectedUser?.user ? selectedUser.user.lastName : selectedUser?.lastName || "No lastname selected"}</span>
                </p>
              </div>
              {showProfile ? <ChevronDown /> : <ChevronUp />}
            </div>

            {showProfile && (
              <div className="content p-4">
                <div className="description bg-white dark:bg-gray-800 dark:border dark:border-white rounded-lg p-4 mb-4">
                  {selectedUser.description || "No description available."}
                </div>

                <div className="skills flex flex-wrap gap-2">
                  {selectedUser.skills && selectedUser.skills.length > 0 ? (
                    <>
                      <p className="font-semibold">Skills possessed by user</p>
                      {selectedUser.skills.map((skill, index) => (
                        <span key={index} className="bg-blue-500 text-white dark:bg-white dark:text-black rounded-lg p-2">
                          {skill}
                        </span>
                      ))}
                    </>
                  ) : selectedUser.sharedSkills && selectedUser.sharedSkills.length > 0 ? (
                    <>
                      <p className="font-semibold">Shared skills with user</p>
                      {selectedUser.sharedSkills.map((skill, index) => (
                        <span key={index} className="bg-blue-500 text-white dark:bg-white dark:text-black rounded-lg p-2">
                          {skill}
                        </span>
                      ))}
                    </>
                  ) : (
                    <p>No skills available</p> // Fallback message when neither skills nor sharedSkills is present
                  )}
                </div>



                <div className="connect mt-4 flex gap-4">
                  <button className="bg-blue-500 text-white rounded-lg p-2">Lets talk...</button>
                  <button className="bg-gray-200 p-2 rounded-lg">
                    <UserPlus2 className="text-gray-600" />
                  </button>
                </div>
              </div>
            )}
          </aside>
        )}



      </div>
    </main>

  );
}
