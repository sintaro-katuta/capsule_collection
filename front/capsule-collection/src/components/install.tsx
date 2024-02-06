import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface BeforeInstallPromptEvent extends Event {
    prompt: () => void;
    userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function Install(props: any) {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [isInstallable, setIsInstallable] = useState(false);
    const message = "インストール";
    const disabledMessage = "ホーム画面に追加済み";

    useEffect(() => {
        window.addEventListener("beforeinstallprompt", (e: any) => {
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setIsInstallable(true);
        });
    }, []);

    const onInstallClick = async () => {
        if (!deferredPrompt) {
            return;
        }
    
        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === "accepted") {
            setDeferredPrompt(null);
            setIsInstallable(false);
        } else {
            setIsInstallable(true);
        }
    };
    return (
        <div>
            {isInstallable ?
                <div className='flex' onClick={() => onInstallClick()}>
                    <p>インストール</p>
                    <Image src="/download.svg" width={20} height={20} alt='' />
                </div>
                :
                <div className='flex'>
                    <p>インストール済み</p>
                    <Image src="/download_done.svg" width={20} height={20} alt='' />
                </div>
            }
        </div>
    )
}