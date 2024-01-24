// 画面下のメニューのコンポーネント
// Next関数
import Image from "next/image"

type Props = {
    activeItem: string
    setActiveItem: (any)
}

export default function Menu(props: Props) {
    const changeActiveItem = (item: string) => {
        props.setActiveItem(item)
        console.log("changeActiveItem")
    }
    return (
        <>
            {props.activeItem == "login"
                ?
                null
                :
                <div className="w-full h-2/12 flex justify-between items-center gap-2">
                    <div className="flex flex-col items-center justify-center w-1/3">
                        {props.activeItem === "profile"
                            ? <Image src="/profile_active.svg" width={40} height={40} alt="profile" onClick={() => changeActiveItem('profile')} className="cursor-pointer" />
                            : <Image src="/profile.svg" width={40} height={40} alt="profile" onClick={() => changeActiveItem('profile')} className="cursor-pointer" />
                        }
                        <p className="text-xs text-center">プロフィール</p>
                    </div>
                    <div className="flex flex-col items-center justify-center w-1/3">
                        {props.activeItem === "home"
                            ? <Image src="/home_active.svg" width={40} height={40} alt="home" onClick={() => changeActiveItem('home')} className="cursor-pointer" />
                            : <Image src="/home.svg" width={40} height={40} alt="home" onClick={() => changeActiveItem('home')} className="cursor-pointer" />
                        }
                        <p className="text-xs text-center">ホーム</p>
                    </div>
                    <div className="flex flex-col items-center justify-center w-1/3">
                        {props.activeItem === "search"
                            ? <Image src="/search_active.svg" width={40} height={40} alt="search" onClick={() => changeActiveItem('search')} className="cursor-pointer" />
                            : <Image src="/search.svg" width={40} height={40} alt="search" onClick={() => changeActiveItem('search')} className="cursor-pointer" />
                        }
                        <p className="text-xs text-center">検索</p>
                    </div>
                </div >
            }
        </>
    )
}