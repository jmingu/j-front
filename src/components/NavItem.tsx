import React from 'react'

const NavItem = ({mobile} : {mobile?: boolean }) => {
    return (

        <ul className='text-md justify-center flex gap-10 w-full items-center'>
            <li>
                자유게시판
            </li>
            <li>
                공지사항
            </li>
            <li className='ms-8'>
                로그인
            </li>
        </ul>
    )
}

export default NavItem