"use client"
import React, { useEffect, useState } from 'react'
import {useRouter} from 'next/navigation'
import {commonAxios} from '../../common/commonAxios';

interface UserProps {
    email: string,
    gender: string,
    nickname: string,
    userName: string
}


const Write = (request:any) => {
    
    const router = useRouter();

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");

    const [param, setParam] = useState<string | null>(request.searchParams.id);

    const [sessionUser, setSessionUser] = useState<UserProps | null>(null);

    useEffect(() => {

        const userData:any = localStorage.getItem('u');
        setSessionUser(JSON.parse(userData));
    },[]);

    // 등록
    const handleCreate = () =>{
        if(sessionUser?.nickname === null || sessionUser?.nickname === undefined){
            alert("닉네임 등록이 필요합니다.");
            return false;
        }

        if(title.length === 0){
            alert("제목을 입력해 주세요.");
            return false;
        }
        if(content.length === 0){
            alert("내용을 입력해 주세요.");
            return false;
        }
        if(window.confirm("등록하시겠습니까?")) {

            const fetchData = async () => {
                const result:any = await commonAxios("post", "/post/api/borads", {
                    title : title,
                    content : content
                }, "alert");
                return result; // 결과를 반환
            };
    
            fetchData().then(response => {
                alert("등록되었습니다.");
                
                router.push("/board");
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

            const fetchData = async () => {
                const result:any = await commonAxios("patch",'/post/api/borads/' + param, {
                    title : title,
                    content : content
                }, "alert");
                return result; // 결과를 반환
              };
          
              fetchData().then(response => {
                alert("수정되었습니다.");
                router.push("/board/"+ param);
              });
        }      
    }
    
    // 상세
    useEffect(() => {
        
        if(param !== null && param !== undefined){

            const fetchData = async () => {
                const result:any = await commonAxios("get",'/post/api/borads/' + param, null, "page");
                return result; // 결과를 반환
            };
        
            fetchData().then(response => {
                setTitle(response.data.result.title);
                setContent(response.data.result.content);
            });
        }
        
    }, []); 

    return (
        <>
            <div className="p-8 h-[60vh]">
                <div className='flex justify-end mt-3'>
                {
                    (param === null || param === undefined) ? 
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