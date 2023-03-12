// import Head from 'next/head'
// import Image from 'next/image'
// import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'

// const inter = Inter({ subsets: ['latin'] })
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e, email, username, password) => {
    e.preventDefault()

    axios.post('http://localhost:3001/signup', {user: {email: email, username: username, password: password}})
    .then(response => {
      if (response.data.errors) {
        setError(response.data.errors)
      }
      else {
        setError('')
        localStorage.setItem('token', response.data.jwt)
      }
    })
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={e => handleSubmit(e, email, username, password)}>
        <input type='text' placeholder='Username' onChange={e => setUsername(e.target.value)}  />
        <input type='text' placeholder='Enter email' onChange={e => setEmail(e.target.value)}  />
        <input type='password' placeholder='Enter password' onChange={e => setPassword(e.target.value)}  />
        <input type='submit' />
      </form>
    </div>
  )
}
