import React from 'react'
import { RegisterForm } from '../components/RegisterForm'
import { Metadata } from 'next'

export const metadata:Metadata={
  title:'register'
}
const RegisterPage = () => {
  return (
    <div className='centerDiv'>
        <RegisterForm/>
    </div>
  )
}

export default RegisterPage