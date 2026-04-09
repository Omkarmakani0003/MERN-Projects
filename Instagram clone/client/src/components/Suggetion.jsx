import DefaultUserImage from '../assets/UserProfile.png'

function Suggetion({users}){
    
    return (
        <div className="suggested-user">
          <div className="suggested-user-info">
            <img src={`${users.profile_picture ? users.profile_picture : DefaultUserImage}?w=100&amp;h=100&amp;fit=crop&amp;crop=face`} alt="Olivia Park" className="suggested-user-avatar" />
            <div>
              <p className="suggested-user-name">{users.fullname}</p>
              <p className="suggested-user-handle">@{users.username}</p>
            </div>
          </div>
          <button className="btn-follow">Follow</button>
        </div>
    )
}

export default Suggetion