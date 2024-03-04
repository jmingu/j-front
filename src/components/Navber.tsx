'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import NavItem from './navItem';

const Navber = () => {

    const [menu, setMenu] = useState(false);

    const handleMenu = () => {

        setMenu(!menu);
    }

    return (
        <nav className='relative z-10 w-full bg-gray-100'>
            {/* 웹 화면 */}
            <div className='flex w-full'>
                <div className='text-2xl flex sm:hidden ms-3'>
                    <button onClick={handleMenu}>메뉴</button>
                </div>
                <div className='flex items-center justify-center sm:justify-between mx-10 w-full'>
                
                    <div className='flex items-center text-2xl h-14'>
                        <Link href="/">로고자리</Link>
                    </div>

                    <div className='hidden sm:block'>
                        <NavItem />
                    </div>
                </div>
            </div>
            
            {/* 모바일 메뉴 */}
            <div className={`fixed top-0 left-0 h-full w-full bg-white transform transition-transform duration-200 ease-in-out ${menu ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className='h-full flex mt-2'>
                    <NavItem mobile />
                    <div>
                        <button onClick={handleMenu}>X</button>
                    </div>
                </div>
                
            </div>
        </nav>
    )
}

export default Navber