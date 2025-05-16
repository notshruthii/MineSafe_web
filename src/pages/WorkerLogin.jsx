
import './LoginForm.css';

export default function WorkerLogin() {
  return (
    <div className="login-container">
      <h2>Worker Login</h2>
      <form className="login-form" onSubmit={e => e.preventDefault()}>
        <label>
          Username
          <input type="text" placeholder="Enter username" required />
        </label>
        <label>
          Password
          <input type="password" placeholder="Enter password" required />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
