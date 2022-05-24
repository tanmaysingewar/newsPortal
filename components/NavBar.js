import React from 'react'
import Link from 'next/link'

function NavBar() {
  return (
    <div>
        <ul>
                <li>
                    <Link href="/">
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
                        <a >Create Post</a>
                    </Link>    
                </li>
                <li>
                    <Link href="/">
                        <a >Home</a>
                    </Link>    
                </li>
        </ul>
    </div>
  )
}

export default NavBar