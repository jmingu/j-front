"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import {USE_BACK_URL} from '../../constants'
import axios from 'axios';
import {USE_FRONT_URL} from '../../constants';

interface UserProps {
  email: string,
  gender: string,
  nickname: string,
  userName: string
}

export default function Home() {


    const [uData, setUData] = useState<UserProps | null>(null);
    const [kData, setkData] = useState<string|null>(null);

    const [inputNickname, setInputNickname] = useState<string | null>(null);

    useEffect(() => {
      // 클라이언트 사이드에서만 sessionStorage에 접근 가능합니다.
      const userData = sessionStorage.getItem('u');
      const kData = localStorage.getItem('a');
      
      if(kData !== null){
          setkData(kData);

        if(userData !== null){
          
          setUData(JSON.parse(userData));
        }
      }
    }, [uData?.nickname]);

    // 닉네임 등록
    const handleNick = () => {
      if(inputNickname === null || inputNickname === undefined){
        alert("닉네임을 입력해 주세요.");
        return false;
      } 
      
      if(window.confirm("등록하시겠습니까?")) {
        axios.post(USE_BACK_URL+'/user/api/user/nickname',{
          nickname : inputNickname
        }, 
        {
          headers: {
              'Authorization': 'Bearer '+ localStorage.getItem('a'),
              'Content-Type': 'application/json'
          }
        })
        .then( response => {
          console.log(response.data.result)
          if(response.status === 200){
            localStorage.setItem('u', JSON.stringify(response.data.result));
            setUData(response.data.result);
          }else{
            alert("다시 시도해 주세요.");
          }
        })
        .catch(error => {
          alert(error.response.data.resultMessage);
        });
      }
    }
    

  return (
    <main>
      <div className='text-center'>
        <p>안녕하세요. 방문해 주셔서 감사합니다.</p>
        <div className='h-32 border-[2px] border-gray-200 max-w-80 m-auto mt-16 items-center flex justify-center'>
          {
            kData === null || kData === undefined ? 
              <div>
                <div className='mb-5'>로그인을 하면 더 많은 기능을 <br/>이용 할 수 있습니다.</div>
                <Link href={"/login"}>
                  <div className='font-bold'>로그인 하러가기</div>
                </Link> 
              </div>
            :
              uData === null || uData === undefined ? 
                <Link href={"/"}>로그인 하러가기</Link>  
              :
                (uData.nickname !== null && uData.nickname !== undefined) ? 
                  <div>{uData.nickname} 님 환영합니다.</div> 
                :
                  <div>
                    <div>닉네임 등록이 필요합니다.</div>
                    <input
                      className='w-full border rounded focus:outline-none mt-2'
                      value={inputNickname||""}
                      onChange={(e) => setInputNickname(e.target.value)}
                    />
                    <button className='mt-2' onClick={handleNick}>완료</button>
                  </div>
          }
        </div>
      </div>
    </main>
  );
}
