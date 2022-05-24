
import { API } from '../backend';
import { isAuthincated } from '../helper/auth';

const {user} = isAuthincated()

export const GetAllPost = () => {
    return fetch(`${API}/post/all`,{ // calling route 
        method: "GET", // defining method to request
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
        }
      })
      .then(res =>{
        return res.json()
      })
      .catch((e) => console.log(e))
}

export const createPost = ({data}) =>{
  return fetch(`${API}/post/create`,{ // calling route 
    method: "POST", // defining method to request
    headers:{
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({...data,name : `${user.firstName} ${user.lastName}`}) // data which is to be send to server
  })
  .then(res =>{
    return res.json()
  })
  .catch((e) => console.log(e))
}

export const loginUser = ({data}) =>{
  return fetch(`${API}/login`,{ // calling route 
    method: "POST", // defining method to request
    headers:{
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data) // data which is to be send to server
  })
  .then(res =>{
    return res.json()
  })
  .catch((e) => console.log(e))
}

export const getUser = () =>{
  if (typeof window == 'undefined') {
    return false
  }
  if (localStorage.getItem('login_user')) {
    return JSON.parse(localStorage.getItem('login_user'))
  }else{
    return false
  }
}

export const getPost = (id) =>{
  console.log(id,"_id")
  return fetch(`${API}/post?p_id=${id}`,{ // calling route 
    method: "GET", // defining method to request
    headers:{
        Accept: "application/json",
        "Content-Type": "application/json",
    }
  })
  .then(res =>{
    return res.json()
  })
  .catch((e) => console.log(e))
}
