import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebaseconfig'; // Adjust if necessary
import '../css/profile.css';

const Profile = () => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser(currentUser);
        const userDoc = await db.collection('users').doc(currentUser.uid).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          setName(userData.name || '');
          setBio(userData.bio || '');
        }
      } else {
        window.location.href = '/';
      }
    };
    fetchUserData();
  }, []);

  const handleProfileUpdate = async () => {
    if (user) {
      try {
        await user.updateProfile({
          displayName: name,
          photoURL: profileImage ? URL.createObjectURL(profileImage) : user.photoURL,
        });
        await db.collection('users').doc(user.uid).set({
          name,
          bio,
          profileImage: profileImage ? URL.createObjectURL(profileImage) : user.photoURL,
        });
        alert('Profile updated successfully!');
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Error updating profile. Please try again.');
      }
    }
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-image">
        <img
          src={profileImage ? URL.createObjectURL(profileImage) : user ? user.photoURL : 'default-profile.jpg'}
          alt="Profile"
        />
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setProfileImage(e.target.files[0])}
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <button onClick={handleProfileUpdate}>Update Profile</button>
    </div>
  );
};

export default Profile;
