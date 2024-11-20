"use client"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import { redirect } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Dashboard() {
    const router = useRouter(); // Initialize router
    const { isAuthenticated, isLoading } = useKindeBrowserClient();

    // Redirect if the user is not authenticated
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/api/auth/login"); // Redirect to the login route
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
        return <>Loading...</>;
    }

    return  (
        <>
            <div className="flex flex-col h-full  mt-1 ">
                <Card className='flex-grow shadow-xl border-s-8'>
                    <CardHeader>
                        <CardTitle>Welcome to the dashboard...</CardTitle>
                    </CardHeader>
                    <CardDescription className='px-4'>Start somewhere you see yourself...😉</CardDescription>
                    <CardContent className='mt-2'>
                        <p>
                            Keep exploring we have more to give you
                        </p>
                    </CardContent>
                </Card>
            </div>
        </>
    ) 
}