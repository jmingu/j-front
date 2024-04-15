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

export const commonAxios = async (method: "get" | "post" | "put" | "patch" | "delete", url:string, errorType: "page" | "alert") => {

  try {
    // customAxios의 비동기 요청을 기다린 후 결과를 반환합니다.
    const response = await customAxios[method](url);
    return response; // 성공적인 응답을 반환합니다.
  } catch (error:any) {
    console.log(error.response.data)
    
    if(error.response.status === 401){
      try {
        const result = await axios.post(USE_BACK_URL + "/user/api/refresh",{
          refreshToken : localStorage.getItem('p')
        }, 
        {
          headers: {
            'Authorization': 'Bearer '+ localStorage.getItem('p'),
            'Content-Type': 'application/json'
          }
        })
        console.log(result.data.result.accessToken);
        localStorage.setItem('a', result.data.result.accessToken);
        history.go(0);
        return false;
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
    // 에러가 발생했을 경우, 에러 객체나 특정 값을 반환할 수 있습니다.
    // 이 부분은 필요에 따라 적절하게 처리해주세요.
    return null; // 에러가 발생했을 경우 null을 반환하거나, 적절한 에러 객체를 반환할 수 있습니다.
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






