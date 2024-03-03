'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import NavItem from './NavItem';

const Navber = () => {

    const [menu, setMenu] = useState(false);

    const handleMenu = () => {

        setMenu(!menu);
    }

    return (
        <nav className='relative z-10 w-full bg-orange-500'>
            {/* 웹 화면 */}
            <div className='text-2xl flex sm:hidden'>
                {menu === false ? 
                <button onClick={handleMenu}>+</button> :
                <button onClick={handleMenu}>-</button> 
                }
            </div>
            <div className='flex items-center justify-center sm:justify-between mx-10'>

                <div className='flex items-center text-2xl h-14'>
                    <Link href="/">로고자리</Link>
                </div>

                

                <div className='hidden sm:block'>
                    <NavItem />
                </div>
            </div>
            <div className='block sm:hidden'>
                {/* 모바일이라 전달 */}
                {(menu === false) ? null : <NavItem mobile />} 
            </div>
        </nav>
    )
}

export default Navber