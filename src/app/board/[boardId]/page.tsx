"use client"
import React, { useState } from 'react'
import Comment from './comment';


interface Params {
    boardId?: Number
}

interface CommentProps {
    id: number,
    content: string,
    date: string,
    comments: CommentProps[] 
}
  
interface PostProps {
    title: string,
    author: string,
    date: string,
    content: string,
    comments: CommentProps[]
}

const BoardDetailPage = ({ params }: { params: { boardId: number } }) => {
    const [editIndex, setEditIndex] = useState(null);

    console.log(params.boardId);

    // 가상의 데이터를 사용하여 게시물 정보를 표시
    const post: PostProps = {
        title: '안녕하세요',
        author: '홍길동',
        date: '2024.03.04',
        content: '동해물과 백두산이',
        comments: [
            {
                id: 1,
                content: '댓글 1',
                date: '2024.03.04',
                comments: [
                    { id: 1, content: '대댓글 1', date: '2024.03.04', comments:[] },
                    { id: 2, content: '대댓글 2', date: '2024.03.04', comments:[] }
                ]
            },
            {
                id: 2,
                content: '댓글 2',
                date: '2024.03.04',
                comments: [
                    { id: 3, content: '대댓글 3', date: '2024.03.04', comments:[] },
                ]
            }
        ]
    };

    return (
        <div className="max-w-3xl mx-auto p-8">
            <div className='flex justify-between'>
                <h1 className='font-bold mb-4'>{post.title}</h1>
                <div className="flex">
                    <div>수정</div>
                    <div className='ml-2'>삭제</div>
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
                <>
                    <Comment key={index} comment={comment} />
                    {comment.comments.map((comment, index) => ( 
                        <>
                            <div className='ml-3'>
                                <Comment key={index} comment={comment} />
                            </div>
                        </>
                    ))}
                </>
            ))}

        </div>
    );
};

export default BoardDetailPage;
