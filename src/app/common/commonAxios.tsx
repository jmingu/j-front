"use client"
import axios, { AxiosInstance, AxiosRequestConfig  } from 'axios';
import {USE_BACK_URL} from '../../../constants';

export const customAxios: AxiosInstance = axios.create({
  baseURL: `${USE_BACK_URL}`, // 기본 서버 주소 입력
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('a'),
    'Content-Type': 'application/json'
  }
  
});

export const commonAxios = async (method: "get" | "post" | "put" | "patch" | "delete", token:any, url:string, body:any, errorType: "page" | "alert") => {
  console.log(token)
  try {
    // customAxios의 비동기 요청을 기다린 후 결과를 반환합니다.
    const response = await axios[method](USE_BACK_URL + url, body,
      {
        headers: {
          'Authorization': 'Bearer '+ token,
          'Content-Type': 'application/json'
        }
      })
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
        console.log(result.data.result.accessToken);

        localStorage.setItem("a", result.data.result.accessToken);
        const newToken = localStorage.getItem("a");
        console.log(newToken);
        

        const reResponse = await axios[method](USE_BACK_URL + url, body,
        {
          headers: {
            'Authorization': 'Bearer '+ newToken,
            'Content-Type': 'application/json'
          }
        })
        console.log(reResponse);
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



export const refreshToken = (error:any):any => {

  const accessToken:any = localStorage.getItem('a');
  // console.log(accessToken)
  if(error?.response.status === 401){
    // console.log(accessToken)
    localStorage.setItem('a', accessToken);
    axios.get(USE_BACK_URL + '/post/api/borads?page=1&size=10',{
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      }
    })
      .then( response => {
        console.log(response)
          
      })
  }
  
  
  return null;
}






