import { Home, MessageCircle, Bell, Search } from "lucide-react"
import { useSelector } from "react-redux"
import DefaultUserImage from '../assets/UserProfile.png'
import { Link, useNavigate } from "react-router-dom"

  function Header(){

    const user = useSelector((state)=>state.auth.user)
    const story = useSelector((state)=>state.story)

    return (
      <nav className="navbar glass" style={{"display":story.display}}>
        <div className="navbar-inner">
        <h1 className="navbar-logo"><span className="brand-primary">Social</span><span className="brand-fg">Vibe</span></h1>
        <div className="navbar-search">
            <Search />
            <input type="text" placeholder="Search people, posts, tags..." />
        </div>
        <div className="nav-items">
            <a href="index.html" className="nav-btn active"><Home size={24} /></a>
            <a href="messages.html" className="nav-btn"><MessageCircle size={24} /><span className="nav-badge">3</span></a>
            <a href="notifications.html" className="nav-btn"><Bell size={24} /><span className="nav-badge">5</span></a>
            <Link to="profile"><img src={user.profile_picture ? `http://localhost:3000/${user?.profile_picture}` :  `http://localhost:5173${DefaultUserImage}`} alt="Profile" className="nav-avatar" /></Link>
        </div>
        <button className="mobile-toggle" id="mobileToggle"><i data-lucide="menu"></i></button>
        </div>
        <div className="mobile-dropdown" id="mobileDropdown">
        <div className="navbar-search" >
            <i data-lucide="search"></i>
            <input type="text" placeholder="Search..." />
        </div>
        <button className="nav-btn"><i data-lucide="home"></i><span>Home</span></button>
        <button className="nav-btn"><i data-lucide="search"></i><span>Explore</span></button>
        <button className="nav-btn"><i data-lucide="square-plus"></i><span>Create</span></button>
        <button className="nav-btn"><i data-lucide="message-circle"></i><span>Messages</span></button>
        

        <a href="notifications.html" className="nav-btn"><i data-lucide="bell"></i><span className="nav-badge">5</span></a>
        </div>
    </nav>
    )
  }

  export default Header