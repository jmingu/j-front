"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import axios from 'axios';
import {USE_BACK_URL} from '../../../constants'
import {useRouter} from 'next/navigation';

interface BoardItem {
    boardId: number;
    title: string;
    content: string;
    createDate : string;
    nickname: string;
    viewCount: number;
}

const BoardPage = () => {
    const router = useRouter();
    
    const [boardList, setBoardList] = useState<BoardItem[]>([]); // boardList 상태 선언
    const [totalPages, setTotalPages] = useState(0); // 전체 페이지 개수

    const itemsPerPage = 10; // 한 페이지에 표시할 게시물 개수

    const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지

    // 이전 페이지로 이동
    const goToPreviousPage = (): void => {
        if(currentPage !== 1){
            setCurrentPage((prevPage) => prevPage - 1);
        }
        
    };

    // 다음 페이지로 이동
    const goToNextPage = (): void => {
        if(currentPage !== totalPages){
            setCurrentPage((prevPage) => prevPage + 1);
        }
        
    };

    // 페이지 번호 클릭 시 해당 페이지로 이동
    const goToPage = (pageNumber: number): void => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {

        axios.get(USE_BACK_URL+'/post/api/borads?page=' + currentPage, {
            headers: {
                'Authorization': 'Bearer '+ sessionStorage.getItem('k'),
                'Content-Type': 'application/json'
            }
        })
        .then( response => {
            if(response.status === 200){
                setTotalPages(Math.ceil((response.data.result.totalBoard)/itemsPerPage));
                setBoardList(response.data.result.boardList);
            }
        })
        .catch(error => {
            router.push("/error");
            console.error(error); // 에러 로깅
        });
    
    }, [currentPage]); // currentPage를 의존성 배열에 추가

    return (
        <>
            <div className="p-4 ">
                <div className='flex justify-between'>
                    <h1 className="text-2xl font-bold mb-4">자유게시판</h1>
                    {
                        sessionStorage.getItem('u') !== null ?
                        <div>
                            <Link href={`/board/write/ `}>글작성</Link>
                        </div> :
                        <></>
                    }   
                </div>
                <div>
                    {totalPages === 0 ? 
                        <div>글이 없습니다.</div> :
                        <ul className="bg-white shadow overflow-hidden rounded-md divide-y divide-gray-200">
                            {boardList.map((item) => (
                                <li key={item.boardId} className="px-4 py-2">
                                    <div className='overflow-ellipsis overflow-hidden whitespace-nowrap'>
                                        <Link href={`/board/${item.boardId}`}>
                                            {item.title}
                                        </Link>
                                        <div className='flex'>
                                            <div className="text-gray-500 text-sm"> {item.createDate}</div>
                                            <div className="text-gray-500 ml-5 text-sm"> {item.nickname}</div>
                                            <div className="text-gray-500 ml-5 text-sm">조회수 : {item.viewCount}</div>
                                        </div>
                                    </div>
                                    
                                </li>
                            ))}
                        </ul>
                    }
                </div>
                {
                    totalPages === 0 ? 
                    <></> : 
                    <div className="mt-4 flex justify-center">
                        <button className="mr-2" onClick={goToPreviousPage}>이전</button>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    className={`mx-1 ${currentPage === index + 1 ? "font-bold" : ""}`}
                                    onClick={() => goToPage(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        <button className="ml-2" onClick={goToNextPage}>다음</button>
                    </div>
                }
            </div>
        </>
    );
};

export default BoardPage;
