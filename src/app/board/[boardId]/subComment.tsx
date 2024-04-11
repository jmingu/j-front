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

const SubComment = ({comment, subCommentDelete}: {comment: CommentProps, subCommentDelete:any}) => {

  // 대댓글
  const [subComments, setSubComments] = useState<CommentProps>(comment);

  const [inputValue, setInputValue] = useState(comment.content); // 초기값을 comment.content로 설정

  const [isEdit, setIsEdit] = useState<Boolean>(false);

  // 수정
  const handleEdit = () => {
    // 완료일때
    if(isEdit){
      if(window.confirm("수정하시겠습니까?")) {
        setIsEdit(false); 
        axios.patch(USE_BACK_URL+'/post/api/comments/'+ subComments.commentId,{
          content: inputValue,
        }, 
        {
          headers: {
              'Authorization': 'Bearer '+ sessionStorage.getItem('a'),
              'Content-Type': 'application/json'
          }
        })
        .then( response => {
          
            if(response.status === 200){
              console.log(response.data.result.comment);
              alert("수정되었습니다.");
              setSubComments(response.data.result.comment);
              
            }
        })
        .catch(error => {
            alert(error.response.data.resultMessage);
        });
      }
    }
    // 수정일때
    else{
      setIsEdit(true);
    }
  }
  // 취소
  const handleCancle = () => {
    setIsEdit(false);
  }

  // 삭제
  const handleDelete = () => {

    if(window.confirm("삭제하시겠습니까?")) {
      setIsEdit(false); 
      axios.delete(USE_BACK_URL+'/post/api/comments/'+ subComments?.commentId,
      {
        headers: {
            'Authorization': 'Bearer '+ sessionStorage.getItem('a'),
            'Content-Type': 'application/json'
        }
      })
      .then( response => {
        
          if(response.status === 200){
            alert("삭제되었습니다.");
            subCommentDelete(); // 삭제감지
            
          }
      })
      .catch(error => {
          alert(error.response.data.resultMessage);
      });
    }
  }

  const handleLikeBadClick = (value: string): void => {
        
    axios.post(USE_BACK_URL+'/post/api/comments/'+ subComments.commentId +'/' + value,{}, {
        headers: {
            'Authorization': 'Bearer '+ sessionStorage.getItem('a'),
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
        <div className='text-sm flex text-gray-800'>
          <p>{subComments.createDate}</p>
          <p className='mx-2'>{subComments.nickname}</p>
        </div>
        <div key={subComments.commentId} className="flex justify-between">
          {isEdit ? (
            <div className='w-full'>
                <input 
                    className="border rounded focus:outline-none py-1 px-2 w-full"
                    defaultValue={subComments.content}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </div>
          ) : (
            <>
              <p className='break-all'>{subComments.content}</p>
            </>
          )}
        </div>
        <div className='flex justify-between text-sm'>
          <div className='flex'>
            <div className='mx-2'>
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
          <div className="flex">
            {
              isEdit ? 
              <>
                <div className='cursor-pointer text-sm' onClick={handleEdit}>완료</div>
                <div className='ml-2 cursor-pointer text-sm' onClick={handleCancle}>취소</div>
              </>:
              subComments.editEnable === true ?
                <>
                    <div className='text-sm cursor-pointer' onClick={handleEdit}>수정</div>
                    <div className='ml-2 text-sm cursor-pointer' onClick={handleDelete}>삭제</div>
                </>
              : null
            }                         
          </div>
        </div>
      </div>
    </>
  );
};

export default SubComment;
