import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [userEmail, setUserEmail] = useState('');
  const auth = getAuth();
  const navigate = useNavigate();

  // Fetch user email on component mount
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email);
    } else {
      navigate('/login'); // Redirect to login page if no user is authenticated
    }
  }, [auth, navigate]);

  // Log out function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Redirect to login page after logging out
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <div className="profile-container">
      <h2>Welcome, {userEmail}!</h2>
      <button onClick={handleLogout} className="logout-button">Log Out</button>
    </div>
  );
};

export default Profile;