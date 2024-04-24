"use client"
import axios, { AxiosInstance, AxiosRequestConfig  } from 'axios';
import {USE_BACK_URL} from '../../../constants';

export const customAxios: AxiosInstance = axios.create({
  baseURL: `${USE_BACK_URL}`, // 기본 서버 주소 입력
  headers: {
    'Content-Type': 'application/json'
  }
});

// 새로운 토큰으로 Authorization 헤더를 동적으로 설정합니다.
customAxios.interceptors.request.use(
  (config) => {
    // 현재 토큰 값을 localStorage에서 가져옵니다.
    const currentToken = localStorage.getItem('a');
    if (currentToken) {
      // Authorization 헤더에 현재 토큰 값을 설정합니다.
      config.headers['Authorization'] = `Bearer ${currentToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

customAxios.interceptors.response.use(
  (response) => {
    // 응답 200번대 status일 때 응답 성공 직전 호출
    // 3. 이 작업 이후 .then()으로 이어진다
    return response;
  },
  (error) => {
    // 응답 200번대가 아닌 status일 때 응답 에러 직전 호출
    // 4. 이 작업 이후 .catch()로 이어진다
    return Promise.reject(error);
  }
);

export const commonAxios = async (method: "get" | "post" | "put" | "patch" | "delete", url:string, body:any, errorType: "page" | "alert") => {

  try {
    // customAxios의 비동기 요청을 기다린 후 결과를 반환합니다.
    const response = await customAxios[method](url, body);

    return response; // 성공적인 응답을 반환합니다.
  } catch (error:any) {
    
    if(error.response.status === 401){
      try {
        const result = await axios.post(USE_BACK_URL + "/user/api/refresh",{
          refreshToken : localStorage.getItem('p')
        }, 
        {
          headers: {
            'Authorization': 'Bearer '+ 'null',
            'Content-Type': 'application/json'
          }
        })

        localStorage.setItem("a", result.data.result.accessToken);
        
        const reResponse = await customAxios[method](url, body);

        return reResponse; // 성공적인 응답을 반환합니다.
      } catch (error:any) {
        window.location.href = "/login";
        return false;
      }
    }
    // 에러 처리
    if(errorType === "page"){
      window.location.href = "/error";
    } else {
      alert("다시 시도해 주세요.");
    }
  }
};








