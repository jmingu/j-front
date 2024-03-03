"use client"
import React, { useState } from 'react';
import Link from 'next/link';

interface NoticeItem {
    id: number;
    title: string;
    author: string;
}

const NoticePage = () => {
    const noticeList: NoticeItem[] = [
        
    // 게시물 데이터 예시 (필요에 따라 더 추가할 수 있습니다)
    ];

    const itemsPerPage = 10; // 한 페이지에 표시할 게시물 개수
    const totalPages = Math.ceil(noticeList.length / itemsPerPage); // 전체 페이지 개수
    const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지

    // 현재 페이지에 해당하는 게시물 목록 가져오기
    const getCurrentPageItems = (): NoticeItem[] => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return noticeList.slice(startIndex, endIndex);
    };

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

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">공지사항</h1>
            <div className="h-[70lvh]">
                {getCurrentPageItems().length === 0 ? 
                    <div>글이 없습니다.</div> :
                    <ul className="bg-white shadow overflow-hidden rounded-md divide-y divide-gray-200">
                        {getCurrentPageItems().map((item) => (
                            <li key={item.id} className="px-4 py-3">
                                <Link href={`/notice/${item.id}`}>
                                    {item.title}
                                </Link>
                            <span className="text-gray-500 text-sm"> - {item.author}</span>
                            </li>
                        ))}
                    </ul>
                }
            </div>

            {getCurrentPageItems().length === 0 ? 
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
        
    );
}

export default NoticePage;