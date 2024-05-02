'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import NavItem from './navItem';
import { CiMenuBurger } from "react-icons/ci";
import Image from 'next/image';
import Logo from '../../public/project-j.png';
import {commonAxios} from '../app/common/commonAxios';
import { usePathname, useSearchParams } from 'next/navigation'

const Navber = () => {
    
    const [menu, setMenu] = useState(false);
    const [session, setSession] = useState<any>(null);

    // 페이지 이동시 로그인 감지
    const pathname = usePathname();
    const searchParams = useSearchParams();
    useEffect(() => {
        const accessVal = localStorage.getItem("a");
        const refreshVal = localStorage.getItem("p");

        if(accessVal === null || accessVal === undefined || refreshVal === null || refreshVal === undefined){
            sessionStorage.clear();
            localStorage.clear();
            setSession(null);
        }
    }, [pathname, searchParams])


    useEffect(() => {
        const sessionVal = sessionStorage.getItem("session");
        console.log(sessionVal);
        // 새로운 탭 또는 새로운 로그인
        if(sessionVal === null || sessionVal === undefined){
            
            // 로그인 했던가 여부
            const accessVal = localStorage.getItem("a");
            console.log(accessVal);
            if(!(accessVal === null || accessVal === undefined)){
                console.log(accessVal);
                // 토큰으로 세션 다시 넣기
                const fetchData = async () => {
                    const result:any = await commonAxios("get",'/user/api/user/token', null, "page");
                    return result; // 결과를 반환
                };
            
                fetchData().then(response => {
                    const newSession = JSON.stringify(response.data.result);
                    sessionStorage.setItem("session", newSession);
                    setSession(newSession); // 세션 상태 업데이트
                });
            }
            
            
        } else {
            setSession(sessionVal); // 이미 세션 정보가 있으면 상태에 설정
        }
    }, []);
    

    const handleMenu = () => {
        setMenu(!menu);
    }

    return (
        <nav className='w-full bg-white'>
            {/* 웹 화면 */}
            <div className='flex w-full relative'>
                <div className='text-2xl flex sm:hidden ms-3 absolute h-14'>
                    <button onClick={handleMenu}><CiMenuBurger /></button>
                </div>
                <div className='flex items-center justify-center sm:justify-between mx-10 w-full'>
                
                    <div className='flex items-center text-2xl h-14'>
                        <Link href="/">
                            <div className='flex justify-center sm:justify-start'>
                                <Image src={Logo} alt='로고이미지' className='max-w-[150px] sm:max-w-[180px]'/>
                            </div>
                        </Link>
                    </div>

                    <div className='hidden sm:block'>
                        <NavItem mobile={false} setMenu={false} session={session}/>
                    </div>
                </div>
            </div>
            
            {/* 모바일 메뉴 */}
            <div className={`z-10 fixed top-0 left-0 h-full w-full bg-white transform transition-transform duration-200 ease-in-out ${menu ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className='h-full flex mt-2'>
                    <NavItem mobile={true} setMenu={setMenu} session={session}/>
                    <div>
                        <button className='w-16 mt-6 text-xl' onClick={handleMenu}>X</button>
                    </div>
                </div>
                
            </div>
        </nav>
    )
}

export default Navber