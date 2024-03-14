"use client"
import React, { useEffect, useState } from 'react'
import {USE_BACK_URL} from '../../../../constants'
import axios from 'axios';
import {useRouter} from 'next/navigation'
import SubComment from './subComment';
import { BiLike  } from "react-icons/bi";
import { BiDislike  } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";


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

const Comment = ({ comment, boardId}: { comment: CommentProps, boardId: number}) => {

  // 댓글
  const [comments, setComments] = useState<CommentProps>(comment);
  
  const [isEdit, setIsEdit] = useState<Boolean>(false);

  // 대댓글
  const [subComments, setSubComments] =  useState<CommentProps[]>([]);
  const [subTotalPages, setSubTotalPages] = useState(0); // 전체 페이지 개수
  const subPage = 2; // 한 페이지에 표시할 게시물 개수
  const [subCurrentPage, setSubCurrentPage] = useState<number>(1); // 현재 페이지

  // 수정
  const handleEdit = () => {
    // 완료일때
    if(isEdit){
      setIsEdit(false);
      alert("수정되었습니다.");
    }
    // 수정일때
    else{
      setIsEdit(true);
    }
  }

  // 삭제
  const handleDelete = () => {
    if(window.confirm("정말로 삭제하시겠습니까?")) {
      alert("삭제되었습니다.");
    }
  }


  // 대댓글
  useEffect(() => {
    // currentPage가 변경될 때마다 실행될 comment 함수 호출
    
    axios.get(USE_BACK_URL+'/post/api/borads/' + boardId + "/comments?commentId=" + comments?.commentId + "&page=" + subCurrentPage, {
        headers: {
            'Authorization': 'Bearer '+ sessionStorage.getItem('k'),
            'Content-Type': 'application/json'
        }
    })
    .then( response => {
        if(response.status === 200){
          
           // 기존 대댓글 목록에 새로운 대댓글 목록을 추가
            setSubComments(prevComments => [...prevComments, ...response.data.result.commentList]);
            setSubTotalPages(Math.ceil((response.data.result.totalComment)/subPage));

        }
      })
      .catch(error => {
          // router.push("/error");
          console.error(error); // 에러 로깅
      });
  }, [subCurrentPage]);

  // "더보기" 클릭 시 실행될 함수
  const handleLoadMoreSubComments = () => {
    if(subCurrentPage < subTotalPages) {
      setSubCurrentPage(subCurrentPage => subCurrentPage + 1);
    }
  };

  const handleLikeBadClick = (value: string): void => {
        
    axios.post(USE_BACK_URL+'/post/api/comments/'+ comments.commentId +'/' + value,{}, {
        headers: {
            'Authorization': 'Bearer '+ sessionStorage.getItem('k'),
            'Content-Type': 'application/json'
        }
    })
    .then( response => {
      
        if(response.status === 200){
          setComments(response.data.result.comment);
        }
    })
    .catch(error => {
        
        alert(error.response.data.resultMessage);
    });
  }
    

  return (
    <>
      <div className='ml-4 mb-2 mt-3'>
        <div key={comments.commentId} className="flex justify-between">
          {isEdit ? (
            <div className='flex justify-between w-full'>
                <input 
                    className="border rounded focus:outline-none py-1 px-2 w-[80%]"
                    defaultValue={comments.content}
                />
                <div className='cursor-pointer text-sm' onClick={handleEdit}>완료</div>
            </div>
          ) : (
            <>
                <p>{comments.content}</p>
                <div className="flex">
                {
                    comments.editEnable === true ?
                        <>
                            <div className='text-sm cursor-pointer' onClick={handleEdit}>수정</div>
                            <div className='ml-2 text-sm cursor-pointer' onClick={handleDelete} >삭제</div>
                        </>
                    : null
                }                         
                </div>
            </>
          )}
        </div>
        <div className='flex text-sm'>
          <p>{comments.createDate}</p>
          <p className='mx-3'>{comments.nickname}</p>
          <div className='mx-3'>
            <div className='flex items-center'>
              {comments.likeClick === true ? 
               <BiSolidLike  className='cursor-pointer' onClick={() => handleLikeBadClick("like")}/> :
               <BiLike  className='cursor-pointer' onClick={() => handleLikeBadClick("like")}/>
              }
              <div className='ml-1'>{comments.likeCount}</div>
            </div>
          </div>
          <div>
            <div className='flex items-center'>
              {comments.badClick === true ? 
                <BiSolidDislike  className='cursor-pointer' onClick={() => handleLikeBadClick("bad")}/> :
                <BiDislike  className='cursor-pointer' onClick={() => handleLikeBadClick("bad")}/>
              }
              <div className='ml-1'>{comments.badCount}</div>
            </div>
          </div>
        </div>
      </div>
      {subComments.map((subComment, subIndex) => ( 
            <div key={subIndex}>
                <div className='ml-2 flex'>
                    <div>└</div>
                    <div className='w-full'>
                        <SubComment key={subIndex} comment={subComment}/>
                    </div>
                </div>
            </div>
        ))}
      {/* 대댓글이 더 있을 경우 "더보기" 버튼 표시 */}
      {subTotalPages > subCurrentPage && (
        <div className="ml-10">
          <div
            className=" text-black font-bold rounded cursor-pointer"
            onClick={handleLoadMoreSubComments}
          >
            댓글 더보기
          </div>
        </div>
      )}
    </>
  );
};

export default Comment;
