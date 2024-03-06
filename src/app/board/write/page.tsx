'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'

const Write = () => {
    const searchParams = useSearchParams()
 
    const search = searchParams.get('id')
    
    if((search !== null)){
        console.log("id == > " +search)
    }

    return (
        <>
            <div className="p-8 h-[60vh]">
                <div className='flex justify-end mt-3'>
                <a href={`/board`}>완료</a>
                </div>
                <div className='flex justify-between mb-3'>
                    <input className="focus:outline-none py-1 px-2" placeholder="제목을 입력해 주세요." />
                </div>
                <div className="relative h-full">
                    <textarea className="absolute top-0 border-t-2 border-b-2 border-gray-200 resize-none focus:outline-none w-full h-full p-3" placeholder="내용을 입력해 주세요."/>
                </div>
            </div>
            
        </>
    );
}

export default Write;