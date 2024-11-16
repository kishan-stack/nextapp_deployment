async function page({ params }) {
    const { memberid } = await params
    return (
        <>
            <div>
                {memberid}
            </div>
        </>
    )
}

export default page