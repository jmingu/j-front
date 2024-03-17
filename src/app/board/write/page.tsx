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
 
    const search = searchParams.get('id');
    const [param, setParam] = useState<string | null>(search);

    // 등록
    const handleCreate = () =>{

        if(title.length === 0){
            alert("제목을 입력해 주세요.");
            return false;
        }
        if(content.length === 0){
            alert("내용을 입력해 주세요.");
            return false;
        }
        if(window.confirm("등록하시겠습니까?")) {
            axios.post(USE_BACK_URL+'/post/api/borads',{
                title : title,
                content : content
            }, 
            {
                headers: {
                    'Authorization': 'Bearer '+ sessionStorage.getItem('k'),
                    'Content-Type': 'application/json'
                }
            })
            .then( response => {
                if(response.status === 200){
                    alert("등록되었습니다.");
                    router.push("/board");
                    
                }
            })
            .catch(error => {
                alert(error.response.data.resultMessage);
            });
        }      
    }

    // 수정
    const handleEdit = () => {

        if(title.length === 0){
            alert("제목을 입력해 주세요.");
            return false;
        }
        if(content.length === 0){
            alert("내용을 입력해 주세요.");
            return false;
        }
        if(window.confirm("수정하시겠습니까?")) {
            axios.patch(USE_BACK_URL+'/post/api/borads/' + param,{
                title : title,
                content : content
            }, 
            {
                headers: {
                    'Authorization': 'Bearer '+ sessionStorage.getItem('k'),
                    'Content-Type': 'application/json'
                }
            })
            .then( response => {
                if(response.status === 200){
                    alert("수정되었습니다.");
                    router.push("/board/"+ param);
                    // window.location.href = "/board/"+ param;
                    
                }
            })
            .catch(error => {
                alert(error.response.data.resultMessage);
            });
        }      
    }
    
    // 상세
    useEffect(() => {

        if(param !== null){
            axios.get(USE_BACK_URL+'/post/api/borads/' + param, {
                headers: {
                    'Authorization': 'Bearer '+ sessionStorage.getItem('k'),
                    'Content-Type': 'application/json'
                }
            })
            .then( response => {
                if(response.status === 200){
                    setTitle(response.data.result.title);
                    setContent(response.data.result.content);
                    
                }
            })
            .catch(error => {
                router.push("/error");
                console.error(error); // 에러 로깅
            });
        
        }
        
    }, []); 

    return (
        <>
            <div className="p-8 h-[60vh]">
                <div className='flex justify-end mt-3'>
                {
                    param === null ? 
                    <button onClick={handleCreate}>완료</button>
                    :
                    <button onClick={handleEdit}>수정</button>
                }
                
                </div>
                <div className='flex justify-between mb-3'>
                    <input 
                        className="focus:outline-none py-1 px-2 w-full" 
                        value={title} 
                        placeholder="제목을 입력해 주세요." 
                        onChange={(e) => setTitle(e.target.value)} 
                        />
                </div>
                <div className="relative h-full">
                    <textarea 
                        className="absolute top-0 border-t-2 border-b-2 border-gray-200 resize-none focus:outline-none w-full h-full py-1 px-2" 
                        value={content} 
                        placeholder="내용을 입력해 주세요." 
                        onChange={(e) => setContent(e.target.value)}/>
                </div>
            </div>
            
        </>
    );
}

export default Write;