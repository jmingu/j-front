"use client"
import React from 'react';
import { useRouter } from 'next/router';



interface Params {
boardId?: Number
}
const BoardDetailPage = ({Params}:{Params: Params}) => {
    alert(Params)

    // 가상의 데이터를 사용하여 게시물 정보를 표시
    const post = {
        title: '게시물 제목',
        author: '작성자',
        date: '작성일자',
        content: '게시물 내용',
        comments: [
            {
                id: 1,
                content: '댓글 1',
                replies: [
                    { id: 1, content: '대댓글 1' },
                    { id: 2, content: '대댓글 2' }
                ]
            },
            {
                id: 2,
                content: '댓글 2',
                replies: [
                    { id: 3, content: '대댓글 3' }
                ]
            }
        ]
    };

    return (
        <div>
        <h1>{post.title}</h1>
        <p>작성자: {post.author}</p>
        <p>작성일자: {post.date}</p>
        <p>{post.content}</p>

        <h2>댓글</h2>
        {post.comments.map(comment => (
            <div key={comment.id}>
            <p>{comment.content}</p>

            {comment.replies.map(reply => (
                <div key={reply.id} style={{ marginLeft: '1rem' }}>
                <p>{reply.content}</p>
                </div>
            ))}
            </div>
        ))}
        </div>
    );
};

export default BoardDetailPage;
