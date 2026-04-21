import { Settings, Camera, Image, Video, Smile, MapPin, UserPlus,User} from "lucide-react"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useDispatch,useSelector } from "react-redux"
import { useEffect, useState } from "react";
import DefaultUserImage from '../assets/UserProfile.png'
import Axios from "../axios/Axios";
import Post from '../components/Post'
import Story from '../components/Story'
import Suggetion from '../components/Suggetion'
import StoryViewer from '../components/StoryViewer';
import StoryUploader from "../components/StoryUploader";
import {GetStoryThunk} from '../features/storySlice'
import { View } from '../features/storySlice';
import EmojiPicker from 'emoji-picker-react';
import { toast } from "react-toastify";
import axios from "axios";

function Home(){

    const dispatch = useDispatch()
    const user = useSelector((state)=>state.auth.user)
    const story = useSelector((state)=>state.story.story)
    
    const [postList,setPostList] = useState([])
    const [suggested, setSuggested] = useState([])

    const [isStoryUploaderOpen,setIsStoryUploaderOpen] = useState(false)
    
    
  const GetStories = async()=>{
      dispatch(GetStoryThunk())
  }

  useEffect(()=>{
      GetPost(),
      GetSuggetion()
      GetStories()
  },[setIsStoryUploaderOpen])

    const isOwnerStory = story.some((s)=>(
        s.user_id == user._id
    ))

  
    let OrderedStories;
    if(isOwnerStory){
        OrderedStories = [...story].sort((a,b)=>{
            if(a.user_id === user._id) return -1
            if(b.user_id === user._id) return 1
            return 0 
        })
    }else{
        OrderedStories = [...story]
        OrderedStories.unshift({user})
    }


    const GetPost = async()=>{
        const response = await Axios.get('/user/postlist')
        if(response.data.success){
           setPostList(response.data.data.docs)
        }
    }

    const GetSuggetion = async()=>{
        const response = await Axios.get('/user/suggested')
        if(response.data.success){
           setSuggested(response.data.data)
        } 
    }

    
    const [isActiveStory, setActiveStory] = useState([])
    const [isActiveIndex,setActiveIndex] = useState(0)
    const [StoryIndex,setStoryIndex] = useState(0)
   
    const onOpen = (data,indexOfStories)=>{
      
      setStoryIndex(indexOfStories)
      setActiveStory(data)
      setActiveIndex(0)
      dispatch(View({'story_opacity': 1, 'display': 'none', 'eventPointer' : 'all'}))
      }
 
  
    const nextStory = ()=>{

          if(isActiveIndex < isActiveStory.stories.length -1){
              setActiveIndex((prev)=>{ return prev + 1 })
          }else{
              
              if(OrderedStories.length - 1 > StoryIndex){
                  setActiveIndex(0)
                  setStoryIndex((prev)=>{ 
          
                  const newIndex = prev + 1
                  setActiveStory(OrderedStories[newIndex])
                  return newIndex

              })
            }else{
              CloseHandler()
            }
        } 
    }

  const prevStory = ()=>{

        if(isActiveIndex > 0){
          setActiveIndex((prev)=>{ return prev  - 1 })
        }else{
              
                if(StoryIndex > 0){
                  setStoryIndex((prev)=>{ 
                    const newIndex = prev - 1

                    if(OrderedStories[newIndex].stories == undefined){
                        CloseHandler()
                    }

                    setActiveStory(OrderedStories[newIndex])
                    setActiveIndex(0)
                    return newIndex
                  })
                }else{
                  CloseHandler()
                }
                
          }  
  }

  const StoryUploadHandler = ()=>{
      setIsStoryUploaderOpen(!isStoryUploaderOpen)
  }

  const CloseHandler = ()=>{
        dispatch(View({'story_opacity': 0, 'display': 'block', 'eventPointer' : 'none'}))
        setActiveStory([])
  }

  const [file,setFile] = useState(null)
  const [text,setText] = useState(null)
  const [preview,setPreview] = useState(null)

  const PostUploadPreviewHandler = (e)=>{
      const file = e.target.files[0]
      if(file){
        setFile(file)
        setPreview(URL.createObjectURL(file))
      }
  } 

  const PostUploadHandler = async()=>{

    if(!file && !text){
      toast.error('image/video or text required')
    }

    const formData = new FormData();
    formData.append("post", file);

    try{
      const response = await Axios.post('/user/post_upload', formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
      })

      if(response.data.success){
        setFile(null)
        setText(null)
        setPreview(null)
        toast.success(response.data.message)
      }

    }catch(error){
       return toast.error(error.response?.data || error.message)
    }

  }

  return (
      
    <div className="main-container">
    <div className="layout-grid">
      
      <div className="sidebar-left">
        <aside className="profile-card">
          <div className="profile-banner"><button><Camera size={14} /></button></div>
          <div className="profile-avatar-wrap">
            <img src={user.profile_picture ? `http://localhost:3000/${user?.profile_picture}` :  `http://localhost:5173${DefaultUserImage}`} alt="Alex Morgan" className="profile-avatar" />
            <div className="profile-online-dot"></div>
          </div>
          <div className="profile-info"> 
            <div className="name-row">
              <div>
                <h2>{user.fullname}</h2>
                <p className="username">@{user.username}</p>
              </div>
              <button className="settings-btn"><Settings size={16} /></button>
            </div>
            <p className="bio">{user.bio}</p>
            <div className="profile-stats">
              <div className="stat"><p className="stat-value">{user.post_count}</p><p className="stat-label">Posts</p></div>
              <div className="stat"><p className="stat-value">{user.followes}</p><p className="stat-label">Followers</p></div>
              <div className="stat"><p className="stat-value">{user.following}</p><p className="stat-label">Following</p></div>
            </div>
          </div>
        </aside>
      </div>
      
    <div className="feed">
      {
       isStoryUploaderOpen ? <StoryUploader StoryUploadHandler={StoryUploadHandler} /> : ``
      }
    <div className="stories-bar">
      <Swiper
        spaceBetween={10}
        slidesPerView={6}
        freeMode={true}         
        className="stories-bar-inner"
      >
          {
            OrderedStories?.map((item,index)=>(
              <SwiperSlide>
                <Story key={item._id} data={item} indexOfStories={index}  onOpen={onOpen} StoryUploadHandler={StoryUploadHandler} />
              </SwiperSlide>
            ))
          }
  <StoryViewer story={isActiveStory} index={isActiveIndex} next={nextStory} prev={prevStory} onClose={CloseHandler} />
</Swiper>
    </div> 
        <div className="create-post">
          <div className="create-post-inner">

            <img src={user?.profile_picture ? `http://localhost:3000/${user.profile_picture}` : `http://localhost:5173${DefaultUserImage}`} alt="You" className="create-post-avatar" />
            <div className="create-post-body">
              <textarea placeholder="What's on your mind?" rows="2" onChange={(e)=>{ setText(e.target.value) }}>{text}</textarea>
              <div className="create-post-actions">
                <div className="create-post-icons">
                  <button className="icon-primary" onClick={()=> document.getElementById('UploadPost').click()}><Image /></button>
                  <button className="icon-accent" onClick={()=> document.getElementById('UploadPost').click()}><Video /></button>
                </div>
                <input type="file" id="UploadPost" style={{'display':'none'}} onChange={PostUploadPreviewHandler}/>
                <div>
                  <button className="btn-cancel" style={{'marginRight':'20px'}} onClick={()=>{ setFile(null),setPreview(null) }}>Cancel</button>
                  <button className="btn-post" onClick={PostUploadHandler} >Post</button>
                </div>
              </div>
              {preview ? (<img alt="Post" className="post-image" loading="lazy" src={preview}></img>):('') }
              
            </div>
          </div>
        </div>
        
      <div id="postsContainer">
        {
          postList.map((item,index)=>(
              <Post key={index} post={item.post}/>
          ))
        }
      </div>
    </div>
      
      <div className="sidebar-right">
        <div className="sidebar-section">
          <div className="sidebar-section-header">
            <UserPlus />
            <h2>Suggested for you</h2> 
          </div>
          <div className="suggested-list" id="suggestedList">
        
        {
          suggested.map((item)=>(
            <Suggetion key={item._id} users={item} />
          ))
        }
         
    
      </div>
        </div>
        <p className="footer-text">© 2026 SocialVibe · Privacy · Terms · About</p>
      </div>
    </div>
  </div>
    )
}

export default Home