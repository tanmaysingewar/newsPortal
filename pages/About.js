import React,{useEffect} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { isAuthincated } from '../helper/auth'
import { useRouter } from 'next/router';


function About() {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthincated()) {
         router.push('/login')
    }
  }, [])
  
  return (
    <>
        <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap" rel="stylesheet" />
        </Head>
            <ul>
                  <li>
                    <Link href="/login">
                      <a style={{backgroundColor : "red"}} >Log Out</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/About">
                      <a className='active'>About</a>
                    </Link>    
                  </li>
                  <li>
                    <Link href="/Contact">
                      <a >Help</a>
                    </Link> 
                   </li>
                  <li>
                    <Link href="/Profile">
                      <a >Profile</a>
                    </Link> 
                  </li>
                  <li>
                    <Link href="/createPost">
                      <a>Create Post</a>
                    </Link></li>
                  <li>
                    <Link href="/">
                      <a >Home</a>
                    </Link>
                  </li>
              </ul>
        <p style={{fontSize : 50, fontFamily : "Poppins",fontWeight : "500", whiteSpace: 'pre-line', lineHeight : 1, marginLeft : 30, color : "#fff",textAlign : "center"}} >
                    {'About'}
        </p>
    </>
  )
}

export default About