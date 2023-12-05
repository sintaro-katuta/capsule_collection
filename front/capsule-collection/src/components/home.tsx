import RecentCapsule from "./recent_capsule"
import Stamp from "./stamp"
import Add_Input from "./add_input"
import { useState } from "react"

export default function Home(props: any) {
    const [page, setPage] = useState(false)
    return (
        <>
            {page
                ?
                <>
                    <Add_Input capsule={props.capsule} />
                </>
                :
                <>
                    <RecentCapsule capsule={props.capsule} />
                    <Stamp capsule={props.capsule} setPage={setPage} />
                </>
            }
        </>
    )
}