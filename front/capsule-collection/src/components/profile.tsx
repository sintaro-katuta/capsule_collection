import ProfileIcon from "./profile_icon"
import Mystamp from "./mystamp"

export default function Profile(props: any) {


    return (
        <div className="h-body">
            <ProfileIcon />
            <Mystamp capsule={props.capsule} />
        </div>
    )
}