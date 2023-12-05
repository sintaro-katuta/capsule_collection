import Cupusule from "./cupusule"

export default function Add_Input(props: any) {
    return (
        <div className="h-4/5">
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-800" htmlFor="countries">ガチャカテゴリ</label>
                <select id="countries" className="h-10 bg-background border-2 border-black text-gray-900 text-sm rounded-xl outline-none focus:ring-black focus:border-black block w-full p-2.5 ">
                    <option selected></option>
                    <option>ちぃかわ</option>
                    <option>ポケモン</option>
                    <option>おぱんちゅうさぎ</option>
                </select>
            </div>
            <div className="w-full h-full my-4 overflow-y-auto flex flex-col gap-5">
                <Cupusule capsule={props.capsule} />
                <Cupusule capsule={props.capsule} />
                <Cupusule capsule={props.capsule} />
                <Cupusule capsule={props.capsule} />
                <Cupusule capsule={props.capsule} />
                <Cupusule capsule={props.capsule} />
                <Cupusule capsule={props.capsule} />
            </div>
        </div>
    )
}