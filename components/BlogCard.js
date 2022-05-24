import React,{useState} from 'react'
import { isAuthincated, postComment } from '../helper/auth';
import Link from 'next/link'

function BlogCard({title,name, date, news, id}) {
    const {user} = isAuthincated()
    const [data, setData] = useState('')

    const handleChang = (name) => event =>{
    setData({...data, [name]: event.target.value})
    }

    const onCommentSubmit = (e) => {
        postComment({comment : data.comment, name : user.firstName, id: id})
        .then(res => {
            console.log(res);
            if(res.success){
                setData({...data, comment : ''})
            }
        })
    }

    return (
        <>
        <div style={{margin : 10, padding : 15,backgroundColor : "#202022", marginRight : 10, paddingBottom : 40,paddingLeft : 20, maxWidth : "31%",height : 350, borderRadius : 5, marginTop : 10, float : "left",color : "#fff"}}>    
            <p style={{fontSize : 18, fontWeight : 500,}}>{title}</p>
            <p style={{fontSize : 12, fontWeight : 300, marginTop : -10}}>{date}</p>
            <p style={{fontSize : 12, fontWeight : 700, marginTop : -10}}>{name}</p>
                <p style={{fontSize : 12, fontWeight : 300, maxHeight : 150,minHeight : 120,overflow : "scroll",overflowX: "hidden",color : "#fff"}}>
                {news}
                </p>
                <Link 
                    href={{
                        pathname: `/fullpost/${id}`,
                    }}
                    >
                <p style={{fontSize : 12, fontWeight : 500}}>See Comments</p>
                    </Link>    
            
            <div style={{marginTop : 0}}>
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
        </div>
        </>
    )
}

export default BlogCard
