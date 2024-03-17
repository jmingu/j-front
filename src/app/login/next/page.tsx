"use client"

import axios from 'axios';
import { useSearchParams } from 'next/navigation'
import {useRouter} from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {USE_BACK_URL} from '../../../../constants'


const NextPage = () => {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState(new URLSearchParams(window.location.search));
  const [userData, setUserData] = useState(null);

  useEffect(() => {
      const fetchData = async () => {
          const searchCode = searchParams.get('code');
          const searchState = searchParams.get('state');

        try {
            const response = await axios.get(`${USE_BACK_URL}/user/api/oauth/login/naver?code=${searchCode}&state=${searchState}`, {
                headers: {
                    'Authorization': 'Bearer noBearer',
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                sessionStorage.setItem('k', response.data.result.accessToken);
                localStorage.setItem('p', response.data.result.refreshToken);
                
                const tokenData = response.data.result.accessToken;

                const userResponse = await axios.get(`${USE_BACK_URL}/user/api/user/token`, {
                    headers: {
                        'Authorization': 'Bearer ' + tokenData,
                        'Content-Type': 'application/json'
                    }
                });

                if (userResponse.status === 200) {
                    sessionStorage.setItem('u', JSON.stringify(userResponse.data.result));
                    setUserData(userResponse.data.result);
                }

                window.location.href = "/";
            }
        } catch (error) {
            router.push("/error");
            console.error(error); // 에러 로깅
        }
      };

      fetchData();
  }, []);

  return (
      <></>
  );
}

export default NextPage