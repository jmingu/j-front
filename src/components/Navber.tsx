'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import NavItem from './navItem';
import { CiMenuBurger } from "react-icons/ci";
import Image from 'next/image';
import Logo from '../../public/project-j.png';



const Navber = () => {
    const [menu, setMenu] = useState(false);


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
                                <Image src={Logo} alt='로고이미지' className='max-w-[50%]'/>
                            </div>
                        </Link>
                    </div>

                    <div className='hidden sm:block'>
                        <NavItem />
                    </div>
                </div>
            </div>
            
            {/* 모바일 메뉴 */}
            <div className={`z-10 fixed top-0 left-0 h-full w-full bg-white transform transition-transform duration-200 ease-in-out ${menu ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className='h-full flex mt-2'>
                    <NavItem mobile setMenu={setMenu}/>
                    <div>
                        <button className='w-16 mt-6 text-xl' onClick={handleMenu}>X</button>
                    </div>
                </div>
                
            </div>
        </nav>
    )
}

export default Navber