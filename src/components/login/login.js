import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const LoginSignup = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLoginMode) {
        // Handle login
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setMessage(`Welcome back, ${userCredential.user.email}!`);
      } else {
        // Handle signup
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        setMessage(`Account created for ${userCredential.user.email}!`);
      }
      setError('');
    } catch (err) {
      setError(err.message);
      setMessage('');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>{isLoginMode ? 'Log In' : 'Sign Up'}</h2>
        {message && <p style={styles.success}>{message}</p>}
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            {isLoginMode ? 'Log In' : 'Sign Up'}
          </button>
        </form>
        <button
          style={styles.toggleButton}
          onClick={() => setIsLoginMode((prev) => !prev)}
        >
          {isLoginMode ? 'Switch to Sign Up' : 'Switch to Log In'}
        </button>
      </div>
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
  toggleButton: {
    marginTop: '15px',
    color: '#4caf50',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  success: {
    color: '#4caf50',
    fontSize: '14px',
    marginBottom: '10px',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  },
};

export default LoginSignup;
