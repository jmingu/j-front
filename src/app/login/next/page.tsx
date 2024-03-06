"use client"

import axios from 'axios';
import { useSearchParams } from 'next/navigation'
import {useRouter} from 'next/navigation'
import React, { useEffect } from 'react';

const NextPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams();
 
    useEffect(() => {
        const searchCode = searchParams.get('code')
        const searchState = searchParams.get('state')
        console.log(searchCode);
        console.log(searchState);
        // ...
        const aaa =  axios.get('http://localhost:8080/user/api/oauth/login/naver?code=' + searchCode + '&state=' + searchState)
        .then( response => {
        console.log(response.data.result.accessToken);
        console.log(response.status);
        if(response.status === 200){
            window.sessionStorage.setItem('k', response.data.result.accessToken);
            window.sessionStorage.setItem('r', response.data.result.refreshToken);
            router.push("/login");
        }
    })
    .catch(error => {
        router.push("/login/error");
        console.error(error); // 에러 로깅
    });
      }, []);

  return (
    <></>
  )
}

export default NextPage