"use client"
import React, { useState } from 'react'
import Comment from './comment';
import Link from 'next/link';


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
    id: number,
    title: string,
    author: string,
    date: string,
    editEnable: boolean,
    content: string,
    comments: CommentProps[]
}

const BoardDetailPage = ({ params }: { params: { boardId: number } }) => {
    console.log(params.boardId);

    // 가상의 데이터를 사용하여 게시물 정보를 표시
    const post: PostProps = {
        id: 1,
        title: '안녕하세요',
        author: '홍길동',
        date: '2024.03.04',
        content: '동해물과 백두산이',
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

    return (
        <div className="max-w-3xl mx-auto p-8">
            <div className='flex justify-between'>
                <h1 className='font-bold mb-4'>{post.title}</h1>
                <div className="flex">
                {
                    post.editEnable === true ?
                        <>
                            {/* <div>수정</div> */}
                            <Link href={`/board/write?id=${post.id}`}>수정</Link>
                            <div className='ml-2'>삭제</div>
                        </>
                    : null
                }
                </div>
            </div>
            <div className='flex mb-2'>
                <p className="text-sm text-gray-500 mb-2">작성자: {post.author}</p>
                <p className="text-sm text-gray-500 mb-4 ml-5">작성일자: {post.date}</p>
            </div>
            <div className="relative mb-4 py-20 border-t-2 border-b-2 border-gray-200">
                <p className='absolute top-0 mt-3'>{post.content}</p>
            </div>
            <h2 className="font-bold mb-2">댓글</h2>
            {post.comments.map((comment, index) => (
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
            ))}

        </div>
    );
};

export default BoardDetailPage;
