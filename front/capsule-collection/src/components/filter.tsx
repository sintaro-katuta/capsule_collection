import Image from 'next/image'
import React, { useEffect } from 'react';
import axios from 'axios';

export default function Filter(props: any) {
    const onFilter = async(e: any) => {
        if(props.value === '価格'){
            const filterValue: number = parseInt(e.currentTarget.textContent)
            console.log(filterValue)
            props.setFilter(false)
            const priceRes: any = await axios.post('/api/category/select/price', { price : filterValue })
            if(priceRes.data){
                console.log(priceRes.data.category)
                props.setCategories(priceRes.data.category)
                props.setSearch(true)
            }
        }else{
            const filterValue: string = e.currentTarget.textContent
            console.log(filterValue)
            props.setFilter(false)
            const categoryRes: any = await axios.post('/api/category/select/name', { name : filterValue })
            if(categoryRes.data){
                console.log(categoryRes.data.category)
                props.setCategories(categoryRes.data.category)
                props.setSearch(true)
            }
        
        }
    }
        useEffect(() => {
            const dropdownButton: any = document.getElementById(`dropdown-button-${props.value}`);
            const dropdownMenu: any = document.getElementById(`dropdown-menu-${props.value}`);
            const searchInput: any = document.getElementById(`search-input-${props.value}`);
            console.log(dropdownButton, dropdownMenu, searchInput)
            let isOpen = false; // Set to true to open the dropdown by default
            
            function toggleDropdown() {
                isOpen = !isOpen;
                dropdownMenu?.classList.toggle('hidden', !isOpen);
            }
            
            dropdownButton?.addEventListener('click', () => {
                toggleDropdown();
            });
            // Add event listener to filter items based on input
            searchInput.addEventListener('input', () => {
                const searchTerm = searchInput.value.toLowerCase();
                const items = dropdownMenu.querySelectorAll('p');
            
                items.forEach((item: any) => {
                    const text = item.textContent?.toLowerCase();
                    console.log(text)
                    if (text.includes(searchTerm)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        }, [props])
    return (
        <>
            <div className="flex items-start justify-center">
                <div className="w-full relative group">
                    <button id={`dropdown-button-${props.value}`} className="inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-black bg-white border border-gray-600 rounded-md shadow-sm">
                        <span className="mr-2 text-base">{props.value}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule={'evenodd'} d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule={'evenodd'} />
                        </svg>
                    </button>
                    <div id={`dropdown-menu-${props.value}`} className="hidden h-fit right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1 overflow-y-auto">
                    <input id={`search-input-${props.value}`} className="block w-full px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none" type="text" placeholder="検索" autoComplete="off" />
                        {props.filterList.map((item: any, i: number) => (
                            <p key={i} onClick={(e: React.FormEvent) => onFilter(e)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">{item}</p>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}