import { Settings, Camera, Image, Video, Smile, MapPin, UserPlus } from "lucide-react"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function Home(){

    return (
      
    <div className="main-container">

    <div className="layout-grid">
      
      <div className="sidebar-left">
        <aside className="profile-card">
          <div className="profile-banner"><button><Camera size={14} /></button></div>
          <div className="profile-avatar-wrap">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="Alex Morgan" className="profile-avatar" />
            <div className="profile-online-dot"></div>
          </div>
          <div className="profile-info"> 
            <div className="name-row">
              <div>
                <h2>Alex Morgan</h2>
                <p className="username">@alexmorgan</p>
              </div>
              <button className="settings-btn"><Settings size={16} /></button>
            </div>
            <p className="bio">Full-stack developer & photographer 📸 Exploring the intersection of tech & creativity.</p>
            <div className="profile-stats">
              <div className="stat"><p className="stat-value">284</p><p className="stat-label">Posts</p></div>
              <div className="stat"><p className="stat-value">12.5K</p><p className="stat-label">Followers</p></div>
              <div className="stat"><p className="stat-value">892</p><p className="stat-label">Following</p></div>
            </div>
          </div>
        </aside>
      </div>
      
      <div className="feed">
      
      <div className="stories-bar">
  <Swiper
    spaceBetween={10}
    slidesPerView={6}
    freeMode={true}         
    className="stories-bar-inner"
  >
    <SwiperSlide>
      <button className="story-item">
        <div className="story-ring ">
          <div className="story-ring-inner">
            <div style={{ position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                alt="Your Story"
                className="story-avatar"
              />
              <div className="story-add-icon">+</div>
            </div>
          </div>
        </div>
        <span className="story-name truncate">Your Story</span>
      </button>
    </SwiperSlide>

    <SwiperSlide>
      <button className="story-item">
        <div className="story-ring ">
          <div className="story-ring-inner">
            <div style={{ position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                alt="Maya Chen"
                className="story-avatar"
              />
            </div>
          </div>
        </div>
        <span className="story-name truncate">Maya</span>
      </button>
    </SwiperSlide>

    <SwiperSlide>
      <button className="story-item">
        <div className="story-ring ">
          <div className="story-ring-inner">
            <div style={{ position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                alt="Maya Chen"
                className="story-avatar"
              />
            </div>
          </div>
        </div>
        <span className="story-name truncate">Maya</span>
      </button>
    </SwiperSlide>

    <SwiperSlide>
      <button className="story-item">
        <div className="story-ring ">
          <div className="story-ring-inner">
            <div style={{ position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                alt="Maya Chen"
                className="story-avatar"
              />
            </div>
          </div>
        </div>
        <span className="story-name truncate">Maya</span>
      </button>
    </SwiperSlide>

    <SwiperSlide>
      <button className="story-item">
        <div className="story-ring ">
          <div className="story-ring-inner">
            <div style={{ position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                alt="Maya Chen"
                className="story-avatar"
              />
            </div>
          </div>
        </div>
        <span className="story-name truncate">Maya</span>
      </button>
    </SwiperSlide>

    <SwiperSlide>
      <button className="story-item">
        <div className="story-ring ">
          <div className="story-ring-inner">
            <div style={{ position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                alt="Maya Chen"
                className="story-avatar"
              />
            </div>
          </div>
        </div>
        <span className="story-name truncate">Maya</span>
      </button>
    </SwiperSlide>

    <SwiperSlide>
      <button className="story-item">
        <div className="story-ring ">
          <div className="story-ring-inner">
            <div style={{ position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                alt="Maya Chen"
                className="story-avatar"
              />
            </div>
          </div>
        </div>
        <span className="story-name truncate">Maya</span>
      </button>
    </SwiperSlide>
    <SwiperSlide>
      <button className="story-item">
        <div className="story-ring ">
          <div className="story-ring-inner">
            <div style={{ position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                alt="Maya Chen"
                className="story-avatar"
              />
            </div>
          </div>
        </div>
        <span className="story-name truncate">Maya</span>
      </button>
    </SwiperSlide>
    <SwiperSlide>
      <button className="story-item">
        <div className="story-ring ">
          <div className="story-ring-inner">
            <div style={{ position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                alt="Maya Chen"
                className="story-avatar"
              />
            </div>
          </div>
        </div>
        <span className="story-name truncate">Maya</span>
      </button>
    </SwiperSlide>
    <SwiperSlide>
      <button className="story-item">
        <div className="story-ring ">
          <div className="story-ring-inner">
            <div style={{ position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                alt="Maya Chen"
                className="story-avatar"
              />
            </div>
          </div>
        </div>
        <span className="story-name truncate">Maya</span>
      </button>
    </SwiperSlide>
    <SwiperSlide>
      <button className="story-item">
        <div className="story-ring ">
          <div className="story-ring-inner">
            <div style={{ position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                alt="Maya Chen"
                className="story-avatar"
              />
            </div>
          </div>
        </div>
        <span className="story-name truncate">Maya</span>
      </button>
    </SwiperSlide>
  </Swiper>
</div>
        
        <div className="create-post">
          <div className="create-post-inner">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="You" className="create-post-avatar" />
            <div className="create-post-body">
              <textarea placeholder="What's on your mind?" rows="2"></textarea>
              <div className="create-post-actions">
                <div className="create-post-icons">
                  <button className="icon-primary"><Image /></button>
                  <button className="icon-accent"><Video /></button>
                  <button className="icon-yellow"><Smile /></button>
                  <button className="icon-green"><MapPin /></button>
                </div>
                <button className="btn-post">Post</button>
              </div>
            </div>
          </div>
        </div>
        
        <div id="postsContainer">
      <article className="post-card">
        <div className="post-header">
          <div className="post-user">
            <div className="post-user-avatar-wrap">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&amp;h=100&amp;fit=crop&amp;crop=face" alt="Maya Chen" className="post-user-avatar" />
              <div className="online-dot"></div>
            </div>
            <div>
              <h3 className="post-user-name">Maya Chen</h3>
              <p className="post-user-time">2h ago</p>
            </div>
          </div>
          <button className="post-more-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" data-lucide="more-horizontal" aria-hidden="true" className="lucide lucide-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></button>
        </div>
        <p className="post-content">Caught the most incredible sunset today! 🌅 The city looks magical from up here. #goldenhour #cityvibes</p>
        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&amp;h=600&amp;fit=crop" alt="Post" className="post-image" loading="lazy" />
        <div className="post-actions">
          <div className="post-actions-left">
            <button className="action-btn like-btn liked">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" data-lucide="heart" aria-hidden="true" className="lucide lucide-heart"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path></svg>
              <span className="like-count">248</span>
            </button>
            <button className="action-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" data-lucide="message-circle" aria-hidden="true" className="lucide lucide-message-circle"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path></svg>
              <span>32</span>
            </button>
            <button className="action-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" data-lucide="share-2" aria-hidden="true" className="lucide lucide-share-2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line></svg>
              <span>12</span>
            </button>
          </div>
          <button className="action-btn save-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" data-lucide="bookmark" aria-hidden="true" className="lucide lucide-bookmark"><path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"></path></svg>
          </button>
        </div>
      </article>
        </div>
      </div>
      
      <div className="sidebar-right">
        <div className="sidebar-section">
          <div className="sidebar-section-header">
            <UserPlus />
            <h2>Suggested for you</h2> 
          </div>
          <div className="suggested-list" id="suggestedList">
        <div className="suggested-user">
          <div className="suggested-user-info">
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&amp;h=100&amp;fit=crop&amp;crop=face" alt="Olivia Park" className="suggested-user-avatar" />
            <div>
              <p className="suggested-user-name">Olivia Park</p>
              <p className="suggested-user-handle">@oliviap</p>
            </div>
          </div>
          <button className="btn-follow">Follow</button>
        </div>
      
        <div className="suggested-user">
          <div className="suggested-user-info">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&amp;h=100&amp;fit=crop&amp;crop=face" alt="David Kim" className="suggested-user-avatar" />
            <div>
              <p className="suggested-user-name">David Kim</p>
              <p className="suggested-user-handle">@davidk</p>
            </div>
          </div>
          <button className="btn-follow">Follow</button>
        </div>
      
        <div className="suggested-user">
          <div className="suggested-user-info">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&amp;h=100&amp;fit=crop&amp;crop=face" alt="Lisa Ray" className="suggested-user-avatar" />
            <div>
              <p className="suggested-user-name">Lisa Ray</p>
              <p className="suggested-user-handle">@lisar</p>
            </div>
          </div>
          <button className="btn-follow">Follow</button>
        </div>
      </div>
        </div>
        <p className="footer-text">© 2026 SocialVibe · Privacy · Terms · About</p>
      </div>
    </div>
  </div>
    )
}

export default Home