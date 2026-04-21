import { useDispatch,useSelector } from "react-redux"
import { Calendar} from "lucide-react"

function Profile(){

    const user = useSelector((state)=>state.auth.user)
    
    return (
        <div className="profile-page-container">


    <div className="profile-cover">
      <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=400&fit=crop" alt="Cover photo" className="cover-img" />
      <div className="cover-overlay"></div>
    </div>

    
    <div className="profile-header-section">
      <div className="profile-header-inner">
        <div className="profile-header-left">
          <div className="profile-page-avatar-wrap">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" alt="Alex Morgan" className="profile-page-avatar" />
            <div className="profile-page-online"></div>
          </div>
          <div className="profile-header-info">
            <h1 className="profile-page-name">{user?.fullname}</h1>
            <p className="profile-page-handle">@{user?.username}</p>
            <p className="profile-page-bio">{user?.bio}</p>
            <div className="profile-meta">
              {/* <span><i data-lucide="map-pin"></i> San Francisco, CA</span> */}
              <span><Calendar /> Joined March 2023</span>
            </div>
          </div>
        </div>
        <div className="profile-header-actions">
          <a href="edit-profile.html" className="btn-edit-profile"><i data-lucide="edit-3"></i> Edit Profile</a>
        </div>
      </div>

      
      <div className="profile-stats-bar">
        <div className="profile-stat-item">
          <span className="stat-number">{user?.post_count}</span>
          <span className="stat-text">Posts</span>
        </div>
        <div className="profile-stat-item" id="followersStatBtn" style={{'cursor':'pointer'}}>
          <span className="stat-number">{user?.followes}</span>
          <span className="stat-text">Followers</span>
        </div>
        <div className="profile-stat-item" id="followingStatBtn" style={{'cursor':'pointer'}}>
          <span className="stat-number">{user?.following}</span>
          <span className="stat-text">Following</span>
        </div>
      </div>
    </div>

    
    <div className="profile-tabs-wrap">
      <div className="profile-tabs" id="profileTabs">
        <button className="profile-tab active" data-tab="posts"><i data-lucide="grid-3x3"></i> Posts</button>
        <button className="profile-tab" data-tab="saved"><i data-lucide="bookmark"></i> Saved</button>
        <button className="profile-tab" data-tab="followers"><i data-lucide="users"></i> Followers</button>
        <button className="profile-tab" data-tab="following"><i data-lucide="user-check"></i> Following</button>
      </div>
    </div>

    
    <div className="profile-tab-content">

      
      <div className="tab-panel active" id="panel-posts">
        <div className="profile-grid" id="profilePostsGrid">
          
        </div>
      </div>

      
      <div className="tab-panel" id="panel-saved">
        <div className="profile-grid" id="profileSavedGrid">
          
        </div>
      </div>

      
      <div className="tab-panel" id="panel-followers">
        <div className="profile-people-list" id="followersList">
         
        </div>
      </div>

      
      <div className="tab-panel" id="panel-following">
        <div className="profile-people-list" id="followingList">
          
        </div>
      </div>

    </div>
  </div>
    )
}

export default Profile