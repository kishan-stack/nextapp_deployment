async function Team({ params }) {
    const { teamid } = await params
    return (
        <>

            <div>
                {teamid}
            </div>
        </>
    )
}

export default Team;