'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import {useRouter} from 'next/navigation';
import axios from 'axios';
import {USE_BACK_URL} from '../../constants';

interface UserProps {
    email: string,
    gender: string,
    nickname: string,
    userName: string
}

const NavItem = ({mobile, setMenu} : {mobile?: boolean, setMenu?:any }) => {
   
    const router = useRouter();

    const [userData, setUserData] = useState<UserProps | null>(null);

    const [sessionToken, setSessionToken] = useState<string | null>(null);

    useEffect(() => {
        // 클라이언트 사이드에서만 sessionStorage에 접근 가능합니다.
        const data = sessionStorage.getItem('u');
        setSessionToken(localStorage.getItem('a'));
        if(data !== null){
            setUserData(JSON.parse(data));
        }
       
    }, []);

     
      const handleLogout = () => {
        sessionStorage.clear()
    }

    // 모바일
    if (true === mobile){
        return (
            <>
                <div className='w-full ml-5 mt-20'>
                    <div className='mb-10'>
                        {
                            userData !== null ? 
                                <div>
                                    <a onClick={handleLogout} href='/' >로그아웃</a>
                                </div> :
                                <button onClick={()=>{ setMenu(false); router.push('/login');  }}>로그인</button>
                        }
                    </div>
                    <ul className='flex flex-col gap-4 text-md justify-center gap-10 w-full'>
                        <li>
                            <button onClick={()=>{ setMenu(false); router.push('/board');  }}>게시판</button>
                        </li>
                        <li>
                            <button onClick={()=>{ setMenu(false); router.push('/notice');  }}>공지사항</button>
                        </li>
                        {
                            (sessionToken === null || sessionToken === undefined) ? null :
                            <li>
                                <button onClick={()=>{ setMenu(false); router.push('/info');  }}>내정보</button>
                            </li> 
                        }
                    </ul>
                </div>
            </>
        )
    }
    // 웹
    else {
        return (
            <>
                <div className='flex'>
                    <ul className='text-md justify-center flex gap-10 w-full items-center'>
                        <li>
                            <Link href="/board">게시판</Link> 
                        </li>
                        <li>
                            <Link href="/notice">공지사항</Link> 
                        </li>
                        {
                            (sessionToken === null || sessionToken === undefined) ? null :
                            <li>
                                <Link href="/info">내정보</Link> 
                            </li> 
                        }
                        <li className='ml-7 text-sm'>
                            {
                                userData !== null ? 
                                    <>
                                        <a onClick={handleLogout} href='/' >로그아웃</a>
                                    </> :
                                    <Link href="/login">로그인</Link> 
                            }
                        </li>
                    </ul>
                </div>
            </>
        )
    }
    
}

export default NavItem