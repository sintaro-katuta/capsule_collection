import RecentCapsule from "./recent_capsule"
import Stamp from "./stamp"
import AddIcon from "./add_icon"
import { useEffect, useState } from "react"
import Loading from "./loading"

type Props = {
    setActiveItem: (any)
}

export default function Home(props: Props) {
    const [loading, setLoading] = useState<boolean>(true)
    const [capsule, setCapsule]: any = useState<any>([])

    useEffect(() => {
        setLoading(false)
    },[])

    return (
        <>
            {loading
            ?
                <Loading />
            :
                <>
                    <RecentCapsule capsule={capsule} />
                    <Stamp capsule={capsule} setActiveItem={props.setActiveItem} />
                </>
            }
        </>
    )
}