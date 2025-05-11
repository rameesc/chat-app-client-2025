

import React from 'react'
import { ForgetPasswordForm } from '../components/ForgetPasswordForm'
import { Metadata } from 'next'
export const metadata:Metadata={
  title:'forget password'
}
const ForgetPasswordPage = () => {
  return (
    <div className='centerDiv'>
        <ForgetPasswordForm/>
    </div>
  )
}

export default ForgetPasswordPage