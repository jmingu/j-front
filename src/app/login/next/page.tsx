"use client"

import axios from 'axios';
import { useSearchParams } from 'next/navigation'
import {useRouter} from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {USE_BACK_URL} from '../../../../constants'

interface UserProps {
  email: string,
  gender: string,
  nickname: string,
  userName: string
}

const NextPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams();
    const [userData, setUserData] = useState<UserProps | null>(null);
 
    useEffect(() => {
      const searchCode = searchParams.get('code')
      const searchState = searchParams.get('state')

      // ...
      axios.get(USE_BACK_URL + '/user/api/oauth/login/naver?code=' + searchCode + '&state=' + searchState,{
        headers: {
          'Authorization': 'Bearer noBearer' ,
          'Content-Type': 'application/json'
        }
      })
        .then( response => {

          if(response.status === 200) {
            sessionStorage.setItem('k', response.data.result.accessToken);
            localStorage.setItem('p', response.data.result.refreshToken);
            
            const tokenData = response.data.result.accessToken;
 
            axios.get(USE_BACK_URL+'/user/api/user/token', {
              headers: {
                  'Authorization': 'Bearer '+ tokenData,
                  'Content-Type': 'application/json'
              }
            })
            .then( response => {
              if(response.status === 200){
                  sessionStorage.setItem('u', JSON.stringify(response.data.result));
                  setUserData(response.data.result);
              }
            })
            .catch(error => {
              router.push("/error");
              console.error(error); // 에러 로깅
            });
            
            location.href = "/login";
          }
        })
        .catch(error => {
          router.push("/error");
          console.error(error); // 에러 로깅
        });
    }, []);

  return (
    <></>
  )
}

export default NextPage