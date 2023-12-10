// ユーザの持っているカプセルを表示するコンポーネント
// コンポーネント関連
import Capsule from './capsule'

type Props = {
    capsule: any[]
}

export default function Mystamp(props: Props) {
    return (
        <div className="h-4/6 border border-black rounded-lg flex flex-col items-start justify-start gap-5 overflow-y-auto">
            {props.capsule.map((cp: any, i: number) => (
                <>
                    <Capsule key={i} capsule={cp} />
                    <Capsule key={i} capsule={cp} />
                    <Capsule key={i} capsule={cp} />
                </>
            ))}
        </div>
    )
}