"use client"
import React, { useEffect, useState } from 'react'
import {USE_BACK_URL} from '../../../../constants'
import Comment from './comment';
import Link from 'next/link';
import axios from 'axios';
import {useRouter} from 'next/navigation';


interface Params {
    boardId?: Number
}

interface CommentProps {
    commentId: number,
    content: string,
    nickname: string,
    createDate: string,
    editEnable: boolean,
    likeCount: number,
    badCount: number,
  }
  
interface PostProps {
    boardId: number,
    title: string,
    nickname: string,
    createDate: string,
    viewCount: number,
    editEnable: boolean,
    content: string,
    likeCount: number,
    badCount: number,
}

const BoardDetailPage = ({ params }: { params: { boardId: number } }) => {
    // console.log(params.boardId);
    const router = useRouter();
    
    const [post, setPost] =  useState<PostProps>();
    

    // 댓글
    const [comments, setComments] =  useState<CommentProps[]>([]);
    const [totalPages, setTotalPages] = useState(0); // 전체 페이지 개수
    const itemPage = 2; // 한 페이지에 표시할 게시물 개수
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



    // 상세
    useEffect(() => {
        console.log(post)
        
        axios.get(USE_BACK_URL+'/post/api/borads/' + params.boardId, {
            headers: {
                'Authorization': 'Bearer '+ sessionStorage.getItem('k'),
                'Content-Type': 'application/json'
            }
        })
        .then( response => {
            if(response.status === 200){
    
                setPost(response.data.result);
                
            }
        })
        .catch(error => {
            router.push("/error");
            console.error(error); // 에러 로깅
        });
    
    }, []); // 이 훅은 컴포넌트가 마운트될 때 한 번만 실행됩니다.
    
    // 댓글
    useEffect(() => {

        setComments([])
        axios.get(USE_BACK_URL+'/post/api/borads/' + params.boardId + "/comments?page=" + currentPage, {
            headers: {
                'Authorization': 'Bearer '+ sessionStorage.getItem('k'),
                'Content-Type': 'application/json'
            }
        })
        .then( response => {
            if(response.status === 200){
                
                setComments(response.data.result.commentList);
                setTotalPages(Math.ceil((response.data.result.totalComment)/itemPage));
    
            }
        })
        .catch(error => {
            router.push("/error");
            console.error(error); // 에러 로깅
        });
    }, [currentPage]); // currentPage에 대한 의존성을 가지고 있습니다.



    return (
        <div className="max-w-3xl mx-auto p-2">
            <div className='flex justify-between'>
                <h1 className='font-bold mb-4'>{post?.title}</h1>
                <div className="flex">
                {
                    post?.editEnable === true ?
                        <>
                            <Link href={`/board/write?id=${post.boardId}`}>수정</Link>
                            <div className='ml-2 cursor-pointer'>삭제</div>
                        </>
                    : null
                }
                </div>
            </div>
            <div className='flex mb-2'>
                <p className="text-sm text-gray-500 mb-2">{post?.createDate}</p>
                <p className="text-sm text-gray-500 mb-4 ml-5">{post?.nickname}</p>
                <p className="text-sm text-gray-500 mb-4 ml-5">조회수: {post?.viewCount}</p>
            </div>
            <div className="relative mb-4 py-20 border-t-2 border-b-2 border-gray-200">
                <p className='absolute top-0 mt-3'>{post?.content}</p>
            </div>
            <div className='flex justify-evenly my-4'>
                <div className='cursor-pointer'>
                    좋아요
                    <div className='text-center'>{post?.likeCount}</div>
                </div>
                <div className='cursor-pointer'>
                    싫어요
                    <div className='text-center'>{post?.badCount}</div>
                </div>
            </div>
            <div className='flex justify-between'>
                <h2 className="font-bold mb-2">댓글</h2>
                {
                    sessionStorage.getItem('u') !== null ?
                    <div className='cursor-pointer'>완료</div> :
                    <></>
                }
                
            </div>
            <textarea className="top-0 border-2 border-gray-200 resize-none focus:outline-none w-full h-full p-3" placeholder={sessionStorage.getItem('u') !== null ? '댓글을 작성해 주세요.' : '로그인 후 작성이 가능합니다.'}/>
            {comments.map((comment, index) => (
                <div key={index}>
                    <Comment key={index} comment={comment} boardId={params.boardId}/>
                </div>
            ))}
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
    );
};

export default BoardDetailPage;
