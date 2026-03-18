function Signup(){
    return (
        <div className="card">
            <h2>Create Account</h2>
            <form>
                <div className="input-group">
                <label>Name</label>
                <input type="text" required />
                </div>

                <div className="input-group">
                <label>Email</label>
                <input type="email" required />
                </div>

                <div className="input-group">
                <label>Password</label>
                <input type="password" required />
                </div>

                <button type="submit">Sign Up</button>
            </form>

            <div className="login-link">
                Already have an account? <a href="#">Login</a>
            </div>
            </div>
    )
}

export default Signup

