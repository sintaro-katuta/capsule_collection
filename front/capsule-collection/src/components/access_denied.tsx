// PC以外でアクセスされたときのコンポーネント
import Install from '@/components/install'

export default function AccessDenied() {
    return (
        <div className="h-full flex justify-center items-center">
            <div className="flex flex-col justify-center items-center">
                <p className="text-xl">お手数ですが</p>
                <p className="text-xl"><span className="text-red-500 font-bold">スマートフォン</span>または<span className="text-red-500 font-bold">タブレット</span></p>
                <p className="text-xl">からご利用ください</p>
                <Install />
            </div>
        </div>
    )
}