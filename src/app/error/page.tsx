import React from 'react'
import Link from 'next/link';
const ErrorPage = () => {
  return (
    <div className='flex justify-center'>
      <div>
        <div className='mb-5'>오류가 발생했습니다.</div>
        <Link href={"/"}>
          <div className='text-center font-bold'>메인으로 이동</div>
        </Link>
      </div>
    </div>
  )
}

export default ErrorPage