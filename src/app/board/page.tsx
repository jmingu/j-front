"use client"
import React, { useState } from 'react';
import Link from 'next/link';

interface BoardItem {
    id: number;
    title: string;
    author: string;
}

const BoardPage = () => {
    const boardList: BoardItem[] = [
        { id: 1, title: '첫 번째 게시물', author: '작성자1' },
        { id: 2, title: '두 번째 게시물', author: '작성자2' },
        { id: 3, title: '세 번째 게시물', author: '작성자3' },
        { id: 4, title: '네 번째 게시물', author: '작성자4' },
        { id: 5, title: '다섯 번째 게시물', author: '작성자5' },
        { id: 6, title: '다섯 번째 게시물', author: '작성자6' },
        { id: 7, title: '다섯 번째 게시물', author: '작성자7' },
        { id: 8, title: '다섯 번째 게시물', author: '작성자8' },
        { id: 9, title: '다섯 번째 게시물', author: '작성자9' },
        { id: 10, title: '다섯 번째 게시물', author: '작성자10' },
        { id: 11, title: '다섯 번째 게시물', author: '작성자11' },
        { id: 12, title: '다섯 번째 게시물', author: '작성자12' },
        { id: 13, title: '다섯 번째 게시물', author: '작성자13' },
        { id: 14, title: '다섯 번째 게시물', author: '작성자14' },
        { id: 15, title: '다섯 번째 게시물', author: '작성자15' },
        { id: 16, title: '다섯 번째 게시물', author: '작성자16' },
        { id: 17, title: '다섯 번째 게시물', author: '작성자17' },
        { id: 18, title: '다섯 번째 게시물', author: '작성자18' },
        { id: 19, title: '다섯 번째 게시물', author: '작성자19' },
        { id: 20, title: '다섯 번째 게시물', author: '작성자20' },
        { id: 21, title: '다섯 번째 게시물', author: '작성자21' },
    // 게시물 데이터 예시 (필요에 따라 더 추가할 수 있습니다)
    ];

    const itemsPerPage = 10; // 한 페이지에 표시할 게시물 개수
    const totalPages = Math.ceil(boardList.length / itemsPerPage); // 전체 페이지 개수
    const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지

    // 현재 페이지에 해당하는 게시물 목록 가져오기
    const getCurrentPageItems = (): BoardItem[] => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return boardList.slice(startIndex, endIndex);
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
        <>
            <div className="p-4 ">
                <div className='flex justify-between'>
                    <h1 className="text-2xl font-bold mb-4">자유게시판</h1>
                    <div>
                        <Link href={`/board/write/ `}>글작성</Link>
                    </div>
                </div>
                <div>
                    {getCurrentPageItems().length === 0 ? 
                        <div>글이 없습니다.</div> :
                        <ul className="bg-white shadow overflow-hidden rounded-md divide-y divide-gray-200">
                            {getCurrentPageItems().map((item) => (
                                <li key={item.id} className="px-4 py-3 overflow-ellipsis overflow-hidden whitespace-nowrap">
                                    <Link href={`/board/${item.id}`}>
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
        </>
    );
};

export default BoardPage;
