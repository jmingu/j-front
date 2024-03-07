"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import axios from 'axios';
import {USE_FRONT_URL} from '../../../constants';

interface UserProps {
    email: string,
    gender: string,
    nickname: string,
    userName: string
}

const LoginPage = () => {
    const redirectUri = USE_FRONT_URL +"/login/next&state=dkfiskadspd";

    const [userData, setUserData] = useState<UserProps | null>(null);

    useEffect(() => {
        // 클라이언트 사이드에서만 sessionStorage에 접근 가능합니다.
        const data = sessionStorage.getItem('u');
        
        if(data !== null){
            setUserData(JSON.parse(data));
        }
       
      }, []);
    
    
    return (
        <div className='text-center'>
            <div className='h-32 border-[2px] border-gray-200 max-w-80 m-auto mt-28 items-center flex justify-center'>
                {
                    userData === null ? 
                        <Link href={`https://nid.naver.com/oauth2.0/authorize?client_id=wuAWZWv8noa7LcgEUPRd&response_type=code&redirect_uri=${redirectUri}`} legacyBehavior>네이버 로그인</Link> :
                        userData.nickname === null ? 
                        <div>{userData.nickname} 님 환영합니다.</div> :
                        <div>닉네임 설정이 필요합니다.</div>
                    
                }
            </div>
            <div className='text-xs'>네이버 외 SNS로그인 업데이트 예정</div>
            
        </div>
    )
}

export default LoginPage
