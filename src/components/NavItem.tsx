'use client'
import Link from 'next/link';
import React from 'react'

const NavItem = ({mobile} : {mobile?: boolean }) => {
    console.log("mobile ==" + mobile);

    // 모바일
    if (true === mobile){
        return (
            <>
                <div className='w-full ml-2'>
                    <div className='mb-10'>로그인</div>
                    <ul className='flex flex-col gap-4 text-md justify-center gap-10 w-full'>
                        <li>
                            <Link href="/board">게시판</Link> 
                        </li>
                        <li>
                            <Link href="/notice">공지사항</Link> 
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