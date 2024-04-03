"use client"
import axios from 'axios';
import {USE_BACK_URL} from '../../../constants';
import {useRouter} from 'next/navigation';


 // 에러페이지로 이동되어야 할 때
export const GetRequestErrorPageRouter = async (url: string) => {
  let result;
  await axios.get(USE_BACK_URL + url, {
    headers: {
        'Authorization': 'Bearer '+ localStorage.getItem('a'),
        'Content-Type': 'application/json'
    }
  })
  .then( response => {
    result =  response;
    console.log(response)
    return response;
  })
  .catch(error => {
      window.location.href = "/error"; 
      console.error(error); // 에러 로깅
  });
}

