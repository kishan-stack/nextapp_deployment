"use client";
import { useState,useEffect } from "react";
import { ChevronDown, ChevronUp, UserPlus2 } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import axios from "axios";
export default function FindMembers() {
    const [showProfile, setShowProfile] = useState(true);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const toggleProfile = () => {
        setShowProfile((prev) => !prev);
    };

    useEffect(() => {
        axios
            .get("http://localhost:5000/get-allusers") // Your API endpoint
            .then((response) => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
                setLoading(false);
            });

            
    }, []);
    return (
        <main className="h-full rounded-lg mt-1 shadow-xl overflow-hidden dark:border-white pb-8 pt-4">
            <header className="px-4">
                <Input placeholder="Search members..." className="w-full md:w-full lg:w-2/3" aria-label="Search members" />
                <SearchBar />
            </header>

            <div className="relative h-full p-3 grid grid-cols-1 gap-4 sm:grid-cols-12">
                {/* Results Section */}
                <section
                    className="results rounded-xl col-span-12 md:col-span-12 lg:col-span-8 p-2 sm:p-4"
                    aria-labelledby="results-heading"
                >
                    <h2 id="results-heading" className="sr-only">Search results</h2>

                    <div className="resultsCard max-h-[600px] overflow-y-auto scroll-hide space-y-4">
                        <p className="text-xl text-black p-4 rounded-b-xl bg-white/30 dark:bg-black dark:text-white backdrop-blur-lg sticky top-0 z-10">
                            Potential members you may like
                        </p>

                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            users.map((user, index) => (
                                <div key={index} className="flex-grow shadow-xl border-s-8 mt-2 w-full p-4 bg-white rounded-lg dark:bg-gray-800">
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
                                        <p>Skills: {user.skills.join(", ")}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>

                {/* Profile Section */}
                <aside
                    className={`profile fixed bottom-0 right-0 lg:static transform transition-transform duration-300 ease-in-out shadow-xl border rounded-xl p-2 w-full max-w-sm bg-white dark:bg-gray-900 col-span-12 lg:col-span-4 ${showProfile ? "translate-y-0 max-h-[700px]" : "translate-y-[0%] max-h-[180px]"
                        } lg:max-h-[700px] lg:translate-y-0`}
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
                                    src="/superman.jpg"
                                    width={500}
                                    height={500}
                                    className="rounded-full w-[40px] h-[40px]"
                                    alt="small card image"
                                />
                            </div>
                            <p className="text-lg font-semibold">Username</p>
                        </div>
                        {showProfile ? <ChevronUp /> : <ChevronDown />}
                    </div>

                    {showProfile && (
                        <div className="content p-4">
                            <div className="description bg-white dark:bg-gray-800 dark:border dark:border-white rounded-lg p-4 mb-4">
                                Irure deserunt velit reprehenderit sit nostrud nostrud aliqua veniam nulla anim amet.
                            </div>

                            <div className="skills flex flex-wrap gap-2">
                                <span className="bg-blue-500 text-white dark:bg-white dark:text-black rounded-lg p-2">Python</span>
                                <span className="bg-blue-500 text-white dark:bg-white dark:text-black rounded-lg p-2">Data Science</span>
                                <span className="bg-blue-500 text-white dark:bg-white dark:text-black rounded-lg p-2">Web Dev</span>
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
            </div>
        </main>
    );
}
