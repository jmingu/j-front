"use client"
import React, { useEffect, useState } from 'react';
import {commonAxios} from '../common/commonAxios';
import {useRouter} from 'next/navigation';

const InfoPage = () => {
    const router = useRouter();
    const [userName, setUserName] = useState<String | null>(null);
    const [gender, setGender] = useState<String | null>(null);
    const [nickname, setNickname] = useState<String | null>(null);
    const [email, setEmail] = useState<String | null>(null);

    const [inputNickname, setInputNickname] = useState<string | null>(null);

    useEffect(() => {
        if(localStorage.getItem('a') === null || localStorage.getItem('a') === undefined){
            alert("로그인이 필요합니다.");
            router.push("/error");
        }
    },[]);

    useEffect(() => {

        const fetchData = async () => {
            const result:any = await commonAxios("get","/user/api/user/token", null, "page");
            return result; // 결과를 반환
        };
    
        fetchData().then(response => {
            setUserName(response.data.result.userName);
            setGender(response.data.result.gender);
            setNickname(response.data.result.nickname);
            setEmail(response.data.result.email);
        });
    },[]);

    // 닉네임 등록
    const handleNick = () => {
        
        if(inputNickname === null || inputNickname === undefined){
            alert("닉네임을 입력해 주세요.");
            return false;
        }

        if(window.confirm("등록하시겠습니까?")) {

            const fetchData = async () => {
                const result:any = await commonAxios("post",'/user/api/user/nickname', {
                    nickname : inputNickname
                  }, "alert");
                return result; // 결과를 반환
            };
        
            fetchData().then(response => {
                setNickname(response.data.result.nickname);
            });
        }
      }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">내정보</h1>
            <div className="h-[70lvh]">
                <div className=''>
                    <div className='flex h-auto max-w-full m-auto mt-28 items-center py-5'>
                        <div className='w-full'>
                            <div className=''>
                                <div className=''>
                                    <div className='mb-2 flex justify-center'>
                                        <div>
                                            <div className='mb-3'>이름 : {userName}</div>
                                            <div className='mb-3'>성별 : {gender === "M" ? "남자" : "여자"}</div>
                                            <div className='mb-3'>이메일 : {email}</div>
                                            {
                                                (nickname === null || nickname === undefined) ? 
                                                <div className='flex'>
                                                    <div className='mb-3'>닉네임 :</div>
                                                    <input
                                                        className='w-[55%] border rounded focus:outline-none mb-3'
                                                        value={inputNickname||""}
                                                        placeholder="닉네임을 입력해 주세요." 
                                                        onChange={(e) => setInputNickname(e.target.value)}
                                                    />
                                                    <button className='mb-3 font-bold ml-1' onClick={handleNick}>완료</button>
                                                </div>:
                                                <div className='mb-3'>닉네임 : {nickname}</div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>    
        </div>    
    )
}

export default InfoPage