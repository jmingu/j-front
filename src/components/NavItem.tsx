'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import {useRouter} from 'next/navigation';

const NavItem = ({mobile, setMenu, session} : {mobile?: boolean, setMenu?:any, session?:any}) => {
   
    const router = useRouter();

    useEffect(() => {
        console.log(session)
        // 클라이언트 사이드에서만 sessionStorage에 접근 가능합니다.
    
    }, []);

      const handleLogout = () => {
        sessionStorage.clear();
        localStorage.clear();
    }

    // 모바일
    if (true === mobile){
        return (
            <>
                <div className='w-full ml-5 mt-20'>
                    <div className='mb-10'>
                        {
                            session !== null ? 
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
                            (session === null || session === undefined) ? null :
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
                            (session === null || session === undefined) ? null :
                            <li>
                                <Link href="/info">내정보</Link> 
                            </li> 
                        }
                        <li className='ml-7 text-sm'>
                            {
                                session !== null ? 
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