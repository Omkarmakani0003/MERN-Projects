import DefaultUserImage from '../assets/UserProfile.png'
import { toast } from "react-toastify";
import Axios from "../axios/Axios";

function Suggetion({users,follow}){
  
  const followHandler = async()=>{
     const user_id = users._id

     if(!user_id){
        return toast.error('user_id is require')
     }

     try{

        const response = await Axios.post('/user/follow', {user_id},{
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(response.data.success){
          return toast.success(response.data.message)
        }

     }catch(error){
        return toast.error(error.response?.message || error.message) 
     }

  }

    return (
        <div className="suggested-user">
          <div className="suggested-user-info">
            <img src={`${users.profile_picture ? `http://localhost:3000/${users.profile_picture}` : DefaultUserImage}?w=100&amp;h=100&amp;fit=crop&amp;crop=face`} alt="Olivia Park" className="suggested-user-avatar" />
            <div>
              <p className="suggested-user-name">{users.fullname}</p>
              <p className="suggested-user-handle">@{users.username}</p>
            </div>
          </div>
          <button className="btn-follow" onClick={followHandler}>Follow</button>
        </div>
    )
}

export default Suggetion