import SearchInput from "./search_input"
import Cupusule from "./cupusule"

export default function Search(props: any) {
    return (
        <>
            <SearchInput />
            <div className="h-5/6 flex flex-col overflow-y-auto gap-5 my-4 hide-scroll-bar">
                <Cupusule capsule={props.capsule} />
                <Cupusule capsule={props.capsule} />
                <Cupusule capsule={props.capsule} />
                <Cupusule capsule={props.capsule} />
            </div>
        </>
    )
}