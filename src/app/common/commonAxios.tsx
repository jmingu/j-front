"use client"
import axios, { AxiosInstance, AxiosRequestConfig  } from 'axios';
import {USE_BACK_URL} from '../../../constants';

export const customAxios: AxiosInstance = axios.create({
  baseURL: `${USE_BACK_URL}`, // 기본 서버 주소 입력
  headers: {
    'Authorization': 'Bearer ' + sessionStorage.getItem('a'),
    'Content-Type': 'application/json'
  }
  
});

export const refreshToken = (error:any):any => {

  const accessToken:any = localStorage.getItem('p');
  // console.log(accessToken)
  if(error?.response.status === 401){
    // console.log(accessToken)
    sessionStorage.setItem('a', accessToken);
    console.log(sessionStorage.getItem("a"))
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






