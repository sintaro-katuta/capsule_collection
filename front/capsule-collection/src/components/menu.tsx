// 画面下のメニューのコンポーネント
// Next関数
import Image from "next/image"

type Props = {
    activeItem: string
    setActiveItem: (any)
}

export default function Menu(props: Props) {
    return (
        <div>
            {props.activeItem == "login"
                ?
                null
                :
                <div className="flex justify-between items-center gap-2 h-14">
                    <div className="flex flex-col items-center justify-center w-1/3">
                        {props.activeItem === "profile"
                            ? <Image src="/profile_active.svg" width={40} height={40} alt="profile" onClick={() => props.setActiveItem('profile')} className="cursor-pointer" />
                            : <Image src="/profile.svg" width={40} height={40} alt="profile" onClick={() => props.setActiveItem('profile')} className="cursor-pointer" />
                        }
                        <p className="text-xs text-center">プロフィール</p>
                    </div>
                    <div className="flex flex-col items-center justify-center w-1/3">
                        {props.activeItem === "home"
                            ? <Image src="/home_active.svg" width={40} height={40} alt="home" onClick={() => props.setActiveItem('home')} className="cursor-pointer" />
                            : <Image src="/home.svg" width={40} height={40} alt="home" onClick={() => props.setActiveItem('home')} className="cursor-pointer" />
                        }
                        <p className="text-xs text-center">ホーム</p>
                    </div>
                    <div className="flex flex-col items-center justify-center w-1/3">
                        {props.activeItem === "search"
                            ? <Image src="/search_active.svg" width={40} height={40} alt="search" onClick={() => props.setActiveItem('search')} className="cursor-pointer" />
                            : <Image src="/search.svg" width={40} height={40} alt="search" onClick={() => props.setActiveItem('search')} className="cursor-pointer" />
                        }
                        <p className="text-xs text-center">検索</p>
                    </div>
                </div >
            }
        </div >

    )
}