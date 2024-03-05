'use client'
import Link from 'next/link';
import React from 'react'
import {useRouter} from 'next/navigation'


const NavItem = ({mobile, setMenu} : {mobile?: boolean, setMenu?:any }) => {
    const router = useRouter()
    // 모바일
    if (true === mobile){
        return (
            <>
                <div className='w-full ml-2'>
                    <div className='mb-10'>로그인</div>
                    <ul className='flex flex-col gap-4 text-md justify-center gap-10 w-full'>
                        <li>
                            <button onClick={()=>{ setMenu(false); router.push('/board');  }}>게시판</button>
                        </li>
                        <li>
                            <button onClick={()=>{ setMenu(false); router.push('/notice');  }}>공지사항</button>
                        </li>
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
                        <li className='ml-10'>
                            로그인
                        </li>
                    </ul>
                </div>
            </>
        )
    }
    
}

export default NavItem