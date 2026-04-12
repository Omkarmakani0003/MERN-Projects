import {SwiperSlide } from 'swiper/react';
import DefaultUserImage from '../assets/UserProfile.png'
import StoryViewer from './StoryViewer';
import { useDispatch, useSelector } from "react-redux"
import { View } from '../features/storySlice';

function Story({data,onOpen,indexOfStories,StoryUploadHandler}){
    
    const user = useSelector((state)=>state.auth.user)
    
    return (
    <>
        <button className="story-item" onClick={()=>{ data.stories != undefined ? onOpen(data,indexOfStories) : '' }}>
            <div className="story-ring" style={data.stories != undefined ? {} : {'background':'none'} }>
            <div className="story-ring-inner">
                <div style={{ position: 'relative' }}>
            
                <img
                    src={data?.user?.profile_picture ? `http://localhost:3000/${data?.user?.profile_picture}` : DefaultUserImage }
                    alt="Your Story"
                    className="story-avatar"
                />
                </div>
                
            </div>
            </div>
            <span className="story-name truncate">{data?.user?.fullname}</span>
        </button>
        {
            data.user._id == user._id ? <button className="story-add-icon" onClick={()=>{StoryUploadHandler()}}>+</button> : ''
        }
    </>
    )
} 

export default Story