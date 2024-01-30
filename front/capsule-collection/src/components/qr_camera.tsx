import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import jsQR from 'jsqr'

export default function Qr_Camera(props: any){
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const [qrCode, setQrCode] = React.useState<string>("")
    const [cameraSwitch, setCameraSwitch] = React.useState<string>("")

    const addCapsule = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(qrCode)
    }

    const cancel = (e: React.FormEvent) => {
        e.preventDefault();
        props.setActiveItem("home");
    };

    useEffect(() => {
        let contentWidth = 320
        let contentHeight = 480
        const config = { audio:false, video: { facingMode: "environment", width: contentWidth, height: contentHeight }}

        const ctx = canvasRef.current?.getContext('2d')

        const canvasUpdate = () => {
            if (ctx && videoRef.current && canvasRef.current) {
                canvasRef.current.width = contentWidth
                canvasRef.current.height = contentHeight
                ctx.drawImage(videoRef.current, 0, 0, contentWidth, contentHeight)
                requestAnimationFrame(canvasUpdate)
            }
        }
        const checkImage = () => {
            console.log("checkImage")
            if(ctx && videoRef.current){
                ctx?.drawImage(videoRef.current, 0, 0, contentWidth, contentHeight)
                const imageData = ctx.getImageData(0, 0, contentWidth, contentHeight)
                console.log("imagedata", imageData)
                if (imageData) {
                    const code = jsQR(imageData.data, contentWidth, contentHeight)
                    console.log("code",code)
                    if (code) {
                        // if(code.data || "https://capsule-collection.vercel.app/*" || "http://localhost:3001/"){
                            setQrCode(code.data)
                            setCameraSwitch("hidden")
                        // }
                    }else{
                        console.log("fail")
                    }
                }
                setTimeout(()=>{ checkImage() }, 200);
            }
        }
    
        const media = navigator.mediaDevices.getUserMedia(config)
        .then(stream => {
            if (videoRef.current) {
                videoRef.current.srcObject = stream
                videoRef.current.onloadedmetadata = () => {
                    if (videoRef.current){
                        videoRef.current.play()
                        contentWidth = contentWidth
                        contentHeight = contentHeight
                        canvasUpdate()
                        checkImage()
                    }
                }
            }
        })
        .catch(err => {
            console.log(err)
        })
    },[])

    return(
        <>
            <Image
                src="/cancel.svg"
                width={35}
                height={35}
                alt=""
                onClick={(e: React.FormEvent) => cancel(e)}
            />
            <video ref={videoRef} autoPlay playsInline width={320} height={480} className={`flex justify-center ${cameraSwitch}`}></video>
            <canvas ref={canvasRef} className='hidden'></canvas>
            {qrCode &&
                <>
                    <button onClick={(e: React.FormEvent) => addCapsule(e)}>追加</button>
                </>
            }                
        </>
    )
}