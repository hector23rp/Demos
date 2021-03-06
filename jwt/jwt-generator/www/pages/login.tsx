import React from 'react'
import Form from '../form'
import { AuthService } from '../services/auth.service'

const Login: React.FC = () => {
  const authService = new AuthService('/login');

  return (
    <div>
      <h1>Login</h1>
      <Form authService={authService}/>
    </div>
  )
}

export default Login

