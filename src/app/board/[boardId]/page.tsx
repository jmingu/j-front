"use client"
import React, { useEffect, useState } from 'react'
import Comment from './comment';
import Link from 'next/link';
import {commonAxios} from '../../common/commonAxios';
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
    likeClick: boolean,
    badClick: boolean
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
    likeClick: boolean,
    badClick: boolean,
}

const BoardDetailPage = ({ params }: { params: { boardId: number } }) => {
    const router = useRouter();
    
    const [post, setPost] =  useState<PostProps>();
    
    const itemPageSize = 5; // 한 페이지에 표시할 게시물 개수
    // 댓글
    const [comments, setComments] =  useState<CommentProps[]>([]);
    const [totalPages, setTotalPages] = useState(0); // 전체 페이지 개수
    
    const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지

    const [inputValue, setInputValue] = useState<string | null>(null);

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

    
    // 페이지네이션
    const calculatePageRange = () => {
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + 4);
    
        if (endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
        }
    
        return [startPage, endPage];
    };

    const [startPage, endPage] = calculatePageRange();

    // 상세
    useEffect(() => {  

        const fetchData = async () => {
            const result:any = await commonAxios("get","/post/api/borads/" + params.boardId, null, "page");
            return result; // 결과를 반환
        };

        fetchData().then(response => {
            setPost(response.data.result);
        });

    }, []);
    
    // 등록
    const handleCreate = () =>{
        if(window.confirm("등록하시겠습니까?")) {

            const fetchData = async () => {
                const result:any = await commonAxios("post",'/post/api/borads/'+ params.boardId +'/comments', {
                    content : inputValue
                }, "alert");
                return result; // 결과를 반환
            };
    
            fetchData().then(response => {
                setInputValue(null);
                alert("등록되었습니다.");
                commentList();
            });
        }      
    }
    
    // 댓글
    useEffect(() => {
        commentList();
    }, [currentPage]);

    const commentList = () => {
        setComments([]);


        const fetchData = async () => {
            const result:any = await commonAxios("get",'/post/api/borads/' + params.boardId + "/comments?page=" + currentPage + '&size=' + itemPageSize, null, "page");
            return result; // 결과를 반환
        };

        fetchData().then(response => {
            setComments(response.data.result.commentList);
            setTotalPages(Math.ceil((response.data.result.totalComment)/itemPageSize));
        });

    }

    // 좋아요 / 싫어요 클릭
    const handleLikeBadClick = (value: string): void => {

        const fetchData = async () => {
            const result:any = await commonAxios("post",'/post/api/borads/'+ post?.boardId +'/' + value, {}, "alert");
            return result; // 결과를 반환
        };

        fetchData().then(response => {
            setPost(response.data.result.boardDetail);
        });

    }

    const handleDelete = () => {
        if(window.confirm("삭제하시겠습니까?")) {

            const fetchData = async () => {
                const result:any = await commonAxios("delete",'/post/api/borads/'+ params.boardId, null, "alert");
                return result; // 결과를 반환
            };
    
            fetchData().then(response => {
                alert("삭제되었습니다.");
                router.push("/board");    
            });

        }     
    }
    
    return (
        <div className="max-w-3xl mx-auto p-2">
            <div className='flex justify-between'>
                <h1 className='mb-4'>{post?.title}</h1>
                <div className="flex">
                {
                    post?.editEnable === true ?
                        <>
                            <Link href={`/board/write?id=${post.boardId}`}>수정</Link>
                            <div className='ml-2 cursor-pointer' onClick={handleDelete}>삭제</div>
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
                <div className='cursor-pointer' onClick={() => handleLikeBadClick("like")}>
                    {post?.likeClick === true ?
                    <div className='font-black'>좋아요</div>:
                    <div>좋아요</div>
                    }
                    <div className='text-center'>{post?.likeCount}</div>
                </div>
                <div className='cursor-pointer' onClick={() => handleLikeBadClick("bad")}>
                    {post?.badClick === true ?
                    <div className='font-black'>싫어요</div>:
                    <div>싫어요</div>
                    }
                    <div className='text-center'>{post?.badCount}</div>
                </div>
            </div>
            <div className='flex justify-between'>
                <h2 className="mb-2">댓글</h2>
                {
                    localStorage.getItem('u') !== null ?
                    <div className='cursor-pointer font-bold' onClick={handleCreate}>완료</div> :
                    null
                }
                
            </div>
            <textarea 
                className="top-0 border-2 border-gray-200 resize-none focus:outline-none w-full h-full p-3" 
                placeholder={localStorage.getItem('u') !== null ? '댓글을 작성해 주세요.' : '로그인 후 작성이 가능합니다.'}
                value={inputValue||""}
                onChange={(e) => setInputValue(e.target.value)}
            />
            {comments.map((comment, index) => (
                <div key={index}>
                    <Comment key={index} comment={comment} boardId={params.boardId} commentList={commentList}/>
                </div>
            ))}
            {
                totalPages === 0 ? 
                <></> : 
                <div className="mt-4 flex justify-center">
                    <button className="mr-2" onClick={goToPreviousPage}>이전</button>
                    {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                        <button
                            key={startPage + index}
                            className={`mx-1 ${currentPage === startPage + index ? "font-bold" : ""}`}
                            onClick={() => goToPage(startPage + index)}
                        >
                            {startPage + index}
                        </button>
                    ))}
                    <button className="ml-2" onClick={goToNextPage}>다음</button>
                </div>
            }

        </div>
    );
};

export default BoardDetailPage;
