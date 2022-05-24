import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import NavBar from '../../components/NavBar';
import { deletPost, isAuthincated, postComment } from '../../helper/auth'
import { useRouter } from 'next/router'
import { GetAllPost, getPost } from '../../helper/fetchData';
import { API } from '../../backend';
import Image from 'next/image';


function fullPage({post}) {

  const postData = post.post

  const {user} = isAuthincated()

  const router = useRouter()
    const [x, setx] = useState('')
    const [data, setData] = useState('')

    const handleChang = (name) => event =>{
    setData({...data, [name]: event.target.value})
    }

    const onCommentSubmit = (e) => {
        postComment({comment : data.comment, name : user.firstName, id: postData._id}) 
        .then(res => {
            console.log(res);
            if(res.success){
                setData({...data, comment : ''})
            }
        })
    }

    const onDelete = () => {
        if(window.confirm('Are you sure you want to delete this post?')){
          deletPost(postData._id)
            .then(res => {
                console.log(res);
                if(res.status){
                    return router.push('/')
                }
            })
        }
    }

  return (
    <div>
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
          z</div>
        <div style={{ padding : 15,backgroundColor : "#202022", marginRight : 10, paddingBottom : 40,paddingLeft : 20, maxWidth : "41%",height : 350, borderRadius : 5,color : "#fff",margin : "auto",marginTop : 50 }}> 
          <div style={{float : "right"}}>
            <Image src={require("../../images/delete35.png")} style={{width : 20, height : 20, borderRadius : 50, marginRight : 10}} onClick={() => onDelete()}/>
          </div>       
          <p style={{fontSize : 18, fontWeight : 500}}>{postData.title}</p>
           
            <p style={{fontSize : 12, fontWeight : 300, marginTop : -15}}>{postData.date}</p>
                <p style={{fontSize : 12, fontWeight : 300, maxHeight : 150,minHeight : 150, overflow : "scroll",overflowX: "hidden",color : "#fff"}}>
                {postData.news}
                </p>
            <p style={{fontSize : 12, fontWeight : 500}}>See Comments</p>
            <div style={{marginTop : 20}}>
                <input 
                    style={{backgroundColor : "#686868bf",
                        border : "none",
                        outline : "none",
                        color : "white",
                        width : "75%",
                        padding : "10px",
                        marginBottom : "10px",
                        borderRadius : "5px",
                        float : "left"
                        }}
                    placeholder={"Title of the news"} 
                    onChange={handleChang('comment')}
                    value={data.comment}
                />    
                <button style={{padding : 10, backgroundColor : "black",border : "none",borderRadius : 5,cursor : "pointer", marginLeft : 20}} onClick={() => onCommentSubmit()}><span style={{color : "white"}}>Send</span></button>
            </div>
            <div style={{marginTop : 50}}>
              <div>
                <p>Comments ~</p>
              </div>
                {
                  postData.comments.map((comment, index) => (
                    <div key={index} style={{marginTop : 10}}>
                     <div>
                        <p style={{fontWeight : 600}}>{`@${comment.name}`}</p>
                        <p style={{fontWeight : 200, fontSize : 14, lineHeight : 0.2}}>{comment.comment}</p>
                      </div>
                    </div>
                  ))
                }
            </div>
        </div>
       

    </div>
  )
}

export default fullPage

export async function getStaticPaths(){
  const res = await fetch(`${API}/post/all`)
  const data = await res.json()

  const paths = data.post.map(post => {
      return {params :{
          postId : `${post._id}`
      }}
  })
  return {
      paths,
      fallback : false
  }
}


export async function getStaticProps(context){
  const {params} = context;
  const res = await fetch(`${API}/post?p_id=${params.postId}`)
  const data = await res.json()

  return{
      props :{
          post : data,
      }
  }
}