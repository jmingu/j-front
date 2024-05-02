"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import axios from 'axios';
import {USE_FRONT_URL} from '../../../constants';
import {USE_BACK_URL} from '../../../constants';
import {useRouter} from 'next/navigation';
import Image from 'next/image';
import Naver from '../../../public/btnW_아이콘원형.png';

interface UserProps {
    email: string,
    gender: string,
    nickname: string,
    userName: string
}

const LoginPage = () => {
    const router = useRouter();

    const redirectUri = USE_FRONT_URL +"/login/next&state=dkfiskadspd";
    const [autoLogin, setAutoLogin] = useState(false); // 자동 로그인 상태를 관리할 useState 추가

    const [clientId, setClientId] = useState(process.env.NEXT_PUBLIC_CLIENT_ID);

    const [userData, setUserData] = useState<UserProps | null>(null);
    const [loginId, setLoginId] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);

    useEffect(() => {
        // 클라이언트 사이드에서만 sessionStorage에 접근 가능합니다.
        const data = localStorage.getItem('u');
        
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
                    'Authorization': 'Bearer '+ null,
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                localStorage.setItem('a', response.data.result.accessToken);
                localStorage.setItem('p', response.data.result.refreshToken);
                
                const tokenData = response.data.result.accessToken;

                const userResponse = await axios.get(`${USE_BACK_URL}/user/api/user/token`, {
                    headers: {
                        'Authorization': 'Bearer ' + tokenData,
                        'Content-Type': 'application/json'
                    }
                });

                if (userResponse.status === 200) {
                    localStorage.setItem('u', JSON.stringify(userResponse.data.result));
                    sessionStorage.setItem("session", JSON.stringify(userResponse.data.result));
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
            <div className='flex h-60 border-[2px] border-gray-200 max-w-96 m-auto mt-28 items-center'>
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
                        <div className='flex items-center mb-2'> {/* 체크박스와 라벨을 flex container 안에 배치 */}
                        <input
                            id='autoLogin' // 체크박스에 id 제공
                            type='checkbox'
                            checked={autoLogin} // 체크박스 상태는 autoLogin 상태에 의해 결정
                            onChange={(e) => {
                                setAutoLogin(e.target.checked); 
                                console.log(e.target.checked)
                                if(e.target.checked === true){
                                    localStorage.setItem("auto","true");
                                }else if(e.target.checked === false){
                                    localStorage.removeItem("auto");
                                }
                            }} // 체크박스 상태 변경 시 autoLogin 상태 업데이트
                            className='mr-2' // 체크박스와 라벨 사이의 간격 조정
                        />
                        <label htmlFor='autoLogin'>자동 로그인</label> {/* htmlFor을 사용해 라벨 클릭 시 체크박스도 함께 토글 */}
                        </div>
                    </div>

                    <div className='mt-5 text-center'>
                        <button className='mr-5' onClick={handleLogin}>로그인</button>
                        <Link href={"/join"}>회원가입</Link>
                    </div>
                </div>
            </div>
            <div className='text-center'>
                <div className='mt-5 flex justify-center'>
                <Link href={`https://nid.naver.com/oauth2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`} legacyBehavior>
                    <Image src={Naver} alt='네이버 로그인' className='max-w-[40px] cursor-pointer'/>
                </Link>
                </div>    
            </div>
            
            
        </div>
    )
}

export default LoginPage
