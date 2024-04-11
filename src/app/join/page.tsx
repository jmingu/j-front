"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {USE_BACK_URL} from '../../../constants';
import {useRouter} from 'next/navigation';


const JoinPage = () => {
    const router = useRouter();

    const [loginId, setLoginId] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [gender, setGender] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [passwordCheck, setPasswordCheck] = useState<string | null>(null);

    const [loginIdCheck, setLoginIdCheck] = useState(false);

    // 중복확인
    const handleIdCheck = () => {
        if(loginId === null || loginId === undefined){
            alert("아이디를 입력해 주세요.");
            return false;
        }
        
        axios.get(USE_BACK_URL+'/user/api/user/join/login-check?loginId='+ loginId,
        {
          headers: {
              'Authorization': 'Bearer '+ sessionStorage.getItem('a'),
              'Content-Type': 'application/json'
          }
        })
        .then(response => {
            if (response.status === 200) {
                setLoginIdCheck(true);
                alert("사용할 수 있는 아이디입니다.");
            }else{
                alert("다시 시도해 주세요.");
            }
          
        })
        .catch(error => {
            alert(error.response.data.resultMessage);
        });
    }

    // 가입
    const handJoin = () =>{
        if(loginId === null || loginId === undefined || loginId === ""){
            alert("아이디를 입력해 주세요.");
            return false;
        }
        if(userName === null || userName === undefined || userName === ""){
            alert("이름을 입력해 주세요.");
            return false;
        }
        if(gender === null || gender === undefined || gender === ""){
            alert("성별을 선택해 주세요.");
            return false;
        }
        if(email === null || email === undefined || email === ""){
            alert("이메일을 입력해 주세요.");
            return false;
        }
        if(password === null || password === undefined || password === ""){
            alert("비밀번호를 입력해 주세요.");
            return false;
        }
        if(passwordCheck === null || passwordCheck === undefined || passwordCheck === ""){
            alert("비밀번호 확인을 입력해 주세요.");
            return false;
        }

        if(loginIdCheck === false){
            alert("아이디 중복검사를 해주세요.");
            return false;
        }
        if(password !== passwordCheck){
            alert("비밀번호가 일치하지 않습니다.");
            return false;
        }
        if(emailCheck() === false){
            alert("이메일 확인을 해주세요.");
            return false;
        }

        axios.post(USE_BACK_URL+'/user/api/user/join',{
            loginId : loginId,
            userName : userName,
            gender : gender,
            email : email,
            password : passwordCheck
        },
        {
          headers: {
              'Authorization': 'Bearer '+ sessionStorage.getItem('a'),
              'Content-Type': 'application/json'
          }
        })
        .then(response => {
            if (response.status === 200) {
                
                alert("가입성공");
                router.push("/login");
            }else{
                alert("다시 시도해 주세요.");
            }
          
        })
        .catch(error => {
            alert(error.response.data.resultMessage);
        });


    }
    
    // 이메일 검증
    const emailCheck = () => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


    return (
        <div className=''>
            <div className='flex h-auto border-[2px] border-gray-200 max-w-96 m-auto mt-28 items-center py-5'>
                <div className='w-full px-10'>
                    <div className=''>
                        <div className=''>
                            <div className='flex mb-1 justify-between'> 
                                <div className=''>아이디 </div>
                                <button className='ml-2 text-sm font-bold' onClick={handleIdCheck}>중복확인</button>
                            </div>
                            <input
                                className='w-full border rounded focus:outline-none mb-3'
                                onChange={(e) => setLoginId(e.target.value)}
                            />
                            <div className='mb-2'>이름 </div>
                            <input
                                className='w-full border rounded focus:outline-none mb-3'
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <div className='mb-1'>성별</div>
                                <div className="mb-3">
                                <label className="inline-flex items-center mr-4">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="M"
                                        className="w-4 h-4"
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                    <span className="ml-2">남</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="F"
                                        className="w-4 h-4" 
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                    <span className="ml-2">여</span>
                                </label>
                                </div>
                            <div className='mb-1'>이메일 </div>
                            <input
                                className='w-full border rounded focus:outline-none mb-3'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className='mb-1'>비밀번호 </div>
                            <input
                                className='w-full border rounded focus:outline-none mb-3'
                                type='password'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className='mb-1'>비밀번호 확인</div>
                            <input
                                className='w-full border rounded focus:outline-none mb-3'
                                type='password'
                                onChange={(e) => setPasswordCheck(e.target.value)}
                            />
                            
                        </div>
                        <div className='mt-5 text-center'>
                            <button className='mr-5 font-bold' onClick={handJoin}>가입하기</button>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    )
}

export default JoinPage