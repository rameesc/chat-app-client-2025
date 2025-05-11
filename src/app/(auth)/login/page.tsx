
import React from 'react'
import { LoginForm } from '../components/LoginForm'
import { Metadata } from 'next'

export const metadata:Metadata={
  title:'login'
}
const LoginPage = () => {
  return (
    <div className='centerDiv'>
        <LoginForm/>
    </div>
  )
}

export default LoginPage