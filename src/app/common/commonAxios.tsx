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

export const refreshToken = (error:any):any => {
  let accessToken = localStorage.getItem('a');
  if(error?.response.status === 401){
    console.log("good")
    
  }
  
  return null;
}






