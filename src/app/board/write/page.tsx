import React from 'react'

const Write = () => {
    return (
        <>
            <div className="max-w-3xl mx-auto p-8 h-[60vh]">
                <div className='flex justify-end mt-3'>
                    <div>작성</div>
                </div>
                <div className='flex justify-between mb-3'>
                    <input className="focus:outline-none py-1 px-2" placeholder="제목을 입력해 주세요." />
                </div>
                <div className="relative h-full">
                    <textarea className="absolute top-0 border-t-2 border-b-2 border-gray-200 resize-none focus:outline-none w-full h-full p-3" placeholder="내용을 입력해 주세요."/>
                </div>
            </div>
            
        </>
    );
}

export default Write;