"use client"
import React from 'react'
import Link from 'next/link';
import axios from 'axios';
import {USE_URL} from '../../../constants'

interface Book {
    isbn : string;
    name : string;
    price : number;
    author : string;
}

const LoginPage = () => {
    
     const redirectUri = USE_URL +"/login/next&state=dkfiskadspd";

    return (
        <div className='text-center'>
            <div className='h-32 border-[2px] border-gray-200 max-w-80 m-auto mt-28 items-center flex justify-center'>
                <Link href={`https://nid.naver.com/oauth2.0/authorize?client_id=wuAWZWv8noa7LcgEUPRd&response_type=code&redirect_uri=${redirectUri}`} legacyBehavior>네이버 로그인</Link>
            </div>
            <div className='text-xs'>네이버 외 SNS로그인 업데이트 예정</div>
        </div>
    )
}

export default LoginPage
