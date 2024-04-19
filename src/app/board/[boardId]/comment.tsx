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

const Comment = ({ comment, boardId, commentList}: { comment: CommentProps, boardId: number, commentList:any}) => {

  // 댓글
  const [comments, setComments] = useState<CommentProps|null>(comment);
  
  const [isEdit, setIsEdit] = useState<Boolean>(false);

  const [inputValue, setInputValue] = useState(comment.content); // 초기값을 comment.content로 설정

  // 대댓글
  const [subComments, setSubComments] =  useState<CommentProps[]>([]);
  const [subTotalPages, setSubTotalPages] = useState(0); // 전체 페이지 개수
  const subPageSize = 5; // 한 페이지에 표시할 게시물 개수
  const [subCurrentPage, setSubCurrentPage] = useState<number>(1); // 현재 페이지

  const [subCommentInput, setSubCommentInput] = useState<string | null>(null);

  // 수정
  const handleEdit = () => {
    // 완료일때
    if(isEdit){

      if(window.confirm("수정하시겠습니까?")) {
        setIsEdit(false); 
        axios.patch(USE_BACK_URL+'/post/api/comments/'+ comments?.commentId,{
          content: inputValue,
        }, 
        {
          headers: {
              'Authorization': 'Bearer '+ localStorage.getItem('a'),
              'Content-Type': 'application/json'
          }
        })
        .then( response => {
          
            if(response.status === 200){
              alert("수정되었습니다.");
              setComments(response.data.result.comment);
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
      axios.delete(USE_BACK_URL+'/post/api/comments/'+ comments?.commentId,
      {
        headers: {
            'Authorization': 'Bearer '+ localStorage.getItem('a'),
            'Content-Type': 'application/json'
        }
      })
      .then( response => {
        
          if(response.status === 200){
            alert("삭제되었습니다.");
            commentList();
            
          }
      })
      .catch(error => {
          alert(error.response.data.resultMessage);
      });
    }
  }


  // 대댓글
  useEffect(() => {
    subCommentList();
    
  }, [subCurrentPage]);

  const subCommentList = () => {


    axios.get(USE_BACK_URL+'/post/api/borads/' + boardId + "/comments?commentId=" + comments?.commentId + "&page=" + subCurrentPage + '&size=' + subPageSize, {
      headers: {
        'Authorization': 'Bearer '+ localStorage.getItem('a'),
        'Content-Type': 'application/json'
      }
    })
    .then( response => {
      if(response.status === 200){

        // 기존 대댓글 목록에 새로운 대댓글 목록을 추가
        setSubComments(prevComments => [...prevComments, ...response.data.result.commentList]);
        setSubTotalPages(Math.ceil((response.data.result.totalComment)/subPageSize));

      }
    })
    .catch(error => {
      // router.push("/error");
      console.error(error); // 에러 로깅
    });

  }

  // 대댓글 완료
  const handleCreate = () => {
    
    if(window.confirm("등록하시겠습니까?")) {
      axios.post(USE_BACK_URL+'/post/api/borads/'+ boardId +'/comments',{
          content : subCommentInput,
          parentCommentId : comments?.commentId
      }, 
      {
          headers: {
              'Authorization': 'Bearer '+ localStorage.getItem('a'),
              'Content-Type': 'application/json'
          }
      })
      .then( response => {
        if(response.status === 200){
          setSubCommentInput(null);
          alert("등록되었습니다.");

          setSubComments([]);
          if(subCurrentPage === 1){
            subCommentList()
          }else{
            setSubCurrentPage(1);
          }
         
        }
      })
      .catch(error => {
          alert(error.response.data.resultMessage);
      });
    }  
  }

  // 대댓글 삭제되었을 시 이벤트 감지
  const subCommentDelete = () => {
    setSubComments([]);
    if(subCurrentPage === 1){
      subCommentList()
    }else{
      setSubCurrentPage(1);
    }
  }
  

  // "더보기" 클릭 시 실행될 함수
  const handleLoadMoreSubComments = () => {
    if(subCurrentPage < subTotalPages) {
      setSubCurrentPage(subCurrentPage => subCurrentPage + 1);
    }
  };

  // 좋아요 / 싫어요
  const handleLikeBadClick = (value: string): void => {
        
    axios.post(USE_BACK_URL+'/post/api/comments/'+ comments?.commentId +'/' + value,{}, {
      headers: {
          'Authorization': 'Bearer '+ localStorage.getItem('a'),
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
        <div className='text-sm flex text-gray-800'>
          <p>{comments?.createDate}</p>
          <p className='mx-2'>{comments?.nickname === null ? "무명" : comments?.nickname}</p>
        </div>         
        <div key={comments?.commentId} className="flex justify-between">
          {isEdit ? (
            <div className='flex justify-between w-full'>
                <input 
                    className="border rounded focus:outline-none py-1 px-2 w-full"
                    defaultValue={comments?.content}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                
            </div>
          ) : (
            <>
              <p className='break-all'>{comments?.content}</p>
            </>
          )}
        </div>
        <div className='flex justify-between text-sm'>
          <div className='flex'>
            <div className='mx-2'>
              <div className='flex items-center'>
                {comments?.likeClick === true ? 
                <BiSolidLike  className='cursor-pointer' onClick={() => handleLikeBadClick("like")}/> :
                <BiLike  className='cursor-pointer' onClick={() => handleLikeBadClick("like")}/>
                }
                <div className='ml-1'>{comments?.likeCount}</div>
              </div>
            </div>
            <div>
              <div className='flex items-center'>
                {comments?.badClick === true ? 
                  <BiSolidDislike  className='cursor-pointer' onClick={() => handleLikeBadClick("bad")}/> :
                  <BiDislike  className='cursor-pointer' onClick={() => handleLikeBadClick("bad")}/>
                }
                <div className='ml-1'>{comments?.badCount}</div>
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
              comments?.editEnable === true ?
                  <>
                      <div className='text-sm cursor-pointer' onClick={handleEdit}>수정</div>
                      <div className='ml-2 text-sm cursor-pointer' onClick={handleDelete} >삭제</div>
                  </>
              : null    
          }                            
            </div>
        </div>
      </div>
      <div className='ml-2 flex justify-between items-center'>
        <div>└</div>
        <input 
            className="border rounded focus:outline-none py-1 px-2 w-full ml-2"
            placeholder={localStorage.getItem('u') !== null ? '대댓글을 작성해 주세요.' : '로그인 후 작성이 가능합니다.'}
            value={subCommentInput||""}
            onChange={(e) => setSubCommentInput(e.target.value)}
        />
        {
            localStorage.getItem('u') !== null ?
            <div className='ml-4 whitespace-nowrap w-[30px] cursor-pointer font-bold' onClick={handleCreate}>완료</div> :
            <div className='ml-4 whitespace-nowrap w-[30px] cursor-pointer'></div>
        }
      </div>
      {subComments.map((subComment, subIndex) => ( 
            <div key={subIndex}>
                <div className='ml-2 flex'>
                    <div>└</div>
                    <div className='w-full'>
                      <SubComment key={subIndex} comment={subComment} subCommentDelete={subCommentDelete}/>
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
