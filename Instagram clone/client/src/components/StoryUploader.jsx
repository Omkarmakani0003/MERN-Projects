import { useState } from "react"
import { toast } from "react-toastify"
import Axios from "../axios/Axios";
import { useDispatch, useSelector } from "react-redux"
import {UploadStoryThunk,GetStoryThunk} from '../features/storySlice'

function StoryUploader({StoryUploadHandler}){

    const user = useSelector((state)=>state.auth.user)
    const dispatch = useDispatch()
    
    const [file,setFile] = useState(null)
    const [preview,setPreview] = useState(null)

    const fileHandler = (e)=>{
        const file = e.target.files[0]
        if(file){
             setFile(e.target.files[0])
             setPreview(URL.createObjectURL(file))
        }
        
    }

    const SubmitStory = async()=>{

        if(!file || file == null){
            toast.error('Image or video is required')
            return false
        }
        
        const formData = new FormData();
        formData.append("story", file);

        try{
            const response = await dispatch(UploadStoryThunk(formData))
            console.log(response)
            if(response.payload.success){
                StoryUploadHandler()
                dispatch(GetStoryThunk())
                toast.success(response.payload.message)
            }

        }catch(error){
             toast.error(error.message)
        }
       
    }

    return (
        <div className="story-upload-overlay active" id="storyUploadModal">
            <div className="story-upload-modal">
                <div className="story-upload-header">
                    <h3>Add to Your Story</h3>
                    <button className="story-upload-close" id="storyUploadClose" onClick={()=>{StoryUploadHandler()}}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="x" aria-hidden="true" className="lucide lucide-x"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg></button>
                </div>
                <div className="story-upload-body">
                    <div className="story-upload-preview" id="storyUploadPreview">
                    
                    {
                        preview ? (
                            <img className="story-upload-img" id="storyUploadImg" src={preview} alt="Preview"  />
                        ):(
                            <div className="story-upload-placeholder"  onClick={() => document.getElementById("storyFileInput").click()} id="storyUploadPlaceholder" style={{'display': 'flex'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="image-plus" aria-hidden="true" style={{'width':'48px','height':'48px'}} className="lucide lucide-image-plus"><path d="M16 5h6"></path><path d="M19 2v6"></path><path d="M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5"></path><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path><circle cx="9" cy="9" r="2"></circle></svg>
                                <p>Click or drag an image here</p>
                                <span>JPG, PNG, GIF — Max 10MB</span>
                            </div>
                        )
                    }
                    
                    </div>
                    <input type="file" id="storyFileInput" accept="image/*" onChange={fileHandler} style={{'display':'none'}} />
                    <div className="story-upload-actions">
                    <button className="btn-cancel-delete" id="storyUploadCancel" onClick={()=>{StoryUploadHandler()}}>Cancel</button>
                    <button className="btn-post story-upload-submit" id="storyUploadSubmit" disabled="" onClick={()=>{ SubmitStory() }} >Share Story</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StoryUploader