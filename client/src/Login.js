import React from 'react'
import {Container} from 'react-bootstrap'

const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectUri = process.env.REACT_APP_REDIRECT_URI;
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;
console.log(AUTH_URL);

export default function Login() {
  return <Container 
  className='d-flex justify-content-center align-items-center' 
  style={{minHeight: '100vh'}}>
    <a className='btn btn-success btn-lg' href={AUTH_URL}>Login With Spotify</a>
  </Container>
}
