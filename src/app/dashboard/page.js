import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
export default function page() {
    return (
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