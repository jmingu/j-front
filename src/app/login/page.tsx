"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import axios from 'axios';
import {USE_FRONT_URL} from '../../../constants';
import {USE_BACK_URL} from '../../../constants';
import {useRouter} from 'next/navigation';
import { log } from 'console';

interface UserProps {
    email: string,
    gender: string,
    nickname: string,
    userName: string
}

const LoginPage = () => {
    const router = useRouter();

    const redirectUri = USE_FRONT_URL +"/login/next&state=dkfiskadspd";

    const [userData, setUserData] = useState<UserProps | null>(null);
    const [loginId, setLoginId] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);

    useEffect(() => {
        // 클라이언트 사이드에서만 sessionStorage에 접근 가능합니다.
        const data = sessionStorage.getItem('u');
        
        if(data !== null){
            setUserData(JSON.parse(data));
        }
       
      }, []);

    // 로그인
    const handleLogin = async () => {

        try {
            const response = await axios.post(USE_BACK_URL+'/user/api/user/login',{
                loginId : loginId,
                password : password
            },
            {
                headers: {
                    'Authorization': 'Bearer '+ sessionStorage.getItem('k'),
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                sessionStorage.setItem('k', response.data.result.accessToken);
                localStorage.setItem('p', response.data.result.refreshToken);
                
                const tokenData = response.data.result.accessToken;

                const userResponse = await axios.get(`${USE_BACK_URL}/user/api/user/token`, {
                    headers: {
                        'Authorization': 'Bearer ' + tokenData,
                        'Content-Type': 'application/json'
                    }
                });

                if (userResponse.status === 200) {
                    sessionStorage.setItem('u', JSON.stringify(userResponse.data.result));
                    setUserData(userResponse.data.result);
                }
                window.location.href = "/";
            }
        
        } catch (error:any) {
            
            alert(error.response.data.resultMessage)
            
        }
    }
    
    return (
        <div className=''>
            <div className='flex h-48 border-[2px] border-gray-200 max-w-96 m-auto mt-28 items-center'>
                <div className='w-full px-10'>
                    <div className=''>
                        <div className=''>
                            <div className='mb-1'>아이디 </div>
                            <input
                                className='w-full border rounded focus:outline-none mb-2'
                                onChange={(e) => setLoginId(e.target.value)}
                            />
                            <div className='mb-1'>비밀번호 </div>
                            <input
                                className='w-full border rounded focus:outline-none mb-2'
                                type='password'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='mt-5 text-center'>
                        <button className='mr-5' onClick={handleLogin}>로그인</button>
                        <Link href={"/join"}>회원가입</Link>
                    </div>
                </div>
            </div>
            <div className='text-center'>
                <div className='mt-5'>
                <Link href={`https://nid.naver.com/oauth2.0/authorize?client_id=wuAWZWv8noa7LcgEUPRd&response_type=code&redirect_uri=${redirectUri}`} legacyBehavior>네이버 로그인</Link>
                </div>    
            </div>
            
            
        </div>
    )
}

export default LoginPage
