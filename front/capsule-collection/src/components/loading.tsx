type Props = {
    loading: boolean
}

export default function Loading(props: Props) {
    console.log(props.loading)
    return (
        <>
            {props.loading
                ?
                <div className="w-full h-full flex justify-center items-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div>
                :
                null}
        </>

    )
}