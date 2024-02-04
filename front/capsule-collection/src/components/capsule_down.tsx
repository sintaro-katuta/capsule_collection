import { useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '@/supabase/client';

export default function CapsuleDown(props: any) {
    const getImage = (image: string) => {
        const { data } = supabase.storage.from('capsule').getPublicUrl(image)
        return data.publicUrl
    }
    useEffect(() => {
        const dropdownButton: any = document.getElementById(`dropdown-button-${props.index}`);
        const dropdownMenu: any = document.getElementById(`dropdown-menu-${props.index}`);
        let isOpen = false; // Set to true to open the dropdown by default
        
        function toggleDropdown() {
            isOpen = !isOpen;
            dropdownMenu?.classList.toggle('hidden', !isOpen);
        }
        
        dropdownButton?.addEventListener('click', () => {
            toggleDropdown();
        });
    }, [props])
    return(
        <div className="w-full flex items-start justify-center">
            <div className="w-full relative group">
                <button id={`dropdown-button-${props.index}`} className="inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-black bg-white border border-gray-600 rounded-md shadow-sm">
                    <span className="mr-2 text-base">{props.value}</span>
                    <span className="mr-2 text-base">{props.mol}/{props.deno}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule={'evenodd'} d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule={'evenodd'} />
                    </svg>
                </button>
                <div id={`dropdown-menu-${props.index}`} className="hidden h-fit right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1 overflow-y-auto">
                    <div className='grid grid-cols-3'>
                    {props.content.map((capsule: any, i: number) =>
                        <div key={i} className=''>
                            <Image src={getImage(capsule.capsule.image)} width={100} height={100} alt="capsule" />
                            <p>{capsule.capsule.name}</p>
                        </div>
                    )}
                    </div>
                </div>
            </div>
        </div>
    )
}