import SearchInput from "./search_input"
import Cupusule from "./cupusule"

export default function Search(props: any) {
    return (
        <div className="h-body">
            <SearchInput />
            <div className="h-5/6 flex-col overflow-y-auto hide-scroll-bar">
                <Cupusule capsule={props.capsule} />
                <Cupusule capsule={props.capsule} />
                <Cupusule capsule={props.capsule} />
                <Cupusule capsule={props.capsule} />
            </div>
        </div>
    )
}