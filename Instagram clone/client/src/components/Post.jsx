import DefaultUserImage from '../assets/UserProfile.png'
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";
import Axios from "../axios/Axios";

function Post({post}){
  // console.log(post)
  const user = useSelector((state)=>state.auth.user)

  const likeDislikeHandler = async()=>{
     const post_id = post._id
     const auther_id = post.user[0]._id
     
     if(!post_id || !auther_id){
        return toast.error('post_id and auther_id are require')
     }

     try{

        const response = await Axios.post('/user/like', {post_id,auther_id},{
            headers: {
                'Content-Type': 'application/json'
            }
        })
    console.log(response)
        if(response.data.success){
             
          //return toast.success(response.data.message)
        }

     }catch(error){
        return toast.error(error.response?.message || error.message) 
     }

  }


  let content = ''
   if(post.post){
       const url = post.post.split('.').pop()
   
      if(url == 'mp4' || url == 'MKV' || url == 'MOV' || url == 'AVI' || url == 'WMV' || url == 'WebM'){
          content = (
            <video className="post-image" loading="lazy" controls autoPlay>
              <source src={`http://localhost:3000/${post.post}`} type="video/mp4"/>
            </video>
          )
      }else{
          content = (
          <img src={`http://localhost:3000/${post.post}`} alt="Post" className="post-image" loading="lazy" />
        )
      }
   }
  

    return (
        <article className="post-card">
                <div className="post-header">
                  <div className="post-user">
                    <div className="post-user-avatar-wrap">
                      <img src={post.user?.[0]?.profile_picture ? `http://localhost:3000/${post.user?.[0]?.profile_picture}` : DefaultUserImage} alt="Maya Chen" className="post-user-avatar" />
                      <div className="online-dot"></div>
                    </div>
                    <div>
                      <h3 className="post-user-name">{post.user?.[0]?.username }</h3>
                      <p className="post-user-time">2h ago</p>
                    </div>
                  </div>
                  <button className="post-more-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" data-lucide="more-horizontal" aria-hidden="true" className="lucide lucide-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></button>
                </div>
                <p className="post-content">{post.text}</p>
                {content}
                <div className="post-actions">
                  <div className="post-actions-left">
                    <button className={"action-btn like-btn" + (post.likes.user_id == user._id ? 'liked' : '')} onClick={likeDislikeHandler}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" data-lucide="heart" aria-hidden="true" className="lucide lucide-heart"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path></svg>
                      <span className="like-count">{post.likes_count}</span>
                    </button>
                    {/* <button className="action-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" data-lucide="message-circle" aria-hidden="true" className="lucide lucide-message-circle"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path></svg>
                      <span>{post.comments_count}</span>
                    </button> */}
                  </div>
                  <button className="action-btn save-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" data-lucide="bookmark" aria-hidden="true" className="lucide lucide-bookmark"><path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"></path></svg>
                  </button>
                </div>
              </article>
    )
}

export default Post