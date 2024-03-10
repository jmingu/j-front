"use client"
import React, { useEffect, useState } from 'react'
import {USE_BACK_URL} from '../../../../constants'
import Link from 'next/link';
import axios from 'axios';
import {useRouter} from 'next/navigation'
import { useSearchParams } from 'next/navigation'


const Write = () => {
    const searchParams = useSearchParams()
    const router = useRouter();
    
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
 
    const search = searchParams.get('id')
    
    // 상세
    useEffect(() => {

        if(search !== null){
            axios.get(USE_BACK_URL+'/post/api/borads/' + search, {
                headers: {
                    'Authorization': 'Bearer '+ sessionStorage.getItem('k'),
                    'Content-Type': 'application/json'
                }
            })
            .then( response => {
                if(response.status === 200){
                    console.log(response.data.result)
                    setTitle(response.data.result.title);
                    setContent(response.data.result.content);
                    
                }
            })
            .catch(error => {
                router.push("/error");
                console.error(error); // 에러 로깅
            });
        
        }
        
    }, []); // 이 훅은 컴포넌트가 마운트될 때 한 번만 실행됩니다.

    return (
        <>
            <div className="p-8 h-[60vh]">
                <div className='flex justify-end mt-3'>
                <a href={`/board`}>완료</a>
                </div>
                <div className='flex justify-between mb-3'>
                    <input className="focus:outline-none py-1 px-2" value={title} placeholder="제목을 입력해 주세요." onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="relative h-full">
                    <textarea className="absolute top-0 border-t-2 border-b-2 border-gray-200 resize-none focus:outline-none w-full h-full p-3" value={content} placeholder="내용을 입력해 주세요." onChange={(e) => setContent(e.target.value)}/>
                </div>
            </div>
            
        </>
    );
}

export default Write;