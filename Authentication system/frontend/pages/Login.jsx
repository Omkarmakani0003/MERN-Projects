function Login(){
    return (
        <div className="card">
        <h2>Login</h2>
        <form>
            <div className="input-group">
            <label>Email</label>
            <input type="email" required />
            </div>

            <div className="input-group">
            <label>Password</label>
            <input type="password" required />
            </div>

            <button type="submit">Login</button>
        </form>

        <div className="signup-link">
            Don’t have an account? <a href="signup.html">Sign Up</a>
        </div>
        </div>
    )
}

export default Login