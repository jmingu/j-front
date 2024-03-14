"use client"
import React, {useState } from 'react'
import {USE_BACK_URL} from '../../../../constants'
import axios from 'axios';
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

const SubComment = ({ comment}: { comment: CommentProps}) => {

  // 대댓글
  const [subComments, setSubComments] = useState<CommentProps>(comment);

  const [isEdit, setIsEdit] = useState<Boolean>(false);

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

  const handleLikeBadClick = (value: string): void => {
        
    axios.post(USE_BACK_URL+'/post/api/comments/'+ subComments.commentId +'/' + value,{}, {
        headers: {
            'Authorization': 'Bearer '+ sessionStorage.getItem('k'),
            'Content-Type': 'application/json'
        }
    })
    .then( response => {
      if(response.status === 200){
        setSubComments(response.data.result.comment);
      }
    })
    .catch(error => {
       
        alert(error.response.data.resultMessage);
    });
  }



  return (
    <>
      <div className='ml-4 mb-1'>
        <div key={subComments.commentId} className="flex justify-between">
          {isEdit ? (
            <div className='flex justify-between w-full'>
                <input 
                    className="border rounded focus:outline-none py-1 px-2 w-[80%]"
                    defaultValue={subComments.content}
                />
                <div className='cursor-pointer text-sm' onClick={handleEdit}>완료</div>
            </div>
          ) : (
            <>
                <p>{subComments.content}</p>
                <div className="flex">
                {
                    subComments.editEnable === true ?
                        <>
                            <div className='text-sm cursor-pointer' onClick={handleEdit}>수정</div>
                            <div className='ml-2 text-sm cursor-pointer' onClick={handleDelete}>삭제</div>
                        </>
                    : null
                }                         
                </div>
            </>
          )}
        </div>
        <div className='flex text-sm'>
          <p>{subComments.createDate}</p>
          <p className='mx-3'>{subComments.nickname}</p>
          <div className='mx-3'>
            <div className='flex items-center'>
              {subComments.likeClick === true ? 
                <BiSolidLike  className='cursor-pointer' onClick={() => handleLikeBadClick("like")}/> :
                <BiLike  className='cursor-pointer' onClick={() => handleLikeBadClick("like")}/>
              }
              <div className='ml-1'>{subComments.likeCount}</div>
            </div>
          </div>
          <div>
            <div className='flex items-center'>
              {subComments.badClick === true ? 
                <BiSolidDislike  className='cursor-pointer' onClick={() => handleLikeBadClick("bad")}/> :
                <BiDislike  className='cursor-pointer' onClick={() => handleLikeBadClick("bad")}/>
              }
              <div className='ml-1'>{subComments.badCount}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubComment;
