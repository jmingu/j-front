"use client"
import React, { useEffect, useState } from 'react'
import {USE_BACK_URL} from '../../../../constants'
import Comment from './comment';
import Link from 'next/link';
import axios from 'axios';
import {useRouter} from 'next/navigation'


interface Params {
    boardId?: Number
}

interface CommentProps {
    id: number,
    content: string,
    date: string,
    editEnable: boolean,
    comments: CommentProps[] 
}
  
interface PostProps {
    boardId: number,
    title: string,
    nickname: string,
    createDate: string,
    viewCount: number;
    editEnable: boolean,
    content: string,
    comments: CommentProps[]
}

const BoardDetailPage = ({ params }: { params: { boardId: number } }) => {
    console.log(params.boardId);
    const router = useRouter();
    
    const [post, setPost] =  useState<PostProps>();
    // 가상의 데이터를 사용하여 게시물 정보를 표시
    const post1: PostProps = {
        boardId: 1,
        title: '안녕하세요',
        nickname: '홍길동',
        createDate: '2024.03.04',
        content: '동해물과 백두산이',
        viewCount: 0,
        editEnable : true,
        comments: [
            {
                id: 1,
                content: '댓글 1',
                date: '2024.03.04',
                editEnable : false,
                comments: [
                    { id: 1, content: '대댓글 1', date: '2024.03.04', editEnable : true, comments:[] },
                    { id: 2, content: '대댓글 2', date: '2024.03.04', editEnable : false, comments:[] }
                ]
            },
            {
                id: 2,
                content: '댓글 2',
                date: '2024.03.04',
                editEnable : true,
                comments: [
                    { id: 3, content: '대댓글 3', date: '2024.03.04', editEnable : false, comments:[] },
                ]
            }
        ]
    };

    useEffect(() => {
        const tokenData = sessionStorage.getItem('k');

        axios.get(USE_BACK_URL+'/post/api/borads/' + params.boardId, {
            headers: {
                'Authorization': 'Bearer '+ tokenData,
                'Content-Type': 'application/json'
            }
        })
        .then( response => {
            if(response.status === 200){
                
                console.log(response.data.result);

                setPost(response.data.result);
            }
        })
        .catch(error => {
            router.push("/error");
            console.error(error); // 에러 로깅
        });
    
    }, []);

    return (
        <div className="max-w-3xl mx-auto p-8">
            <div className='flex justify-between'>
                <h1 className='font-bold mb-4'>{post?.title}</h1>
                <div className="flex">
                {
                    post?.editEnable === true ?
                        <>
                            {/* <div>수정</div> */}
                            <Link href={`/board/write?id=${post.boardId}`}>수정</Link>
                            <div className='ml-2'>삭제</div>
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
            <h2 className="font-bold mb-2">댓글</h2>
            {/* {post?.comments.map((comment, index) => (
                <div key={index}>
                    <Comment key={index} comment={comment} />
                    {comment.comments.map((subComment, subIndex) => ( 
                        <div key={subIndex}>
                            <div className='ml-3 flex'>
                                <div>└</div>
                                <div className='w-full'>
                                    <Comment key={subIndex} comment={subComment}/>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))} */}

        </div>
    );
};

export default BoardDetailPage;
