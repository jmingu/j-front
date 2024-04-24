"use client"
import React, {useState } from 'react'
import {commonAxios} from '../../common/commonAxios';
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

        const fetchData = async () => {
          const result:any = await commonAxios("patch",'/post/api/comments/'+ subComments.commentId, {
            content: inputValue
          }, "alert");
          return result; // 결과를 반환
        };

        fetchData().then(response => {
          alert("수정되었습니다.");
          setSubComments(response.data.result.comment);
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

      const fetchData = async () => {
        const result:any = await commonAxios("delete",'/post/api/comments/'+ subComments?.commentId, null, "alert");
        return result; // 결과를 반환
      };

      fetchData().then(response => {
        alert("삭제되었습니다.");
        subCommentDelete(); // 삭제감지
      });
    }
  }

  const handleLikeBadClick = (value: string): void => {

    const fetchData = async () => {
      const result:any = await commonAxios("post",'/post/api/comments/'+ subComments.commentId +'/' + value, {}, "alert");
      return result; // 결과를 반환
    };

    fetchData().then(response => {
      setSubComments(response.data.result.comment);
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