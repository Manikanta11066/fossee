import { useState } from "react";
import "./styles.css";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onLogin(true); // Always login successfully for dev/testing
  };

  return (
    <div className="center-login">  {/* Center vertically and horizontally */}
      <div className="login-card"> {/* Floating panel with padding and shadow */}
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={submit}>
          <input
            className="login-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoFocus
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button className="liquid-btn" type="submit"> {/* Floating style button */}
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
