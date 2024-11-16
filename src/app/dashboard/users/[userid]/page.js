import Link from "next/link"
import { ChevronLeft } from "lucide-react"
async function User({params}){
    const { userid } = await params
    return (
        <>
            <div className="w-full h-full border-s-8 rounded-xl shadow-xl p-4">
                <Link href='/dashboard/find-members'><ChevronLeft></ChevronLeft></Link>
                <div className="items-center justify-center p-4">
                    Users : {userid}

                </div>
            </div>
        </>
    )
}

export default User