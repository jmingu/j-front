"use client"

import axios from 'axios';
import {useRouter} from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {USE_BACK_URL} from '../../../../constants';
import { request } from 'http';



const NextPage = (request:any) => {

    const router = useRouter();
    const [userData, setUserData] = useState(null);
    const [code, setCode] = useState<String | null>(request.searchParams.code);
    const [state, setState] = useState<String | null>(request.searchParams.state);

    useEffect(() => {
        const fetchData = async () => {
            const searchCode = code;
            const searchState = state;

            try {
                const response = await axios.get(`${USE_BACK_URL}/user/api/oauth/login/naver?code=${searchCode}&state=${searchState}`, {
                    headers: {
                        'Authorization': 'Bearer noBearer',
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 200) {
                    localStorage.setItem('a', response.data.result.accessToken);
                    localStorage.setItem('b', response.data.result.refreshToken);
                    
                    const tokenData = response.data.result.accessToken;

                    const userResponse = await axios.get(`${USE_BACK_URL}/user/api/user/token`, {
                        headers: {
                            'Authorization': 'Bearer ' + tokenData,
                            'Content-Type': 'application/json'
                        }
                    });

                    if (userResponse.status === 200) {
                        localStorage.setItem('u', JSON.stringify(userResponse.data.result));
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