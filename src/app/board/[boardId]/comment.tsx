import React, { useState } from 'react';

interface CommentProps {
  id: number,
  content: string,
  date: string
}

const Comment = ({ comment }: { comment: CommentProps }) => {
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

  return (
    <>
    <div className='ml-4 mb-2'>
      <div key={comment.id} className="flex justify-between">
        
        {isEdit ? (
            <div className='flex justify-between w-full'>
                <input 
                    className="border rounded focus:outline-none py-1 px-2 w-[80%]"
                    defaultValue={comment.content}
                />
                <div onClick={handleEdit}>완료</div>
            </div>
        ) : (
            <>
                <p>{comment.content}</p>
                <div className="flex">
                    <div onClick={handleEdit}>수정</div>
                    <div onClick={handleDelete} className='ml-2'>삭제</div>
                </div>
            </>
        )}
      </div>
      <div className='flex text-sm'>
        <p>{comment.date}</p>
        <div className='mx-3'>좋아요</div>
        <div>싫어요</div>
      </div>
      </div>
    </>
  );
};

export default Comment;
