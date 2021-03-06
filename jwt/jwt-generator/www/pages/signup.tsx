import React from 'react'
import Form from '../form'
import { AuthService } from '../services/auth.service';

const SignUp: React.FC = () => {
  const authService = new AuthService('/signup');

  return (
    <div>
      <h1>Sign Up</h1>
      <Form authService={authService}/>
    </div>
  )
}

export default SignUp

