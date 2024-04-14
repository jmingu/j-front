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

  let response:any;

  await customAxios[method](url, url)
  .then(result => {
    // 성공 시의 처리
    response = result;
  })
  .catch(error => {
    if(errorType === "page"){
      window.location.href = "/error";
    }
    else {
      alert("다시시도해 주세요.")
    }
  });
  console.log("response")
  return response;
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






