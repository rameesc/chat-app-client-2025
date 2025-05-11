import React from 'react'
import { ResetPasswordForm } from '../components/ResetPasswordForm'
import { Metadata } from 'next'

export const metadata:Metadata={
  title:'reset password'
}
const ResetPasswordPage = () => {
  return (
    <div className='centerDiv'>
        <ResetPasswordForm/>
    </div>
  )
}

export default ResetPasswordPage