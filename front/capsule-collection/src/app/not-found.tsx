// NotFoundのページ
// Next関連
import Link from "next/link";
// コンポーネント関連
import Header from "@/components/header";

export default function NotFound() {
    return (
        <div className="w-screen h-screen fixed">
            <Header />
            <div className="w-full h-full flex flex-col justify-start items-center text-center gap-8">
                <p className="text-5xl">404</p>
                <p className="">ページが見つかりません。<Link href="/" className="text-blue-400">こちら</Link></p>
            </div>
        </div>
    );
}