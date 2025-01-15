import React, { useState } from 'react';

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    
    if (email && password) {
      setIsLoggedIn(true);
      setUserEmail(email);
    }
  };

  return (
    <div style={styles.container}>
      {!isLoggedIn ? (
        <div style={styles.card}>
          <h2 style={styles.heading}>Log In</h2>
          <form onSubmit={handleLogin} style={styles.form}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              style={styles.input}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              style={styles.input}
              required
            />
            <button type="submit" style={styles.button}>
              Log In
            </button>
          </form>
        </div>
      ) : (
        <div style={styles.profile}>
          <h2 style={styles.heading}>Welcome!</h2>
          <p style={styles.text}>Logged in as: {userEmail}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#1c1f4a',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    backgroundColor: '#282c66',
    padding: '20px',
    borderRadius: '10px',
    width: '300px',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '20px',
    color: '#ffffff',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #aaa',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#4caf50',
    border: 'none',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  },
  profile: {
    textAlign: 'center',
  },
  text: {
    marginTop: '10px',
  },
};

export default Login;
