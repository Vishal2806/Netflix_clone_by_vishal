import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/logo.png';
import { login, signup } from '../../firebase';
import netflix_spinner from '../../assets/netflix_spinner.gif';

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (signState === "Sign In") {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      // You can add error handling logic here, like showing a message to the user
    } finally {
      setLoading(false);
    }
  }

  const toggleSignState = () => {
    setSignState((prevState) => (prevState === "Sign In" ? "Sign Up" : "Sign In"));
  };

  return (
    loading ? (
      <div className="login-spinner">
        <img src={netflix_spinner} alt="Loading" />
      </div>
    ) : (
      <div className='login'>
        <img src={logo} className='login-logo' alt="Netflix Logo" />
        <div className="login-form">
          <h1>{signState}</h1>
          <form>
            {signState === "Sign Up" && (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder='Your name'
              />
            )}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder='Email'
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder='Password'
            />
            <button onClick={user_auth} type="submit">{signState}</button>
            <div className="form-help">
              <div className="remember">
                <input type="checkbox" id="rememberMe" />
                <label htmlFor="rememberMe">Remember Me</label>
              </div>
              <p>Need Help?</p>
            </div>
          </form>
          <div className="form-switch">
            {signState === "Sign In" ? (
              <p>New to Netflix? <span onClick={toggleSignState} style={{ cursor: 'pointer' }}>Sign Up Now</span></p>
            ) : (
              <p>Already have an account? <span onClick={toggleSignState} style={{ cursor: 'pointer' }}>Sign In Now</span></p>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default Login;
