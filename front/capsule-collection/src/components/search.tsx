// 検索画面のコンポーネント
// コンポーネント関連
import SearchInput from "./search_input"
import Capsule from "./capsule"

type Props = {
    capsule: any[]
}

export default function Search(props: Props) {
    return (
        <>
            {/* 検索のフォームのコンポーネント */}
            <SearchInput />
            {/* 検索結果 */}
            <div className="h-5/6 flex flex-col overflow-y-auto gap-5 my-4 hide-scroll-bar">
                <Capsule capsule={props.capsule} />
                <Capsule capsule={props.capsule} />
                <Capsule capsule={props.capsule} />
                <Capsule capsule={props.capsule} />
            </div>
        </>
    )
}