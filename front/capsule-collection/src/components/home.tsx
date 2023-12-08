import RecentCapsule from "./recent_capsule"
import Stamp from "./stamp"
import Add_Input from "./add_input"
import { useState } from "react"

type Props = {
    capsule: any[]
}

export default function Home(props: Props) {
    // カプセルを登録する画面の状態
    const [page, setPage] = useState<any>(false)
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