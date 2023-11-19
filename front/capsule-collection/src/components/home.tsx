import RecentCapsule from "./recent_capsule"
import Stamp from "./stamp"

export default function Home(props: any) {
    return (
        <div className="h-body">
            <RecentCapsule capsule={props.capsule} />
            <Stamp capsule={props.capsule} />
        </div>
    )
}