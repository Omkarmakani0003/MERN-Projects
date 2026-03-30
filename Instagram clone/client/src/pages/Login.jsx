import { Lock, Mail } from "lucide-react"

function Login(){
    return (
        <div className="auth-page">
    <div className="auth-card">
      
      <div className="auth-logo">
        <h1 className="navbar-logo"><span className="brand-primary">Social</span><span className="brand-fg">Vibe</span></h1>
        <p className="auth-subtitle">Welcome back! Log in to continue.</p>
      </div>

      
      <form id="loginForm" className="auth-form" noValidate>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <div className="input-wrap">
            <Mail />
            <input type="email" id="email" name="email" placeholder="you@example.com" autoComplete="email" />
          </div>
          <span className="form-error" id="emailError"></span>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="input-wrap">
            <Lock />
            <input type="password" id="password" name="password" placeholder="••••••••" autoComplete="current-password" />
            <button type="button" className="toggle-pw" id="togglePw"><i data-lucide="eye"></i></button>
          </div>
          <span className="form-error" id="passwordError"></span>
        </div>

        <div className="form-row">
          <label className="checkbox-label">
            <input type="checkbox" id="remember" /> <span>Remember me</span>
          </label>
          <a href="#" className="link-primary">Forgot password?</a>
        </div>

        <button type="submit" className="btn-auth">Log In</button>
      </form>

      
      <div className="auth-divider"><span>or continue with</span></div>

      
      <div className="social-buttons">
        <button className="btn-social"><i data-lucide="chrome"></i> Google</button>
        <button className="btn-social"><i data-lucide="github"></i> GitHub</button>
      </div>

      <p className="auth-footer">Don't have an account? <a href="signup.html" className="link-primary">Sign up</a></p>
    </div>
  </div>
    )
}

export default Login
