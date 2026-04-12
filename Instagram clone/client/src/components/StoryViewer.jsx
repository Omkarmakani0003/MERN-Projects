import { ChevronLeft, ChevronRight, Trash2, Send, X } from "lucide-react"
import DefaultUserImage from '../assets/UserProfile.png'
import { useSelector,useDispatch } from "react-redux"
import { DeleteStoryThunk, GetStoryThunk, View } from '../features/storySlice';
import { useEffect, useState } from "react";
import { toast } from "react-toastify"
import Axios from "../axios/Axios";

function StoryViewer({story,next,prev,index,onClose}){

  // console.log(story)
    const dispatch = useDispatch()
    const view = useSelector((state)=>state.story)
    const user = useSelector((state)=>state.auth.user)
    const [progress,setProgress] = useState(0)


    const deleteStoryhandler = async()=>{
      const stories_id = story._id
      const story_id= story.stories[index]._id

     if(!stories_id || !story_id){
        toast.error('Something went wrong')
        return false
     }

     const data = {
        stories_id,
        story_id
     }

     try{
        const response = await dispatch(DeleteStoryThunk(data))
        console.log(response)
        dispatch(GetStoryThunk())
        toast.success(response.payload.message)
        onClose()
     }catch(error){
       toast.error(error.message)
     }

  }


   let content = ''
   let duration = 0
   
   if(story?.stories?.length > 0){

      const url = story?.stories[index].story_url.split('.').pop()
      
      if(url == 'mp4' || url == 'MKV' || url == 'MOV' || url == 'AVI' || url == 'WMV' || url == 'WebM'){
          content = (
            <video className="story-viewer-img" loading="lazy" controls autoPlay>
              <source src={`http://localhost:3000/${story?.stories[index]?.story_url}`} type="video/mp4"/>
            </video>
          )

          duration = 15000
        
      }else{
          content = (
          <img src={`http://localhost:3000/${story?.stories[index]?.story_url}`} alt="Post" className="story-viewer-img" loading="lazy" />
        )
        duration = 7000
      }
    }

     useEffect(() => {

      if (!story?.stories) return;
      setProgress(0)
      const timeout = setTimeout(() => {
        setProgress(100)
      },50)
        
      const interval = setInterval(() => {
        setProgress(0)
        next();
      }, duration);

      return () =>{  
        clearInterval(interval);
        clearTimeout(timeout);
        setProgress(0)
      }
     }, [story, index]); 

    return(
        <div className="story-viewer-overlay" id="storyViewer" style={{"opacity":view.storyOpacity ,"pointerEvents": view.eventPointer}}>
          
             
                <button className="story-arrow story-arrow-prev" id="storyArrowPrev" onClick={()=>{ prev() }}><ChevronLeft  /></button>
                <div className="story-viewer">
                <div className="story-progress-bar" id="storyProgressBar">
                    {
                       story?.stories?.map((item,i)=>(
                            <div key={item._id} className="story-progress-seg">
                                <div key={item._id} className="story-progress-fill" style={i == index?{'transition':`width ${duration}ms linear`,'width': `${progress}%`} : i < index? {'width':'100%'} : {'width':'0%'}}></div>
                            </div>
                       )) 
                    }
                </div>
                <div className="story-viewer-header">
                    <div className="story-viewer-user">
                    <img className="story-viewer-avatar" id="storyAvatar" src={story?.user?.profile_picture ? `http://localhost:3000/${story?.user?.profile_picture}` : DefaultUserImage} alt="" />
                    <div>
                        <p className="story-viewer-name" id="storyName">{story?.user?.fullname}</p>
                        <p className="story-viewer-time" id="storyTime">Just now</p>
                    </div>
                    </div>
                    <div style={{"display":"flex","alignItems":"center","gap":"8px"}}>
                    <button className="story-viewer-close" id="storyClose" onClick={()=>{onClose()}}><X /></button>
                    </div>
                </div>
                <div className="story-nav-left" id="storyNavLeft" onClick={()=> document.getElementById('storyArrowPrev').click()} ></div>
                <div className="story-nav-right" id="storyNavRight" onClick={()=> document.getElementById('storyArrowNext').click()}></div>

                {content}
            
                <div className="story-reply-bar">
                    {
                        story?.user_id == user._id ? <button className="story-delete-btn" id="storyDeleteBtn" title="Delete Story" onClick={()=>{deleteStoryhandler()}}><Trash2 /></button> : ''
                    }
                    {/* <input className="story-reply-input" placeholder="Send a reply..." />
                    <button className="story-reply-send"><Send /></button> */}
                </div>
                </div>
                <button className="story-arrow story-arrow-next" id="storyArrowNext" onClick={()=>{ next() }}><ChevronRight /></button>
        </div>
    )
}

export default StoryViewer