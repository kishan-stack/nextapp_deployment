"use client"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import { CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { toast } from "react-toastify"
export default function BuildTeam() {
    const [userDescriptionOfTeam, setUserDescriptionOfTeam] = useState('')
    const [loading, setLoading] = useState(false);
    const [recommendations, setRecommendations] = useState([])


    const handleDescriptionChange = async () => {
        setLoading(true)
        try {
            toast.info("Please wait while we find potential users for your team")
            const response = await axios.post("http://localhost:5000/getPotentialUsers", { userDescriptionOfTeam })
            setRecommendations(response.data.data)
            // console.log(response.data);
        } catch (error) {
            console.error("error :: ", error);
            toast.error("An error occured while getting recommendations")

        }
        finally {
            setLoading(false)
        }
    }
    return (
        <>
            <div className="flex flex-col h-full mt-1">
                <Card className='flex-grow shadow-xl border-s-8'>
                    <CardHeader>
                        <h2 className="text-2xl font-bold text-gray-900">Build a Team</h2>
                    </CardHeader>
                    <CardDescription className='px-4'>
                        You can build your personalised team here ...
                    </CardDescription>
                    <CardContent className='mt-5'>
                        {/* <Input className="w-full lg:w-2/3 md:w-2/3 bg-gray-100 p-4  overflow-x-auto whitespace-nowrap" value={userDescriptionOfTeam} onChange={(e)=>setUserDescriptionOfTeam(e.target.value)}   placeholder="Input your idea of how your team members should be and what skills your team members should have..."/> */}
                        <div className="flex  w-full gap-4 items-center">
                            <Textarea className='w-full md:w-2/3 lg:w-2/3 scroll-hide' value={userDescriptionOfTeam} placeholder="describe here what skills you want your team members to have..." onChange={(e) => setUserDescriptionOfTeam(e.target.value)} />
                            <Button className="p-7" onClick={handleDescriptionChange} >Build A team</Button>
                        </div>
                        <div className=" mt-8 resultsOfPotentialUsers max-h-[400px] overflow-y-auto scroll-hide">
                            {loading ? (
                                <div className=" loadig flex justify-center items-center h-screen">
                                    loading
                                </div>
                            ) : recommendations.length > 0 ? (
                                <div className="resultsDiv ">
                                    {recommendations.map((rec, index) => (
                                        <Card key={index} className='shadow-md border mb-4  '>
                                            <CardHeader>
                                                <h3 className="font-bold text-lg text-gray-800">
                                                    {rec.user.firstName ? `${rec.user.firstName} ${rec.user.lastName}` : "Anonymous user"}
                                                </h3>
                                                <p className="text-sm text-gray-500 ">{rec.user.email}</p>
                                            </CardHeader>
                                            <CardContent>
                                                <p>
                                                <span className="font-semibold"> Matching Skills : </span>{" "}
                                                {rec.matchingSkills}
                                                </p>
                                                <p>
                                                <span className="font-semibold"> Matched Skills : </span>{" "}
                                                {rec.matchedSkills.join(", ")}
                                                </p>
                                                <p>
                                                <span className="font-semibold"> Total Score Of Profile  : </span>{" "}
                                                {typeof rec.totalScore==='number' ? rec.totalScore.toFixed(2):"NA"}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                !loading && <p className="text-gray-500">No recommendation yet</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}